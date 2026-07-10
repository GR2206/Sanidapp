const { onCall, HttpsError } = require('firebase-functions/v2/https');
const { FieldValue } = require('firebase-admin/firestore');

const ANDROID_PACKAGE_NAME =
  process.env.ANDROID_PACKAGE_NAME || 'com.gr2206.sanidapp';

const ALLOWED_PRODUCT_IDS = (process.env.IAP_PREMIUM_PRODUCT_IDS || 'sanidapp_premium')
  .split(',')
  .map((id) => id.trim())
  .filter(Boolean);

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
    throw new HttpsError('internal', 'GOOGLE_PLAY_SERVICE_ACCOUNT_JSON no es JSON válido.');
  }

  return new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/androidpublisher'],
  });
}

async function verifyAndroidSubscriptionPurchase(productId, purchaseToken) {
  const { google } = require('googleapis');
  const auth = getPlayAuthClient();
  const androidPublisher = google.androidpublisher({ version: 'v3', auth });

  const response = await androidPublisher.purchases.subscriptions.get({
    packageName: ANDROID_PACKAGE_NAME,
    subscriptionId: productId,
    token: purchaseToken,
  });

  const expiryTimeMillis = Number(response.data.expiryTimeMillis ?? 0);
  if (!expiryTimeMillis || expiryTimeMillis <= Date.now()) {
    throw new HttpsError('failed-precondition', 'La suscripción no está activa o ya venció.');
  }

  const paymentState = response.data.paymentState;
  if (paymentState !== undefined && paymentState !== 1 && paymentState !== 2) {
    throw new HttpsError('failed-precondition', 'El pago de la suscripción no está confirmado.');
  }

  return response.data;
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
        productId,
        purchaseToken,
        platform: 'android',
        orderId: purchaseData.orderId ?? null,
        expiryTimeMillis: purchaseData.expiryTimeMillis ?? null,
        purchaseTimeMillis: purchaseData.startTimeMillis ?? purchaseData.purchaseTimeMillis ?? null,
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
