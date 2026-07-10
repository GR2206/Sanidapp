const { createVerifyPlayPurchaseHandler } = require('./playBilling');
const { findStaffMatch, loadStaffAllowlist } = require('./staffAllowlist');
const bundledStaffConfig = require('./staff-allowlist-config.json');
const { onDocumentCreated } = require('firebase-functions/v2/firestore');
const { onCall, HttpsError } = require('firebase-functions/v2/https');
const { initializeApp, getApps } = require('firebase-admin/app');
const { getFirestore, FieldValue } = require('firebase-admin/firestore');

if (getApps().length === 0) {
  initializeApp();
}

function getDb() {
  return getFirestore();
}

const STAFF_CONFIG_URL =
  process.env.STAFF_ALLOWLIST_CONFIG_URL ||
  'https://raw.githubusercontent.com/GR2206/Sanidapp/main/staff-allowlist-config.json';

function mergeStaffConfig(local, remote) {
  if (!remote?.sanatorios) {
    return local;
  }

  const sanatorios = { ...local.sanatorios };

  for (const [id, remoteEntry] of Object.entries(remote.sanatorios)) {
    const localEntry = sanatorios[id];
    if (!localEntry) {
      sanatorios[id] = remoteEntry;
      continue;
    }

    sanatorios[id] = {
      ...localEntry,
      ...remoteEntry,
      gistId: remoteEntry.gistId?.trim() ? remoteEntry.gistId : localEntry.gistId,
      filename: remoteEntry.filename?.trim() ? remoteEntry.filename : localEntry.filename,
      institutionToken: remoteEntry.institutionToken?.trim()
        ? remoteEntry.institutionToken
        : localEntry.institutionToken,
    };
  }

  return { sanatorios };
}

async function loadStaffConfig() {
  try {
    const response = await fetch(STAFF_CONFIG_URL);
    if (response.ok) {
      const remote = await response.json();
      return mergeStaffConfig(bundledStaffConfig, remote);
    }

    console.warn(`Remote staff config unavailable (${response.status}), using bundled fallback.`);
  } catch (error) {
    console.warn('Remote staff config fetch failed, using bundled fallback.', error);
  }

  return bundledStaffConfig;
}

function getExpectedInstitutionToken(config, sanatorioId) {
  const token = config?.sanatorios?.[sanatorioId]?.institutionToken;
  return typeof token === 'string' ? token.trim() : '';
}

exports.redeemInstitutionToken = onCall(async (request) => {
  if (!request.auth) {
    throw new HttpsError('unauthenticated', 'Tenés que iniciar sesión.');
  }

  const token = String(request.data?.token ?? '').trim();
  const sanatorioId = String(request.data?.sanatorioId ?? '').trim();

  if (!token || !sanatorioId) {
    throw new HttpsError('invalid-argument', 'Token y sanatorio son obligatorios.');
  }

  const config = await loadStaffConfig();
  const expected = getExpectedInstitutionToken(config, sanatorioId);

  if (!expected) {
    throw new HttpsError('failed-precondition', 'Este sanatorio no tiene token configurado.');
  }

  if (expected !== token) {
    throw new HttpsError('permission-denied', 'Token inválido o expirado.');
  }

  const uid = request.auth.uid;
  const db = getDb();
  const userRef = db.doc(`apps/sanidapp/usuarios/${uid}`);
  const userSnap = await userRef.get();

  if (!userSnap.exists) {
    throw new HttpsError('not-found', 'Perfil de usuario no encontrado.');
  }

  const userData = userSnap.data() ?? {};
  if (userData.sanatorioId && userData.sanatorioId !== sanatorioId) {
    throw new HttpsError(
      'failed-precondition',
      'El token no corresponde al sanatorio de tu cuenta.',
    );
  }

  const payload = {
    accessTier: 'premium',
    institutionToken: token,
    premiumSource: 'institution_token',
    premiumGrantedAt: new Date().toISOString(),
    updatedAt: FieldValue.serverTimestamp(),
  };

  let linkedSanatorioName = userData.sanatorioName ?? '';

  if (!userData.sanatorioId) {
    const sanatorioDoc = await db.doc(`apps/sanidapp/sanatorios/${sanatorioId}`).get();
    const sanatorioData = sanatorioDoc.data() ?? {};
    linkedSanatorioName =
      sanatorioData.name || sanatorioData.shortName || linkedSanatorioName || sanatorioId;
    payload.sanatorioId = sanatorioId;
    payload.sanatorioName = linkedSanatorioName;
  }

  await userRef.set(payload, { merge: true });

  const profileSanatorioId = userData.sanatorioId || sanatorioId;
  if (profileSanatorioId) {
    await db
      .doc(`apps/sanidapp/sanatorios/${profileSanatorioId}/usuarios/${uid}`)
      .set(
        {
          ...userData,
          ...payload,
          uid,
        },
        { merge: true },
      );
  }

  const response = {
    accessTier: 'premium',
    premiumSource: 'institution_token',
    institutionToken: token,
  };

  if (!userData.sanatorioId) {
    return {
      ...response,
      sanatorioId,
      sanatorioName: linkedSanatorioName,
    };
  }

  return response;
});

async function applyPremiumPayload(db, uid, sanatorioId, payload) {
  await db.doc(`apps/sanidapp/usuarios/${uid}`).set(payload, { merge: true });

  if (sanatorioId) {
    await db
      .doc(`apps/sanidapp/sanatorios/${sanatorioId}/usuarios/${uid}`)
      .set(payload, { merge: true });
  }
}

exports.syncAllowlistPremium = onCall(async (request) => {
  if (!request.auth) {
    throw new HttpsError('unauthenticated', 'Tenés que iniciar sesión.');
  }

  const uid = request.auth.uid;
  const db = getDb();
  const userRef = db.doc(`apps/sanidapp/usuarios/${uid}`);
  const userSnap = await userRef.get();

  if (!userSnap.exists) {
    throw new HttpsError('not-found', 'Perfil de usuario no encontrado.');
  }

  const userData = userSnap.data() ?? {};
  const sanatorioId = String(userData.sanatorioId ?? '').trim();
  const nombre = String(userData.nombre ?? '').trim();
  const apellido = String(userData.apellido ?? '').trim();

  if (!sanatorioId || !nombre || !apellido) {
    return {
      synced: false,
      accessTier: userData.accessTier === 'premium' ? 'premium' : 'free',
      premiumSource: userData.premiumSource ?? '',
    };
  }

  if (userData.accessTier === 'premium') {
    return {
      synced: false,
      accessTier: 'premium',
      premiumSource: userData.premiumSource ?? '',
    };
  }

  let staff;
  try {
    const config = await loadStaffConfig();
    staff = await loadStaffAllowlist(config, sanatorioId);
  } catch (cause) {
    const message = cause instanceof Error ? cause.message : 'No se pudo consultar el padrón.';
    throw new HttpsError('unavailable', message);
  }

  const match = findStaffMatch(staff, nombre, apellido);
  if (!match) {
    return {
      synced: false,
      accessTier: 'free',
      premiumSource: '',
    };
  }

  const payload = {
    accessTier: 'premium',
    institutionToken: '',
    premiumSource: 'allowlist',
    premiumGrantedAt: new Date().toISOString(),
    updatedAt: FieldValue.serverTimestamp(),
  };

  await applyPremiumPayload(db, uid, sanatorioId, payload);

  return {
    synced: true,
    accessTier: 'premium',
    premiumSource: 'allowlist',
  };
});

exports.verifyPlayPurchase = createVerifyPlayPurchaseHandler(getDb);

const TYPE_LABELS = {
  notificacion: 'Notificación',
  directa: 'Mensaje directo',
  evento: 'Evento',
  planificacion: 'Planificación',
};

async function sendExpoPushMessages(messages) {
  if (messages.length === 0) {
    return;
  }

  for (let index = 0; index < messages.length; index += 100) {
    const chunk = messages.slice(index, index + 100);
    const response = await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(chunk),
    });

    if (!response.ok) {
      console.error('Expo push error', await response.text());
    }
  }
}

exports.notifyForoPostCreated = onDocumentCreated(
  'apps/sanidapp/sanatorios/{sanatorioId}/foroPosts/{postId}',
  async (event) => {
    const snap = event.data;
    if (!snap) {
      return;
    }

    const post = snap.data();
    const { sanatorioId, postId } = event.params;
    const db = getDb();

    const sanatorioDoc = await db.doc(`apps/sanidapp/sanatorios/${sanatorioId}`).get();
    const sanatorioData = sanatorioDoc.data() ?? {};
    const sanatorioName = sanatorioData.shortName || sanatorioData.name || 'Sanatorio';

    const targetUid =
      typeof post.targetUid === 'string' && post.targetUid.trim().length > 0
        ? post.targetUid.trim()
        : null;

    if (targetUid) {
      const tokenDoc = await db
        .doc(`apps/sanidapp/sanatorios/${sanatorioId}/pushTokens/${targetUid}`)
        .get();

      if (tokenDoc.exists) {
        const tokenData = tokenDoc.data() ?? {};
        if (tokenData.expoPushToken && tokenData.uid === targetUid) {
          await sendExpoPushMessages([
            {
              to: tokenData.expoPushToken,
              sound: 'default',
              title: `Mensaje directo · ${sanatorioName}`,
              body: String(post.title ?? ''),
              priority: 'high',
              channelId: 'foro-sum',
              data: {
                screen: 'foro',
                sanatorioId,
                postId,
                type: post.type,
                targetUid,
              },
            },
          ]);
        }
      }

      return;
    }

    const tokensSnap = await db
      .collection(`apps/sanidapp/sanatorios/${sanatorioId}/pushTokens`)
      .get();

    const messages = [];

    for (const tokenDoc of tokensSnap.docs) {
      const tokenData = tokenDoc.data();

      if (tokenData.role !== 'user') {
        continue;
      }

      if (tokenData.uid === post.authorUid) {
        continue;
      }

      if (!tokenData.expoPushToken) {
        continue;
      }

      const title =
        post.type === 'notificacion'
          ? `Aviso · ${sanatorioName}`
          : `${TYPE_LABELS[post.type] || 'Foro'} · ${sanatorioName}`;

      messages.push({
        to: tokenData.expoPushToken,
        sound: 'default',
        title,
        body: String(post.title ?? ''),
        priority: 'high',
        channelId: 'foro-sum',
        data: {
          screen: 'foro',
          sanatorioId,
          postId,
          type: post.type,
        },
      });
    }

    await sendExpoPushMessages(messages);
  },
);
