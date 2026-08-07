const { onCall, HttpsError } = require('firebase-functions/v2/https');
const { FieldValue } = require('firebase-admin/firestore');

const CODE_ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
const PUBLIC_ID_LENGTH = 7;

function usersCollection(db) {
  return db.collection('apps/sanidapp/usuarios');
}

function publicIdsCollection(db) {
  return db.collection('apps/sanidapp/publicIds');
}

function randomPublicId(length = PUBLIC_ID_LENGTH) {
  let out = '';
  for (let i = 0; i < length; i += 1) {
    out += CODE_ALPHABET[Math.floor(Math.random() * CODE_ALPHABET.length)];
  }
  return out;
}

function normalizePublicId(raw) {
  return String(raw || '')
    .trim()
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, '');
}

async function allocatePublicId(db, uid) {
  for (let attempt = 0; attempt < 16; attempt += 1) {
    const publicId = randomPublicId();
    const ref = publicIdsCollection(db).doc(publicId);
    try {
      await db.runTransaction(async (tx) => {
        const snap = await tx.get(ref);
        if (snap.exists) {
          throw new Error('taken');
        }
        tx.set(ref, {
          uid,
          createdAt: FieldValue.serverTimestamp(),
        });
      });
      return publicId;
    } catch (error) {
      if (error instanceof Error && error.message === 'taken') continue;
      throw error;
    }
  }
  throw new HttpsError('internal', 'No se pudo generar un ID único.');
}

async function ensureUserPublicId(db, uid) {
  const userRef = usersCollection(db).doc(uid);
  const userSnap = await userRef.get();
  if (!userSnap.exists) {
    throw new HttpsError('not-found', 'Perfil no encontrado.');
  }
  const existing = normalizePublicId(userSnap.data()?.publicId);
  if (existing.length >= 4) {
    // Reparar índice si falta.
    const mapRef = publicIdsCollection(db).doc(existing);
    const mapSnap = await mapRef.get();
    if (!mapSnap.exists) {
      await mapRef.set({ uid, createdAt: FieldValue.serverTimestamp() });
    }
    return existing;
  }

  const publicId = await allocatePublicId(db, uid);
  await userRef.set(
    {
      publicId,
      updatedAt: FieldValue.serverTimestamp(),
    },
    { merge: true },
  );

  const sanatorioId = String(userSnap.data()?.sanatorioId || '').trim();
  if (sanatorioId) {
    try {
      await db.doc(`apps/sanidapp/sanatorios/${sanatorioId}/usuarios/${uid}`).set(
        { publicId, updatedAt: FieldValue.serverTimestamp() },
        { merge: true },
      );
    } catch {
      // mirror best-effort
    }
  }

  return publicId;
}

function displayNameFromProfile(data, email) {
  const name = `${String(data?.nombre || '').trim()} ${String(data?.apellido || '').trim()}`.trim();
  if (name) return name;
  return String(email || 'Usuario').split('@')[0];
}

async function sendExpoPush({ to, title, body, data }) {
  try {
    await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to,
        title,
        body,
        data,
        sound: 'default',
      }),
    });
  } catch (error) {
    console.warn('expo push failed', error);
  }
}

async function resolveExpoPushToken(db, uid) {
  const globalTok = await db.doc(`apps/sanidapp/pushTokens/${uid}`).get();
  const global = String(globalTok.data()?.expoPushToken || '').trim();
  if (global) return global;

  const userSnap = await usersCollection(db).doc(uid).get();
  const sanatorioId = String(userSnap.data()?.sanatorioId || '').trim();
  if (!sanatorioId) return '';
  const sTok = await db.doc(`apps/sanidapp/sanatorios/${sanatorioId}/pushTokens/${uid}`).get();
  return String(sTok.data()?.expoPushToken || '').trim();
}

function createEnsureMyPublicIdHandler(getDb) {
  return onCall(async (request) => {
    if (!request.auth) {
      throw new HttpsError('unauthenticated', 'Tenés que iniciar sesión.');
    }
    const publicId = await ensureUserPublicId(getDb(), request.auth.uid);
    return { publicId };
  });
}

function createLookupUserByPublicIdHandler(getDb) {
  return onCall(async (request) => {
    if (!request.auth) {
      throw new HttpsError('unauthenticated', 'Tenés que iniciar sesión.');
    }
    const publicId = normalizePublicId(request.data?.publicId);
    if (publicId.length < 4) {
      throw new HttpsError('invalid-argument', 'ID inválido.');
    }

    const db = getDb();
    const mapSnap = await publicIdsCollection(db).doc(publicId).get();
    if (!mapSnap.exists) {
      throw new HttpsError('not-found', 'No hay nadie con ese ID.');
    }
    const uid = String(mapSnap.data()?.uid || '').trim();
    if (!uid) {
      throw new HttpsError('not-found', 'No hay nadie con ese ID.');
    }

    const userSnap = await usersCollection(db).doc(uid).get();
    if (!userSnap.exists) {
      throw new HttpsError('not-found', 'No hay nadie con ese ID.');
    }
    const data = userSnap.data() || {};
    return {
      publicId: normalizePublicId(data.publicId) || publicId,
      displayName: displayNameFromProfile(data, data.email),
      avatarUrl: String(data.avatarUrl || '').trim(),
      isSelf: uid === request.auth.uid,
    };
  });
}

function createSendMeetingInviteHandler(getDb) {
  return onCall(async (request) => {
    if (!request.auth) {
      throw new HttpsError('unauthenticated', 'Tenés que iniciar sesión.');
    }

    const db = getDb();
    const fromUid = request.auth.uid;
    const targetPublicId = normalizePublicId(request.data?.targetPublicId);
    const joinCode = normalizePublicId(request.data?.joinCode);
    const roomTitle = String(request.data?.roomTitle || 'Sala Sanidapp').trim().slice(0, 80);
    const roomId = String(request.data?.roomId || '').trim();
    const link = String(request.data?.link || '').trim();

    if (targetPublicId.length < 4) {
      throw new HttpsError('invalid-argument', 'ID de destino inválido.');
    }
    if (joinCode.length < 4) {
      throw new HttpsError('invalid-argument', 'Código de sala inválido.');
    }

    const mapSnap = await publicIdsCollection(db).doc(targetPublicId).get();
    if (!mapSnap.exists) {
      throw new HttpsError('not-found', 'No hay nadie con ese ID.');
    }
    const targetUid = String(mapSnap.data()?.uid || '').trim();
    if (!targetUid) {
      throw new HttpsError('not-found', 'No hay nadie con ese ID.');
    }
    if (targetUid === fromUid) {
      throw new HttpsError('invalid-argument', 'No podés invitarte a vos mismo.');
    }

    const fromSnap = await usersCollection(db).doc(fromUid).get();
    const fromData = fromSnap.data() || {};
    const fromPublicId =
      normalizePublicId(fromData.publicId) || (await ensureUserPublicId(db, fromUid));
    const fromName = displayNameFromProfile(fromData, request.auth.token?.email);

    const inviteRef = usersCollection(db).doc(targetUid).collection('meetingInvites').doc();
    await inviteRef.set({
      fromUid,
      fromName,
      fromPublicId,
      targetUid,
      targetPublicId,
      joinCode,
      roomTitle,
      roomId: roomId || null,
      link: link || `sanidapp://meeting/${joinCode}`,
      status: 'pending',
      createdAt: FieldValue.serverTimestamp(),
      createdAtMs: Date.now(),
    });

    const token = await resolveExpoPushToken(db, targetUid);
    if (token) {
      await sendExpoPush({
        to: token,
        title: 'Invitación a sala',
        body: `${fromName} te invita a «${roomTitle}» (${joinCode})`,
        data: {
          type: 'meeting_invite',
          joinCode,
          inviteId: inviteRef.id,
        },
      });
    }

    return {
      inviteId: inviteRef.id,
      targetPublicId,
      targetDisplayName: displayNameFromProfile(
        (await usersCollection(db).doc(targetUid).get()).data() || {},
      ),
    };
  });
}

function createDismissMeetingInviteHandler(getDb) {
  return onCall(async (request) => {
    if (!request.auth) {
      throw new HttpsError('unauthenticated', 'Tenés que iniciar sesión.');
    }
    const inviteId = String(request.data?.inviteId || '').trim();
    if (!inviteId) {
      throw new HttpsError('invalid-argument', 'Falta inviteId.');
    }
    const db = getDb();
    const ref = usersCollection(db)
      .doc(request.auth.uid)
      .collection('meetingInvites')
      .doc(inviteId);
    const snap = await ref.get();
    if (!snap.exists) {
      throw new HttpsError('not-found', 'Invitación no encontrada.');
    }
    await ref.set(
      { status: 'dismissed', updatedAt: FieldValue.serverTimestamp() },
      { merge: true },
    );
    return { dismissed: true };
  });
}

module.exports = {
  createEnsureMyPublicIdHandler,
  createLookupUserByPublicIdHandler,
  createSendMeetingInviteHandler,
  createDismissMeetingInviteHandler,
  ensureUserPublicId,
  normalizePublicId,
};
