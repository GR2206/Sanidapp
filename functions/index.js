const { createVerifyPlayPurchaseHandler } = require('./playBilling');
const {
  createMercadoPagoCheckoutHandler,
  createMercadoPagoWebhookHandler,
  mpFetch,
  MP_SECRET_OPTS,
} = require('./mercadoPago');
const { createBootstrapFirstAdminHandler } = require('./bootstrapAdmin');
const { createFeedInscriptionCheckoutHandler } = require('./feedInscriptionMp');
const { createConfirmExternalFeedInscriptionHandler } = require('./feedInscriptionExternal');
const { recordFeedInscriptionFromStripeSession } = require('./feedInscriptionStripe');
const {
  createStripeConnectOnboardingHandler,
  createGetStripeConnectStatusHandler,
  createStripeWebhookHandler,
} = require('./stripeConnect');
const {
  createListFeedPayoutsHandler,
  createSettleFeedPayoutHandler,
} = require('./feedPayout');
const {
  createCreateMeetingRoomHandler,
  createJoinMeetingRoomHandler,
  createLeaveMeetingRoomHandler,
  createEndMeetingRoomHandler,
  createStartMeetingRecordingHandler,
  createStopMeetingRecordingHandler,
} = require('./meetingRooms');
const {
  createEnsureMyPublicIdHandler,
  createLookupUserByPublicIdHandler,
  createSendMeetingInviteHandler,
  createDismissMeetingInviteHandler,
} = require('./publicUserIds');
const { createListFeedInscriptionsHandler } = require('./feedInscriptionRoster');
const { createFeedReminderScheduleHandler } = require('./feedReminders');
const {
  createNotifyGlobalFeedPublishedHandler,
  createNotifySanatorioFeedPublishedHandler,
} = require('./feedPublishPush');
const {
  createSubmitDocenteApplicationHandler,
  createListDocenteApplicationsHandler,
  createGetMyDocenteApplicationHandler,
  createReviewDocenteApplicationHandler,
  createNotifyAdminsOnDocenteApplicationHandler,
} = require('./docenteApplications');
const {
  createIncrementUserStatsHandler,
  createDecrementUserStatsHandler,
  createSyncPublicAppStatsHandler,
} = require('./publicAppStats');
const { findStaffMatch, loadStaffAllowlist, normalizePersonText } = require('./staffAllowlist');
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

async function isConfiguredAdmin(db, uid, role) {
  if (role === 'admin') {
    return true;
  }
  try {
    const snap = await db.doc('apps/sanidapp/config/admins').get();
    if (!snap.exists) {
      return false;
    }
    const uids = snap.data()?.uids;
    return Array.isArray(uids) && uids.includes(uid);
  } catch {
    return false;
  }
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

  // El código institucional solo vale si la persona figura en el padrón de ESE sanatorio.
  let staffMatch;
  try {
    const staff = await loadStaffAllowlist(config, sanatorioId);
    staffMatch = findStaffMatch(
      staff,
      String(userData.nombre ?? ''),
      String(userData.apellido ?? ''),
    );
  } catch (error) {
    console.warn('No se pudo verificar padrón al canjear token:', error);
    throw new HttpsError(
      'failed-precondition',
      'No pudimos verificar el padrón del sanatorio. Contactá a tu institución.',
    );
  }

  if (!staffMatch) {
    throw new HttpsError(
      'permission-denied',
      'El código es válido, pero no figurás en el padrón de este sanatorio. Pedile a RRHH que te agregue al listado.',
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

  // Rol supervisor solo si el padrón del sanatorio lo marca (nunca por profesión libre).
  // No tocar admin (perfil o lista config/admins).
  const rango = normalizePersonText(staffMatch?.rango);
  const keepAdmin = await isConfiguredAdmin(db, uid, userData.role);
  if (!keepAdmin) {
    payload.role = rango.includes('supervisor') ? 'supervisor' : 'user';
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

  if (await isConfiguredAdmin(db, uid, userData.role)) {
    if (userData.role !== 'admin' || userData.accessTier !== 'premium') {
      await applyPremiumPayload(db, uid, sanatorioId || null, {
        role: 'admin',
        accessTier: 'premium',
        premiumSource: userData.premiumSource || 'admin',
        updatedAt: FieldValue.serverTimestamp(),
      });
    }
    return {
      synced: false,
      accessTier: 'premium',
      premiumSource: userData.premiumSource || 'admin',
      role: 'admin',
    };
  }

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
    // Sin fila en padrón: no premium institucional y no supervisor.
    if (userData.role === 'supervisor') {
      await applyPremiumPayload(db, uid, sanatorioId, {
        role: 'user',
        updatedAt: FieldValue.serverTimestamp(),
      });
    }

    return {
      synced: false,
      accessTier: userData.accessTier === 'premium' ? 'premium' : 'free',
      premiumSource: userData.premiumSource ?? '',
      role: userData.role === 'supervisor' ? 'user' : userData.role ?? 'user',
    };
  }

  const isSupervisor = normalizePersonText(match.rango).includes('supervisor');
  const rolePayload =
    userData.role === 'admin'
      ? {}
      : { role: isSupervisor ? 'supervisor' : 'user' };

  if (userData.accessTier === 'premium') {
    if (rolePayload.role && rolePayload.role !== userData.role) {
      await applyPremiumPayload(db, uid, sanatorioId, {
        ...rolePayload,
        updatedAt: FieldValue.serverTimestamp(),
      });
    }

    return {
      synced: false,
      accessTier: 'premium',
      premiumSource: userData.premiumSource ?? '',
      role: rolePayload.role ?? userData.role ?? 'user',
    };
  }

  const payload = {
    accessTier: 'premium',
    institutionToken: '',
    premiumSource: 'allowlist',
    premiumGrantedAt: new Date().toISOString(),
    updatedAt: FieldValue.serverTimestamp(),
    ...rolePayload,
  };

  await applyPremiumPayload(db, uid, sanatorioId, payload);

  return {
    synced: true,
    accessTier: 'premium',
    premiumSource: 'allowlist',
    role: rolePayload.role ?? userData.role ?? 'user',
  };
});

exports.verifyPlayPurchase = createVerifyPlayPurchaseHandler(getDb);
exports.bootstrapFirstAdmin = createBootstrapFirstAdminHandler(getDb);
exports.createMercadoPagoCheckout = createMercadoPagoCheckoutHandler(getDb);
/** Checkout cursos: MP (ARS) + Stripe Connect (EUR/USD). */
const FEED_CHECKOUT_SECRET_OPTS = {
  secrets: ['MERCADO_PAGO_ACCESS_TOKEN_TEST', 'MERCADO_PAGO_ACCESS_TOKEN_LIVE'],
};
exports.createFeedInscriptionCheckout = createFeedInscriptionCheckoutHandler(
  getDb,
  mpFetch,
  FEED_CHECKOUT_SECRET_OPTS,
);
exports.confirmExternalFeedInscription = createConfirmExternalFeedInscriptionHandler(getDb);
exports.createMeetingRoom = createCreateMeetingRoomHandler(getDb);
exports.joinMeetingRoom = createJoinMeetingRoomHandler(getDb);
exports.leaveMeetingRoom = createLeaveMeetingRoomHandler(getDb);
exports.endMeetingRoom = createEndMeetingRoomHandler(getDb);
exports.startMeetingRecording = createStartMeetingRecordingHandler(getDb);
exports.stopMeetingRecording = createStopMeetingRecordingHandler(getDb);
exports.ensureMyPublicId = createEnsureMyPublicIdHandler(getDb);
exports.lookupUserByPublicId = createLookupUserByPublicIdHandler(getDb);
exports.sendMeetingInvite = createSendMeetingInviteHandler(getDb);
exports.dismissMeetingInvite = createDismissMeetingInviteHandler(getDb);
exports.createStripeConnectOnboarding = createStripeConnectOnboardingHandler(getDb);
exports.getStripeConnectStatus = createGetStripeConnectStatusHandler(getDb);
exports.stripeWebhook = createStripeWebhookHandler(getDb, {
  recordFeedInscriptionFromStripeSession,
});
exports.listFeedPayouts = createListFeedPayoutsHandler(getDb);
exports.settleFeedPayout = createSettleFeedPayoutHandler(getDb, mpFetch, MP_SECRET_OPTS);
exports.listFeedInscriptions = createListFeedInscriptionsHandler(getDb);
exports.mercadoPagoWebhook = createMercadoPagoWebhookHandler(getDb);
exports.submitDocenteApplication = createSubmitDocenteApplicationHandler(getDb);
exports.listDocenteApplications = createListDocenteApplicationsHandler(getDb);
exports.getMyDocenteApplication = createGetMyDocenteApplicationHandler(getDb);
exports.reviewDocenteApplication = createReviewDocenteApplicationHandler(getDb);
exports.syncPublicAppStats = createSyncPublicAppStatsHandler(getDb);
exports.onUsuarioCreatedUpdateStats = createIncrementUserStatsHandler(getDb);
exports.onUsuarioDeletedUpdateStats = createDecrementUserStatsHandler(getDb);

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

exports.sendFeedDayBeforeReminders = createFeedReminderScheduleHandler(
  getDb,
  sendExpoPushMessages,
);
exports.notifyGlobalFeedPublished = createNotifyGlobalFeedPublishedHandler(
  getDb,
  sendExpoPushMessages,
);
exports.notifySanatorioFeedPublished = createNotifySanatorioFeedPublishedHandler(
  getDb,
  sendExpoPushMessages,
);
exports.notifyAdminsOnDocenteApplication = createNotifyAdminsOnDocenteApplicationHandler(
  getDb,
  sendExpoPushMessages,
);

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
