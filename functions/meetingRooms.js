const { onCall, HttpsError } = require('firebase-functions/v2/https');
const { FieldValue } = require('firebase-admin/firestore');
const { AccessToken, RoomServiceClient, EgressClient, EncodedFileOutput, EncodedFileType, EncodingOptionsPreset, GCPUpload, EgressStatus } = require('livekit-server-sdk');

const LIVEKIT_SECRET_OPTS = {
  secrets: ['LIVEKIT_API_KEY', 'LIVEKIT_API_SECRET', 'LIVEKIT_URL'],
};

const MEETING_LIMITS = {
  free: { maxParticipants: 4, maxDurationMinutes: 40 },
  premium: { maxParticipants: 8, maxDurationMinutes: 120 },
};

const CODE_ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';

function getLiveKitConfig() {
  const apiKey = String(process.env.LIVEKIT_API_KEY || '').trim();
  const apiSecret = String(process.env.LIVEKIT_API_SECRET || '').trim();
  let url = String(process.env.LIVEKIT_URL || '')
    .trim()
    .replace(/^["']|["']$/g, '');

  if (!apiKey || !apiSecret || !url) {
    throw new HttpsError(
      'failed-precondition',
      'Salas no configuradas. Faltan credenciales LiveKit en el servidor.',
    );
  }

  // Typo habitual al pegar el secret: "...livekit.cloudwss" en vez de "...livekit.cloud"
  url = url.replace(/\.livekit\.cloudwss\b/gi, '.livekit.cloud');
  url = url.replace(/\/+$/, '');

  // Acepta host solo, wss:// o https://
  if (!/^https?:\/\//i.test(url) && !/^wss?:\/\//i.test(url)) {
    url = `https://${url}`;
  }
  if (/^wss:\/\//i.test(url)) {
    url = `https://${url.slice(url.indexOf('://') + 3)}`;
  } else if (/^ws:\/\//i.test(url)) {
    url = `http://${url.slice(url.indexOf('://') + 3)}`;
  } else if (/^http:\/\//i.test(url)) {
    url = `https://${url.slice('http://'.length)}`;
  }

  const httpUrl = url.replace(/\/$/, '');
  if (!/\.livekit\.cloud$/i.test(httpUrl.replace(/^https:\/\//i, '').split('/')[0])) {
    // Host de proyecto LiveKit Cloud típico; no bloqueamos otros (self-host), solo log.
    console.warn('LIVEKIT_URL host inusual:', httpUrl);
  }

  const wsUrl = httpUrl.replace(/^https:\/\//i, 'wss://').replace(/^http:\/\//i, 'ws://');
  return { apiKey, apiSecret, httpUrl, wsUrl };
}

function limitsForPremium(isPremium) {
  return isPremium ? MEETING_LIMITS.premium : MEETING_LIMITS.free;
}

function randomJoinCode(length = 6) {
  let out = '';
  for (let i = 0; i < length; i += 1) {
    out += CODE_ALPHABET[Math.floor(Math.random() * CODE_ALPHABET.length)];
  }
  return out;
}

function roomsCollection(db) {
  return db.collection('apps/sanidapp/meetingRooms');
}

function normalizeParticipantUids(room) {
  if (Array.isArray(room?.participantUids)) {
    return room.participantUids.map((id) => String(id)).filter(Boolean);
  }
  return [];
}

async function isPremiumUser(db, uid, profile) {
  if (profile?.accessTier === 'premium') return true;
  if (profile?.role === 'admin' || profile?.role === 'supervisor') return true;
  try {
    const snap = await db.doc('apps/sanidapp/config/admins').get();
    const uids = snap.data()?.uids;
    if (Array.isArray(uids) && uids.includes(uid)) return true;
  } catch {
    // ignore
  }
  return false;
}

async function createUniqueJoinCode(db) {
  for (let attempt = 0; attempt < 12; attempt += 1) {
    const code = randomJoinCode(6);
    const existing = await roomsCollection(db).where('joinCode', '==', code).limit(1).get();
    if (existing.empty) return code;
  }
  throw new HttpsError('internal', 'No se pudo generar un código de sala único.');
}

async function mintParticipantToken({
  apiKey,
  apiSecret,
  roomName,
  identity,
  name,
  metadata,
  canPublish,
  canSubscribe,
  ttlSeconds,
}) {
  const at = new AccessToken(apiKey, apiSecret, {
    identity,
    name,
    ttl: ttlSeconds,
    metadata: metadata ? JSON.stringify(metadata) : undefined,
  });
  at.addGrant({
    roomJoin: true,
    room: roomName,
    canPublish,
    canSubscribe,
    canPublishData: true,
  });
  return await at.toJwt();
}

function profileMeetingMetadata(profile, displayName, email) {
  return {
    avatarUrl: String(profile?.avatarUrl ?? '').trim(),
    displayName: String(displayName ?? '').trim(),
    nombre: String(profile?.nombre ?? '').trim(),
    apellido: String(profile?.apellido ?? '').trim(),
    email: String(email ?? '').trim(),
  };
}

/** Recrea la sala LiveKit si emptyTimeout la borró pero Firestore sigue open. */
async function ensureLiveKitRoom(roomClient, { name, emptyTimeoutSec, maxParticipants }) {
  try {
    const existing = await roomClient.listRooms([name]);
    if (Array.isArray(existing) && existing.length > 0) return;
  } catch (error) {
    console.warn('LiveKit listRooms failed', error);
  }
  await roomClient.createRoom({
    name,
    emptyTimeout: Math.max(60, emptyTimeoutSec),
    maxParticipants,
  });
}

function createCreateMeetingRoomHandler(getDb) {
  return onCall(LIVEKIT_SECRET_OPTS, async (request) => {
    if (!request.auth) {
      throw new HttpsError('unauthenticated', 'Tenés que iniciar sesión.');
    }

    const uid = request.auth.uid;
    const title = String(request.data?.title ?? '').trim().slice(0, 80) || 'Sala Sanidapp';
    const db = getDb();
    const userSnap = await db.doc(`apps/sanidapp/usuarios/${uid}`).get();
    const profile = userSnap.data() ?? {};
    const isPremium = await isPremiumUser(db, uid, profile);
    const limits = limitsForPremium(isPremium);
    const { apiKey, apiSecret, httpUrl, wsUrl } = getLiveKitConfig();

    const joinCode = await createUniqueJoinCode(db);
    const livekitRoomName = `sanidapp_${joinCode}_${Date.now()}`;
    const durationSec = limits.maxDurationMinutes * 60;
    const endsAtMs = Date.now() + durationSec * 1000;

    const roomClient = new RoomServiceClient(httpUrl, apiKey, apiSecret);
    // emptyTimeout alineado a la duración de la sala (evita borrar LiveKit mientras Firestore sigue open).
    try {
      await roomClient.createRoom({
        name: livekitRoomName,
        emptyTimeout: durationSec,
        maxParticipants: limits.maxParticipants,
      });
    } catch (error) {
      console.error('LiveKit createRoom failed', {
        httpUrl,
        message: error instanceof Error ? error.message : String(error),
        cause: error?.cause,
      });
      throw new HttpsError(
        'unavailable',
        'No se pudo crear la sala de video. Revisá LIVEKIT_URL (debe ser wss://TU-PROYECTO.livekit.cloud) y las API keys.',
      );
    }

    const hostName =
      `${String(profile.nombre ?? '').trim()} ${String(profile.apellido ?? '').trim()}`.trim() ||
      String(request.auth.token?.email ?? 'Host').split('@')[0];

    const roomRef = roomsCollection(db).doc();
    await roomRef.set({
      joinCode,
      title,
      hostUid: uid,
      hostName,
      status: 'open',
      livekitRoomName,
      maxParticipants: limits.maxParticipants,
      maxDurationMinutes: limits.maxDurationMinutes,
      isPremiumHost: isPremium,
      participantUids: [uid],
      participantCount: 1,
      sanatorioId: String(profile.sanatorioId ?? '').trim() || null,
      endsAtMs,
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    });

    const token = await mintParticipantToken({
      apiKey,
      apiSecret,
      roomName: livekitRoomName,
      identity: uid,
      name: hostName,
      metadata: profileMeetingMetadata(profile, hostName, request.auth.token?.email),
      canPublish: true,
      canSubscribe: true,
      ttlSeconds: durationSec + 300,
    });

    return {
      roomId: roomRef.id,
      joinCode,
      title,
      token,
      serverUrl: wsUrl,
      livekitRoomName,
      maxParticipants: limits.maxParticipants,
      maxDurationMinutes: limits.maxDurationMinutes,
      endsAtMs,
      isHost: true,
    };
  });
}

function createJoinMeetingRoomHandler(getDb) {
  return onCall(LIVEKIT_SECRET_OPTS, async (request) => {
    if (!request.auth) {
      throw new HttpsError('unauthenticated', 'Tenés que iniciar sesión.');
    }

    const uid = request.auth.uid;
    const joinCode = String(request.data?.joinCode ?? '')
      .trim()
      .toUpperCase()
      .replace(/[^A-Z0-9]/g, '');
    if (joinCode.length < 4) {
      throw new HttpsError('invalid-argument', 'Código de sala inválido.');
    }

    const db = getDb();
    const snap = await roomsCollection(db).where('joinCode', '==', joinCode).limit(1).get();
    if (snap.empty) {
      throw new HttpsError('not-found', 'No hay una sala abierta con ese código.');
    }

    const roomDoc = snap.docs[0];
    const roomRef = roomDoc.ref;

    const seat = await db.runTransaction(async (tx) => {
      const fresh = await tx.get(roomRef);
      if (!fresh.exists) {
        throw new HttpsError('not-found', 'No hay una sala abierta con ese código.');
      }
      const room = fresh.data() ?? {};
      if (room.status !== 'open') {
        throw new HttpsError('failed-precondition', 'Esta sala ya finalizó.');
      }
      if (Number(room.endsAtMs) > 0 && Date.now() > Number(room.endsAtMs)) {
        tx.set(roomRef, { status: 'ended', updatedAt: FieldValue.serverTimestamp() }, { merge: true });
        throw new HttpsError(
          'failed-precondition',
          'Se agotó el tiempo de la sala. Creá una nueva o usá Premium para más duración.',
        );
      }

      const maxParticipants = Number(room.maxParticipants) || MEETING_LIMITS.free.maxParticipants;
      const participantUids = normalizeParticipantUids(room);
      const isHost = room.hostUid === uid;
      const alreadyIn = participantUids.includes(uid);

      if (!isHost && !alreadyIn && participantUids.length >= maxParticipants) {
        throw new HttpsError(
          'resource-exhausted',
          `La sala está llena (máx. ${maxParticipants}). Con Premium el anfitrión puede abrir salas más grandes.`,
        );
      }

      if (!alreadyIn) {
        const nextUids = [...participantUids, uid];
        tx.set(
          roomRef,
          {
            participantUids: nextUids,
            participantCount: nextUids.length,
            updatedAt: FieldValue.serverTimestamp(),
          },
          { merge: true },
        );
      }

      return {
        room,
        maxParticipants,
        isHost,
      };
    });

    const userSnap = await db.doc(`apps/sanidapp/usuarios/${uid}`).get();
    const profile = userSnap.data() ?? {};
    const displayName =
      `${String(profile.nombre ?? '').trim()} ${String(profile.apellido ?? '').trim()}`.trim() ||
      String(request.auth.token?.email ?? 'Participante').split('@')[0];

    const { apiKey, apiSecret, httpUrl, wsUrl } = getLiveKitConfig();
    const maxDurationMinutes =
      Number(seat.room.maxDurationMinutes) || MEETING_LIMITS.free.maxDurationMinutes;
    const remainingSec = Math.max(
      60,
      Math.floor((Number(seat.room.endsAtMs) - Date.now()) / 1000) + 60,
    );

    const roomClient = new RoomServiceClient(httpUrl, apiKey, apiSecret);
    await ensureLiveKitRoom(roomClient, {
      name: seat.room.livekitRoomName,
      emptyTimeoutSec: remainingSec,
      maxParticipants: seat.maxParticipants,
    });

    const token = await mintParticipantToken({
      apiKey,
      apiSecret,
      roomName: seat.room.livekitRoomName,
      identity: uid,
      name: displayName,
      metadata: profileMeetingMetadata(profile, displayName, request.auth.token?.email),
      canPublish: true,
      canSubscribe: true,
      ttlSeconds: Math.min(remainingSec, maxDurationMinutes * 60 + 300),
    });

    return {
      roomId: roomDoc.id,
      joinCode: seat.room.joinCode,
      title: seat.room.title || 'Sala Sanidapp',
      token,
      serverUrl: wsUrl,
      livekitRoomName: seat.room.livekitRoomName,
      maxParticipants: seat.maxParticipants,
      maxDurationMinutes,
      endsAtMs: Number(seat.room.endsAtMs),
      isHost: seat.isHost,
    };
  });
}

function createLeaveMeetingRoomHandler(getDb) {
  return onCall(LIVEKIT_SECRET_OPTS, async (request) => {
    if (!request.auth) {
      throw new HttpsError('unauthenticated', 'Tenés que iniciar sesión.');
    }
    const uid = request.auth.uid;
    const roomId = String(request.data?.roomId ?? '').trim();
    if (!roomId) {
      throw new HttpsError('invalid-argument', 'Falta roomId.');
    }

    const db = getDb();
    const roomRef = roomsCollection(db).doc(roomId);

    await db.runTransaction(async (tx) => {
      const snap = await tx.get(roomRef);
      if (!snap.exists) return;
      const room = snap.data() ?? {};
      if (room.status !== 'open') return;

      // El anfitrión que sale sin finalizar no libera cupo (sigue siendo dueño).
      if (room.hostUid === uid) return;

      const participantUids = normalizeParticipantUids(room).filter((id) => id !== uid);
      // Conservar host en el listado aunque no esté en participantUids por datos viejos.
      if (room.hostUid && !participantUids.includes(room.hostUid)) {
        participantUids.unshift(room.hostUid);
      }

      tx.set(
        roomRef,
        {
          participantUids,
          participantCount: participantUids.length,
          updatedAt: FieldValue.serverTimestamp(),
        },
        { merge: true },
      );
    });

    return { left: true };
  });
}

function createEndMeetingRoomHandler(getDb) {
  return onCall(LIVEKIT_SECRET_OPTS, async (request) => {
    if (!request.auth) {
      throw new HttpsError('unauthenticated', 'Tenés que iniciar sesión.');
    }
    const uid = request.auth.uid;
    const roomId = String(request.data?.roomId ?? '').trim();
    if (!roomId) {
      throw new HttpsError('invalid-argument', 'Falta roomId.');
    }

    const db = getDb();
    const roomRef = roomsCollection(db).doc(roomId);
    const roomSnap = await roomRef.get();
    if (!roomSnap.exists) {
      throw new HttpsError('not-found', 'Sala no encontrada.');
    }
    const room = roomSnap.data() ?? {};
    if (room.hostUid !== uid) {
      throw new HttpsError('permission-denied', 'Solo el anfitrión puede finalizar la sala.');
    }

    // Detener grabación en curso si la hubiera.
    if (room.egressId && room.recordingStatus === 'recording') {
      try {
        const { apiKey, apiSecret, httpUrl } = getLiveKitConfig();
        const egressClient = new EgressClient(httpUrl, apiKey, apiSecret);
        await egressClient.stopEgress(String(room.egressId));
      } catch (error) {
        console.warn('stopEgress on endMeetingRoom failed', error);
      }
    }

    try {
      const { apiKey, apiSecret, httpUrl } = getLiveKitConfig();
      const roomClient = new RoomServiceClient(httpUrl, apiKey, apiSecret);
      await roomClient.deleteRoom(room.livekitRoomName);
    } catch (error) {
      console.warn('LiveKit deleteRoom failed', error);
    }

    await roomRef.set(
      {
        status: 'ended',
        recordingStatus: room.recordingStatus === 'recording' ? 'stopped' : room.recordingStatus ?? null,
        updatedAt: FieldValue.serverTimestamp(),
      },
      { merge: true },
    );

    return { ended: true };
  });
}

function resolveGcsBucket() {
  const fromEnv = String(process.env.LIVEKIT_EGRESS_GCS_BUCKET || '').trim();
  if (fromEnv) return fromEnv;
  try {
    const cfg = JSON.parse(process.env.FIREBASE_CONFIG || '{}');
    if (cfg.storageBucket) return String(cfg.storageBucket);
  } catch {
    // ignore
  }
  return 'sanidapp-b67d7.appspot.com';
}

function buildRecordingFileOutput(roomId) {
  const filepath = `sanidapp/meeting-recordings/${roomId}/{time}.mp4`;
  const creds = String(process.env.LIVEKIT_EGRESS_GCS_CREDENTIALS || '').trim();
  if (creds) {
    return new EncodedFileOutput({
      fileType: EncodedFileType.MP4,
      filepath,
      output: {
        case: 'gcp',
        value: new GCPUpload({
          credentials: creds,
          bucket: resolveGcsBucket(),
        }),
      },
    });
  }
  // LiveKit Cloud: sin output custom → almacenamiento temporal + location URL.
  return new EncodedFileOutput({
    fileType: EncodedFileType.MP4,
    filepath,
  });
}

function createStartMeetingRecordingHandler(getDb) {
  return onCall(LIVEKIT_SECRET_OPTS, async (request) => {
    if (!request.auth) {
      throw new HttpsError('unauthenticated', 'Tenés que iniciar sesión.');
    }
    const uid = request.auth.uid;
    const roomId = String(request.data?.roomId ?? '').trim();
    if (!roomId) {
      throw new HttpsError('invalid-argument', 'Falta roomId.');
    }

    const db = getDb();
    const roomRef = roomsCollection(db).doc(roomId);
    const roomSnap = await roomRef.get();
    if (!roomSnap.exists) {
      throw new HttpsError('not-found', 'Sala no encontrada.');
    }
    const room = roomSnap.data() ?? {};
    if (room.hostUid !== uid) {
      throw new HttpsError('permission-denied', 'Solo el anfitrión puede grabar la sala.');
    }
    if (room.status !== 'open') {
      throw new HttpsError('failed-precondition', 'La sala ya finalizó.');
    }
    if (room.recordingStatus === 'recording' && room.egressId) {
      return { egressId: room.egressId, alreadyRecording: true };
    }

    const { apiKey, apiSecret, httpUrl } = getLiveKitConfig();
    const egressClient = new EgressClient(httpUrl, apiKey, apiSecret);
    let info;
    try {
      info = await egressClient.startRoomCompositeEgress(
        room.livekitRoomName,
        buildRecordingFileOutput(roomId),
        {
          layout: 'grid',
          encodingOptions: EncodingOptionsPreset.H264_720P_30,
        },
      );
    } catch (error) {
      console.error('startRoomCompositeEgress failed', error);
      throw new HttpsError(
        'unavailable',
        'No se pudo iniciar la grabación. Verificá que Egress esté habilitado en LiveKit Cloud.',
      );
    }

    const egressId = String(info?.egressId || info?.egress_id || '');
    if (!egressId) {
      throw new HttpsError('internal', 'LiveKit no devolvió egressId.');
    }

    await roomRef.set(
      {
        recordingStatus: 'recording',
        egressId,
        recordingStartedAtMs: Date.now(),
        updatedAt: FieldValue.serverTimestamp(),
      },
      { merge: true },
    );

    return { egressId, alreadyRecording: false };
  });
}

async function waitForEgressFile(egressClient, egressId, { timeoutMs = 90000 } = {}) {
  const started = Date.now();
  while (Date.now() - started < timeoutMs) {
    const listed = await egressClient.listEgress({ egressId });
    const info = Array.isArray(listed) ? listed[0] : listed?.items?.[0] || listed;
    if (!info) {
      await new Promise((r) => setTimeout(r, 1500));
      continue;
    }
    const status = info.status;
    const done =
      status === EgressStatus.EGRESS_COMPLETE ||
      status === 'EGRESS_COMPLETE' ||
      status === 3;
    const failed =
      status === EgressStatus.EGRESS_FAILED ||
      status === 'EGRESS_FAILED' ||
      status === 4;
    if (failed) {
      throw new HttpsError('internal', 'La grabación falló en LiveKit.');
    }
    if (done) {
      const file = (info.fileResults && info.fileResults[0]) || info.file || null;
      const location = String(file?.location || '').trim();
      const durationNs = file?.duration != null ? Number(file.duration) : 0;
      const durationMs = durationNs > 1e12 ? Math.round(durationNs / 1e6) : durationNs > 1e6 ? Math.round(durationNs / 1e6) : durationNs;
      return {
        downloadUrl: location,
        filename: String(file?.filename || `${egressId}.mp4`),
        durationMs: Number.isFinite(durationMs) ? durationMs : 0,
        sizeBytes: file?.size != null ? Number(file.size) : 0,
      };
    }
    await new Promise((r) => setTimeout(r, 1500));
  }
  throw new HttpsError(
    'deadline-exceeded',
    'La grabación se detuvo pero el archivo aún no está listo. Reintentá en unos segundos.',
  );
}

function createStopMeetingRecordingHandler(getDb) {
  return onCall(LIVEKIT_SECRET_OPTS, async (request) => {
    if (!request.auth) {
      throw new HttpsError('unauthenticated', 'Tenés que iniciar sesión.');
    }
    const uid = request.auth.uid;
    const roomId = String(request.data?.roomId ?? '').trim();
    if (!roomId) {
      throw new HttpsError('invalid-argument', 'Falta roomId.');
    }

    const db = getDb();
    const roomRef = roomsCollection(db).doc(roomId);
    const roomSnap = await roomRef.get();
    if (!roomSnap.exists) {
      throw new HttpsError('not-found', 'Sala no encontrada.');
    }
    const room = roomSnap.data() ?? {};
    if (room.hostUid !== uid) {
      throw new HttpsError('permission-denied', 'Solo el anfitrión puede detener la grabación.');
    }
    const egressId = String(room.egressId || '').trim();
    if (!egressId || room.recordingStatus !== 'recording') {
      throw new HttpsError('failed-precondition', 'No hay una grabación en curso.');
    }

    const { apiKey, apiSecret, httpUrl } = getLiveKitConfig();
    const egressClient = new EgressClient(httpUrl, apiKey, apiSecret);
    try {
      await egressClient.stopEgress(egressId);
    } catch (error) {
      console.warn('stopEgress failed (may already be stopped)', error);
    }

    const file = await waitForEgressFile(egressClient, egressId);
    if (!file.downloadUrl) {
      await roomRef.set(
        {
          recordingStatus: 'stopped',
          updatedAt: FieldValue.serverTimestamp(),
        },
        { merge: true },
      );
      throw new HttpsError(
        'unavailable',
        'Grabación lista en LiveKit pero sin URL de descarga. Configurá LIVEKIT_EGRESS_GCS_CREDENTIALS hacia Firebase Storage.',
      );
    }

    await roomRef.set(
      {
        recordingStatus: 'ready',
        recordingDownloadUrl: file.downloadUrl,
        recordingFilename: file.filename,
        recordingDurationMs: file.durationMs,
        recordingEndedAtMs: Date.now(),
        updatedAt: FieldValue.serverTimestamp(),
      },
      { merge: true },
    );

    return {
      downloadUrl: file.downloadUrl,
      filename: file.filename,
      durationMs: file.durationMs,
      title: room.title || 'Sala Sanidapp',
      roomId,
      joinCode: room.joinCode || '',
    };
  });
}

module.exports = {
  createCreateMeetingRoomHandler,
  createJoinMeetingRoomHandler,
  createLeaveMeetingRoomHandler,
  createEndMeetingRoomHandler,
  createStartMeetingRecordingHandler,
  createStopMeetingRecordingHandler,
  MEETING_LIMITS,
};
