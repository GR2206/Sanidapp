const { onCall, HttpsError } = require('firebase-functions/v2/https');
const { FieldValue } = require('firebase-admin/firestore');

const ANDROID_PACKAGE_NAME =
  process.env.ANDROID_PACKAGE_NAME || 'com.gr2206.sanidapp';

const ALLOWED_PRODUCT_IDS = (process.env.IAP_PREMIUM_PRODUCT_IDS || 'sanidapp_premium')
  .split(',')
  .map((id) => id.trim())
  .filter(Boolean);

/** States that still grant premium access. */
const ENTITLED_STATES = new Set([
  'SUBSCRIPTION_STATE_ACTIVE',
  'SUBSCRIPTION_STATE_IN_GRACE_PERIOD',
  'SUBSCRIPTION_STATE_CANCELED',
]);

function getPlayServiceAccountJson() {
  return process.env.GOOGLE_PLAY_SERVICE_ACCOUNT_JSON ?? '';
}

function getPlayAuthClient() {
  const { google } = require('googleapis');
  const raw = getPlayServiceAccountJson();
  if (!raw.trim()) {
    throw new HttpsError(
      'failed-precondition',
      'Compras Play aún no configuradas. Activá Secret Manager, ejecutá firebase functions:secrets:set GOOGLE_PLAY_SERVICE_ACCOUNT_JSON y redeploy (último paso).',
    );
  }

  let credentials;
  try {
    credentials = JSON.parse(raw);
  } catch {
    throw new HttpsError(
      'failed-precondition',
      'Credenciales de Google Play mal configuradas en el servidor. Hay que volver a cargar el JSON de la service account (Secret Manager).',
    );
  }

  return new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/androidpublisher'],
  });
}

function parseMillis(value) {
  if (!value) return null;
  if (typeof value === 'number' && Number.isFinite(value)) return value;
  const parsed = Date.parse(String(value));
  return Number.isFinite(parsed) ? parsed : null;
}

/**
 * Verifies a Play subscription with purchases.subscriptionsv2 (required for
 * base plans / offers). The legacy purchases.subscriptions.get API is deprecated.
 */
async function verifyAndroidSubscriptionPurchase(productId, purchaseToken) {
  const { google } = require('googleapis');
  const auth = getPlayAuthClient();
  const androidPublisher = google.androidpublisher({ version: 'v3', auth });

  let response;
  try {
    response = await androidPublisher.purchases.subscriptionsv2.get({
      packageName: ANDROID_PACKAGE_NAME,
      token: purchaseToken,
    });
  } catch (cause) {
    const status = Number(cause?.status ?? cause?.code ?? 0);
    const apiMessage = String(
      cause?.errors?.[0]?.message ?? cause?.message ?? 'Error al consultar Google Play',
    );

    if (status === 403 && /has not been used|disabled|accessNotConfigured/i.test(apiMessage)) {
      throw new HttpsError(
        'failed-precondition',
        'Falta habilitar la API «Google Play Android Developer» en Google Cloud. Activála y reintentá en unos minutos.',
      );
    }

    if (status === 401 || status === 403) {
      throw new HttpsError(
        'permission-denied',
        'La service account no tiene permiso en Play Console (Usuarios y permisos) o la API está restringida.',
      );
    }

    if (status === 404) {
      throw new HttpsError(
        'not-found',
        'Google Play no encontró esa compra. Probá de nuevo o esperá unos segundos y reintentá.',
      );
    }

    console.error('Play subscriptionsv2.get failed', { status, apiMessage });
    throw new HttpsError('internal', apiMessage.slice(0, 180));
  }

  const data = response.data ?? {};
  const state = String(data.subscriptionState ?? '');

  if (!ENTITLED_STATES.has(state)) {
    throw new HttpsError(
      'failed-precondition',
      `La suscripción no está activa (${state || 'estado desconocido'}).`,
    );
  }

  const lineItems = Array.isArray(data.lineItems) ? data.lineItems : [];
  const matchingItem =
    lineItems.find((item) => item?.productId === productId) ??
    lineItems.find((item) => ALLOWED_PRODUCT_IDS.includes(String(item?.productId ?? ''))) ??
    null;

  if (!matchingItem) {
    throw new HttpsError('failed-precondition', 'No se encontró el producto comprado en Play.');
  }

  const resolvedProductId = String(matchingItem.productId ?? '');
  if (!ALLOWED_PRODUCT_IDS.includes(resolvedProductId)) {
    throw new HttpsError('invalid-argument', 'Producto no autorizado.');
  }

  const expiryTimeMillis = parseMillis(matchingItem.expiryTime);
  if (expiryTimeMillis !== null && expiryTimeMillis <= Date.now()) {
    throw new HttpsError('failed-precondition', 'La suscripción no está activa o ya venció.');
  }

  return {
    productId: resolvedProductId,
    orderId: matchingItem.latestSuccessfulOrderId ?? null,
    expiryTimeMillis,
    purchaseTimeMillis: parseMillis(data.startTime),
    subscriptionState: state,
    acknowledgementState: data.acknowledgementState ?? null,
  };
}

function buildPremiumPayload() {
  return {
    accessTier: 'premium',
    institutionToken: '',
    premiumSource: 'iap',
    premiumGrantedAt: new Date().toISOString(),
    updatedAt: FieldValue.serverTimestamp(),
  };
}

function createVerifyPlayPurchaseHandler(getDb) {
  return onCall({ secrets: ['GOOGLE_PLAY_SERVICE_ACCOUNT_JSON'] }, async (request) => {
    if (!request.auth) {
      throw new HttpsError('unauthenticated', 'Tenés que iniciar sesión.');
    }

    const productId = String(request.data?.productId ?? '').trim();
    const purchaseToken = String(request.data?.purchaseToken ?? '').trim();

    if (!productId || !purchaseToken) {
      throw new HttpsError('invalid-argument', 'productId y purchaseToken son obligatorios.');
    }

    if (!ALLOWED_PRODUCT_IDS.includes(productId)) {
      throw new HttpsError('invalid-argument', 'Producto no autorizado.');
    }

    const uid = request.auth.uid;
    const db = getDb();
    const userRef = db.doc(`apps/sanidapp/usuarios/${uid}`);
    const userSnap = await userRef.get();

    if (!userSnap.exists) {
      throw new HttpsError('not-found', 'Perfil de usuario no encontrado.');
    }

    const purchaseData = await verifyAndroidSubscriptionPurchase(productId, purchaseToken);
    const payload = buildPremiumPayload();

    await userRef.set(payload, { merge: true });

    const userData = userSnap.data() ?? {};
    if (userData.sanatorioId) {
      await db
        .doc(`apps/sanidapp/sanatorios/${userData.sanatorioId}/usuarios/${uid}`)
        .set(payload, { merge: true });
    }

    await db.doc(`apps/sanidapp/purchases/${uid}`).set(
      {
        uid,
        productId: purchaseData.productId,
        purchaseToken,
        platform: 'android',
        orderId: purchaseData.orderId,
        expiryTimeMillis: purchaseData.expiryTimeMillis,
        purchaseTimeMillis: purchaseData.purchaseTimeMillis,
        subscriptionState: purchaseData.subscriptionState,
        acknowledgementState: purchaseData.acknowledgementState,
        verifiedAt: FieldValue.serverTimestamp(),
      },
      { merge: true },
    );

    return {
      accessTier: 'premium',
      premiumSource: 'iap',
    };
  });
}

module.exports = { createVerifyPlayPurchaseHandler };
