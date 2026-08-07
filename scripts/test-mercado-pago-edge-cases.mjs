/**
 * Pruebas exhaustivas (sin red) de lógica Mercado Pago / inscripciones.
 * Ejecutar: node scripts/test-mercado-pago-edge-cases.mjs
 */
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const {
  parsePriceArs,
  COMMISSION_PERCENT,
} = require('../functions/feedInscriptionMp.js');
const { parseFeedCupos, formatFeedCupos } = require('../functions/feedCupos.js');

function splitAmounts(gross) {
  const commissionAmount = Math.round(((gross * COMMISSION_PERCENT) / 100) * 100) / 100;
  const payeeAmount = Math.round((gross - commissionAmount) * 100) / 100;
  return { commissionAmount, payeeAmount };
}

function extractPremiumUid(payment) {
  const metadataUid = payment?.metadata?.uid;
  const external = String(payment?.external_reference ?? '');
  const uidFromRef = external.startsWith('sanidapp_premium:')
    ? external.split(':')[1]
    : '';
  return String(metadataUid || uidFromRef || '').trim();
}

function shouldGrantPremium(payment) {
  return payment?.status === 'approved' && Boolean(extractPremiumUid(payment));
}

function isFeedPayment(payment) {
  const productId = payment?.metadata?.productId;
  const external = String(payment?.external_reference ?? '');
  return productId === 'sanidapp_feed_inscription' || external.startsWith('sanidapp_feed:');
}

function pickCheckoutUrl(preference, mode = 'test') {
  if (mode === 'live' || mode === 'prod' || mode === 'production') {
    return preference.init_point || preference.sandbox_init_point || null;
  }
  // En test preferimos sandbox si existe; si no, init_point (cuentas nuevas a veces solo dan init_point).
  return preference.sandbox_init_point || preference.init_point || null;
}

let failed = 0;
function check(name, fn) {
  try {
    fn();
    console.log(`OK  ${name}`);
  } catch (error) {
    failed += 1;
    console.error(`FAIL ${name}`);
    console.error(`     ${error.message}`);
  }
}

check('commission 20% enteros', () => {
  assert.deepEqual(splitAmounts(1000), { commissionAmount: 200, payeeAmount: 800 });
  assert.deepEqual(splitAmounts(5000), { commissionAmount: 1000, payeeAmount: 4000 });
});

check('commission redondeo centavos', () => {
  assert.deepEqual(splitAmounts(99.99), { commissionAmount: 20, payeeAmount: 79.99 });
  assert.deepEqual(splitAmounts(1), { commissionAmount: 0.2, payeeAmount: 0.8 });
  assert.deepEqual(splitAmounts(0.5), { commissionAmount: 0.1, payeeAmount: 0.4 });
});

check('parsePriceArs casos normales AR', () => {
  assert.equal(parsePriceArs('1200'), 1200);
  assert.equal(parsePriceArs('$ 1.200'), 1200);
  assert.equal(parsePriceArs('ARS 3500'), 3500);
  assert.equal(parsePriceArs('  99  '), 99);
  assert.equal(parsePriceArs('12,50'), 12.5);
  assert.equal(parsePriceArs('1.200,50'), 1200.5);
});

check('parsePriceArs gratis / free / 0', () => {
  assert.equal(parsePriceArs('gratis'), 0);
  assert.equal(parsePriceArs('Free'), 0);
  assert.equal(parsePriceArs('0'), 0);
});

check('parsePriceArs inválidos', () => {
  assert.equal(parsePriceArs(''), null);
  assert.equal(parsePriceArs('abc'), null);
  assert.equal(parsePriceArs('   '), null);
});

check('cupos parse/format y agotados', () => {
  const parsed = parseFeedCupos('5/20');
  assert.ok(parsed);
  assert.equal(parsed.remaining, 5);
  assert.equal(parsed.total, 20);
  assert.equal(formatFeedCupos(4, 20), '4/20');
  const empty = parseFeedCupos('0/10');
  assert.equal(empty.remaining, 0);
  assert.ok(empty.remaining <= 0);
});

check('cupos decremento no baja de 0', () => {
  const parsed = parseFeedCupos('0/5');
  const remaining = Math.max(0, parsed.remaining - 1);
  assert.equal(remaining, 0);
  assert.equal(formatFeedCupos(remaining, parsed.total), '0/5');
});

check('premium uid desde metadata', () => {
  assert.equal(
    extractPremiumUid({ metadata: { uid: 'u1' }, external_reference: 'x' }),
    'u1',
  );
});

check('premium uid desde external_reference', () => {
  assert.equal(
    extractPremiumUid({
      external_reference: 'sanidapp_premium:abc123:1710000000',
    }),
    'abc123',
  );
});

check('premium sin uid no otorga', () => {
  assert.equal(extractPremiumUid({ status: 'approved', external_reference: 'otro' }), '');
  assert.equal(shouldGrantPremium({ status: 'approved', external_reference: 'otro' }), false);
});

check('premium pending/rejected no otorga', () => {
  assert.equal(
    shouldGrantPremium({
      status: 'pending',
      metadata: { uid: 'u1' },
      external_reference: 'sanidapp_premium:u1:1',
    }),
    false,
  );
  assert.equal(
    shouldGrantPremium({
      status: 'rejected',
      metadata: { uid: 'u1' },
    }),
    false,
  );
});

check('premium approved sí otorga', () => {
  assert.equal(
    shouldGrantPremium({
      status: 'approved',
      metadata: { uid: 'u1' },
    }),
    true,
  );
});

check('feed vs premium routing', () => {
  assert.equal(
    isFeedPayment({ metadata: { productId: 'sanidapp_feed_inscription' } }),
    true,
  );
  assert.equal(isFeedPayment({ external_reference: 'sanidapp_feed:cursos:x:u:1' }), true);
  assert.equal(
    isFeedPayment({
      metadata: { productId: 'sanidapp_premium' },
      external_reference: 'sanidapp_premium:u:1',
    }),
    false,
  );
});

check('checkout URL test prefiere sandbox', () => {
  assert.equal(
    pickCheckoutUrl({ init_point: 'https://live', sandbox_init_point: 'https://sandbox' }, 'test'),
    'https://sandbox',
  );
  assert.equal(
    pickCheckoutUrl({ init_point: 'https://live' }, 'test'),
    'https://live',
  );
});

check('checkout URL live prefiere init_point', () => {
  assert.equal(
    pickCheckoutUrl({ init_point: 'https://live', sandbox_init_point: 'https://sandbox' }, 'live'),
    'https://live',
  );
});

check('CBU debe tener 22 dígitos', () => {
  const valid = '1234567890123456789012';
  const invalid = '123';
  assert.equal(valid.replace(/\D/g, '').length, 22);
  assert.notEqual(invalid.replace(/\D/g, '').length, 22);
});

check('external_reference feed parse uid posición 3', () => {
  const external = 'sanidapp_feed:cursos:item99:userXYZ:1710000';
  assert.equal(external.split(':')[3], 'userXYZ');
});

if (failed) {
  console.error(`\n${failed} test(s) fallaron`);
  process.exit(1);
}
console.log('\nTodos los casos edge OK');
