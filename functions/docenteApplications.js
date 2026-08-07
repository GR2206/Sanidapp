const { onCall, HttpsError } = require('firebase-functions/v2/https');
const { onDocumentCreated } = require('firebase-functions/v2/firestore');
const { FieldValue } = require('firebase-admin/firestore');

async function assertAdmin(getDb, request) {
  if (!request.auth) {
    throw new HttpsError('unauthenticated', 'Tenés que iniciar sesión.');
  }
  const uid = request.auth.uid;
  const db = getDb();
  const userSnap = await db.doc(`apps/sanidapp/usuarios/${uid}`).get();
  if (userSnap.data()?.role === 'admin') {
    return uid;
  }
  const adminsSnap = await db.doc('apps/sanidapp/config/admins').get();
  const uids = adminsSnap.data()?.uids;
  if (Array.isArray(uids) && uids.includes(uid)) {
    return uid;
  }
  throw new HttpsError('permission-denied', 'Solo administradores.');
}

function mapApplication(id, data) {
  return {
    id,
    uid: data.uid ?? null,
    email: data.email ?? null,
    nombre: data.nombre ?? null,
    apellido: data.apellido ?? null,
    profesion: data.profesion ?? null,
    universidad: data.universidad ?? null,
    tituloAcademico: data.tituloAcademico ?? null,
    areaCursos: data.areaCursos ?? null,
    certificadoUrl: data.certificadoUrl ?? null,
    declaracionJurada: Boolean(data.declaracionJurada),
    status: data.status ?? 'pending',
    rejectReason: data.rejectReason ?? null,
    reviewedBy: data.reviewedBy ?? null,
    reviewedAt: data.reviewedAt ?? null,
    createdAt: data.createdAt?.toDate?.()?.toISOString?.() ?? data.createdAt ?? null,
  };
}

function createSubmitDocenteApplicationHandler(getDb) {
  return onCall(async (request) => {
    if (!request.auth) {
      throw new HttpsError('unauthenticated', 'Tenés que iniciar sesión.');
    }

    const uid = request.auth.uid;
    const universidad = String(request.data?.universidad ?? '').trim();
    const tituloAcademico = String(request.data?.tituloAcademico ?? '').trim();
    const areaCursos = String(request.data?.areaCursos ?? '').trim();
    const certificadoUrl = String(request.data?.certificadoUrl ?? '').trim();
    const declaracionJurada = Boolean(request.data?.declaracionJurada);

    if (!universidad || universidad.length < 3) {
      throw new HttpsError('invalid-argument', 'Indicá la universidad o institución que te avala.');
    }
    if (!tituloAcademico || tituloAcademico.length < 2) {
      throw new HttpsError('invalid-argument', 'Indicá tu título o cargo académico.');
    }
    if (!areaCursos || areaCursos.length < 3) {
      throw new HttpsError('invalid-argument', 'Indicá el área o tema de tus cursos.');
    }
    if (!certificadoUrl.startsWith('https://')) {
      throw new HttpsError('invalid-argument', 'Subí el certificado en JPG o PNG.');
    }
    if (!declaracionJurada) {
      throw new HttpsError('invalid-argument', 'Debés aceptar la declaración jurada.');
    }

    const db = getDb();
    const userSnap = await db.doc(`apps/sanidapp/usuarios/${uid}`).get();
    if (!userSnap.exists) {
      throw new HttpsError('failed-precondition', 'Perfil de usuario no encontrado.');
    }
    const user = userSnap.data() ?? {};

    if (user.canPublishFeeds === true) {
      throw new HttpsError('already-exists', 'Ya tenés habilitación docente para publicar.');
    }

    const existing = await db
      .collection('apps/sanidapp/docenteApplications')
      .where('uid', '==', uid)
      .limit(20)
      .get();
    const hasPending = existing.docs.some((doc) => doc.data()?.status === 'pending');
    if (hasPending) {
      throw new HttpsError(
        'already-exists',
        'Ya tenés una solicitud pendiente de revisión.',
      );
    }

    const ref = db.collection('apps/sanidapp/docenteApplications').doc();
    const payload = {
      uid,
      email: String(user.email || request.auth.token?.email || '').trim(),
      nombre: String(user.nombre || '').trim(),
      apellido: String(user.apellido || '').trim(),
      profesion: String(user.profesion || '').trim(),
      universidad,
      tituloAcademico,
      areaCursos,
      certificadoUrl,
      declaracionJurada: true,
      declaracionJuradaAt: FieldValue.serverTimestamp(),
      status: 'pending',
      rejectReason: null,
      reviewedBy: null,
      reviewedAt: null,
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    };
    await ref.set(payload);

    return { ok: true, applicationId: ref.id, item: mapApplication(ref.id, payload) };
  });
}

function createListDocenteApplicationsHandler(getDb) {
  return onCall(async (request) => {
    await assertAdmin(getDb, request);
    const statusFilter = String(request.data?.status ?? 'pending').trim() || 'pending';
    const db = getDb();
    const snap = await db.collection('apps/sanidapp/docenteApplications').limit(200).get();
    const items = snap.docs
      .map((doc) => mapApplication(doc.id, doc.data() ?? {}))
      .filter((item) => (statusFilter === 'all' ? true : item.status === statusFilter))
      .sort((a, b) => String(b.createdAt || '').localeCompare(String(a.createdAt || '')));
    return { items };
  });
}

function createGetMyDocenteApplicationHandler(getDb) {
  return onCall(async (request) => {
    if (!request.auth) {
      throw new HttpsError('unauthenticated', 'Tenés que iniciar sesión.');
    }
    const uid = request.auth.uid;
    const db = getDb();
    const snap = await db
      .collection('apps/sanidapp/docenteApplications')
      .where('uid', '==', uid)
      .limit(20)
      .get();
    const items = snap.docs
      .map((doc) => mapApplication(doc.id, doc.data() ?? {}))
      .sort((a, b) => String(b.createdAt || '').localeCompare(String(a.createdAt || '')));
    return { item: items[0] ?? null, items };
  });
}

function createReviewDocenteApplicationHandler(getDb) {
  return onCall(async (request) => {
    const adminUid = await assertAdmin(getDb, request);
    const applicationId = String(request.data?.applicationId ?? '').trim();
    const decision = String(request.data?.decision ?? '').trim();
    const rejectReason = String(request.data?.rejectReason ?? '').trim();

    if (!applicationId) {
      throw new HttpsError('invalid-argument', 'Falta applicationId.');
    }
    if (decision !== 'approved' && decision !== 'rejected') {
      throw new HttpsError('invalid-argument', 'Decisión inválida.');
    }
    if (decision === 'rejected' && !rejectReason) {
      throw new HttpsError('invalid-argument', 'Indicá el motivo del rechazo.');
    }

    const db = getDb();
    const appRef = db.doc(`apps/sanidapp/docenteApplications/${applicationId}`);
    const appSnap = await appRef.get();
    if (!appSnap.exists) {
      throw new HttpsError('not-found', 'Solicitud no encontrada.');
    }
    const app = appSnap.data() ?? {};
    if (app.status !== 'pending') {
      throw new HttpsError('failed-precondition', 'Esta solicitud ya fue resuelta.');
    }

    const uid = String(app.uid || '').trim();
    if (!uid) {
      throw new HttpsError('failed-precondition', 'Solicitud sin usuario.');
    }

    if (decision === 'approved') {
      const userRef = db.doc(`apps/sanidapp/usuarios/${uid}`);
      const userSnap = await userRef.get();
      const existingRole = userSnap.data()?.role;
      const premiumPayload = {
        accessTier: 'premium',
        institutionToken: '',
        premiumSource: 'docente',
        premiumGrantedAt: new Date().toISOString(),
        canPublishFeeds: true,
        updatedAt: FieldValue.serverTimestamp(),
      };
      if (existingRole !== 'admin' && existingRole !== 'supervisor') {
        // Docente premium: role user (igual que enfermero premium).
        premiumPayload.role = 'user';
      }
      await userRef.set(premiumPayload, { merge: true });

      const sanatorioId = String(userSnap.data()?.sanatorioId || '').trim();
      if (sanatorioId) {
        await db
          .doc(`apps/sanidapp/sanatorios/${sanatorioId}/usuarios/${uid}`)
          .set(premiumPayload, { merge: true });
      }
    }

    await appRef.set(
      {
        status: decision,
        rejectReason: decision === 'rejected' ? rejectReason : null,
        reviewedBy: adminUid,
        reviewedAt: FieldValue.serverTimestamp(),
        updatedAt: FieldValue.serverTimestamp(),
      },
      { merge: true },
    );

    const updated = await appRef.get();
    return { ok: true, item: mapApplication(applicationId, updated.data() ?? {}) };
  });
}

function createNotifyAdminsOnDocenteApplicationHandler(getDb, sendExpoPushMessages) {
  return onDocumentCreated(
    'apps/sanidapp/docenteApplications/{applicationId}',
    async (event) => {
      const snap = event.data;
      if (!snap) return;
      const data = snap.data() ?? {};
      if (data.status !== 'pending') return;

      const db = getDb();
      const adminsSnap = await db.doc('apps/sanidapp/config/admins').get();
      const adminUids = Array.isArray(adminsSnap.data()?.uids) ? adminsSnap.data().uids : [];

      const tokens = new Set();
      for (const adminUid of adminUids) {
        const globalTok = await db.doc(`apps/sanidapp/pushTokens/${adminUid}`).get();
        const token = String(globalTok.data()?.expoPushToken || '').trim();
        if (token.startsWith('ExponentPushToken')) {
          tokens.add(token);
        }
      }

      // También usuarios con role admin que tengan token global.
      const usersSnap = await db
        .collection('apps/sanidapp/usuarios')
        .where('role', '==', 'admin')
        .limit(20)
        .get();
      for (const doc of usersSnap.docs) {
        const globalTok = await db.doc(`apps/sanidapp/pushTokens/${doc.id}`).get();
        const token = String(globalTok.data()?.expoPushToken || '').trim();
        if (token.startsWith('ExponentPushToken')) {
          tokens.add(token);
        }
      }

      if (tokens.size === 0) {
        console.log('docenteApplication: no admin push tokens');
        return;
      }

      const name = `${data.nombre || ''} ${data.apellido || ''}`.trim() || data.email || 'Docente';
      await sendExpoPushMessages(
        Array.from(tokens).map((to) => ({
          to,
          sound: 'default',
          title: 'Nueva solicitud docente',
          body: `${name} · ${data.universidad || 'Universidad'} — revisá en Docentes.`,
          priority: 'high',
          channelId: 'foro-sum',
          data: { screen: 'docente-applications' },
        })),
      );
    },
  );
}

module.exports = {
  createSubmitDocenteApplicationHandler,
  createListDocenteApplicationsHandler,
  createGetMyDocenteApplicationHandler,
  createReviewDocenteApplicationHandler,
  createNotifyAdminsOnDocenteApplicationHandler,
};
