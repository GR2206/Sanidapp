const { onSchedule } = require('firebase-functions/v2/scheduler');
const { FieldValue } = require('firebase-admin/firestore');

const DEFAULT_TZ = 'America/Argentina/Buenos_Aires';

function ymdInTimeZone(date, timeZone) {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(date);
}

function tomorrowYmd(timeZone = DEFAULT_TZ) {
  const today = ymdInTimeZone(new Date(), timeZone);
  const [y, m, d] = today.split('-').map((part) => Number(part));
  const next = new Date(Date.UTC(y, m - 1, d + 1));
  return next.toISOString().slice(0, 10);
}

function parseItemDateYmd(dateStr) {
  const raw = String(dateStr ?? '').trim();
  if (!raw) return null;
  const iso = raw.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (iso) return `${iso[1]}-${iso[2]}-${iso[3]}`;
  const dmy = raw.match(/^(\d{1,2})[\/\-.](\d{1,2})[\/\-.](\d{4})/);
  if (dmy) {
    return `${dmy[3]}-${dmy[2].padStart(2, '0')}-${dmy[1].padStart(2, '0')}`;
  }
  return null;
}

async function collectFeedItemsForDate(db, targetYmd) {
  const items = [];

  for (const kind of ['cursos', 'congresos']) {
    const globalSnap = await db.collection(`apps/sanidapp/feeds/${kind}/items`).get();
    for (const doc of globalSnap.docs) {
      const data = doc.data() ?? {};
      if (parseItemDateYmd(data.date) === targetYmd) {
        items.push({
          id: doc.id,
          kind,
          scopeType: 'global',
          sanatorioId: null,
          title: String(data.title || doc.id),
          ref: doc.ref,
          data,
        });
      }
    }
  }

  const sanatoriosSnap = await db.collection('apps/sanidapp/sanatorios').get();
  for (const sanatorioDoc of sanatoriosSnap.docs) {
    const sanatorioId = sanatorioDoc.id;
    for (const kind of ['cursos', 'congresos']) {
      const snap = await db
        .collection(`apps/sanidapp/sanatorios/${sanatorioId}/feeds/${kind}/items`)
        .get();
      for (const doc of snap.docs) {
        const data = doc.data() ?? {};
        if (parseItemDateYmd(data.date) === targetYmd) {
          items.push({
            id: doc.id,
            kind,
            scopeType: 'sanatorio',
            sanatorioId,
            title: String(data.title || doc.id),
            ref: doc.ref,
            data,
          });
        }
      }
    }
  }

  return items;
}

async function collectTokensForItem(db, item) {
  const tokens = new Map();

  const addSnap = (snap) => {
    for (const doc of snap.docs) {
      const token = String(doc.data()?.expoPushToken || '').trim();
      if (token.startsWith('ExponentPushToken')) {
        tokens.set(token, true);
      }
    }
  };

  if (item.scopeType === 'sanatorio' && item.sanatorioId) {
    const sanatorioTokens = await db
      .collection(`apps/sanidapp/sanatorios/${item.sanatorioId}/pushTokens`)
      .get();
    addSnap(sanatorioTokens);
  } else {
    const globalTokens = await db.collection('apps/sanidapp/pushTokens').get();
    addSnap(globalTokens);
  }

  const inscriptions = await db.collection('apps/sanidapp/feedInscriptions').limit(400).get();
  for (const doc of inscriptions.docs) {
    const data = doc.data() ?? {};
    if (data.status !== 'approved') continue;
    if (data.kind !== item.kind || data.itemId !== item.id) continue;
    const uid = String(data.uid || '').trim();
    if (!uid) continue;

    const globalTok = await db.doc(`apps/sanidapp/pushTokens/${uid}`).get();
    const gToken = String(globalTok.data()?.expoPushToken || '').trim();
    if (gToken.startsWith('ExponentPushToken')) {
      tokens.set(gToken, true);
    }

    const userSanatorio = String(data.sanatorioId || '').trim();
    if (userSanatorio) {
      const sTok = await db
        .doc(`apps/sanidapp/sanatorios/${userSanatorio}/pushTokens/${uid}`)
        .get();
      const token = String(sTok.data()?.expoPushToken || '').trim();
      if (token.startsWith('ExponentPushToken')) {
        tokens.set(token, true);
      }
    }
  }

  return Array.from(tokens.keys());
}

/**
 * Diario 12:00 Argentina: recordatorio de cursos/congresos que se dictan mañana.
 */
function createFeedReminderScheduleHandler(getDb, sendExpoPushMessages) {
  return onSchedule(
    {
      schedule: '0 12 * * *',
      timeZone: DEFAULT_TZ,
      region: 'us-central1',
    },
    async () => {
      const db = getDb();
      const targetYmd = tomorrowYmd(DEFAULT_TZ);
      const items = await collectFeedItemsForDate(db, targetYmd);
      let sent = 0;

      for (const item of items) {
        if (item.data.reminder1dSentFor === targetYmd) {
          continue;
        }

        const tokens = await collectTokensForItem(db, item);
        if (tokens.length === 0) {
          await item.ref.set(
            { reminder1dSentFor: targetYmd, reminder1dAt: FieldValue.serverTimestamp() },
            { merge: true },
          );
          continue;
        }

        const kindLabel = item.kind === 'congresos' ? 'Congreso' : 'Curso';
        const messages = tokens.map((to) => ({
          to,
          sound: 'default',
          title: `Mañana · ${kindLabel}`,
          body: `Recordatorio: «${item.title}» se dicta mañana. ¡No faltes!`,
          priority: 'high',
          channelId: 'foro-sum',
          data: {
            screen: item.kind,
            kind: item.kind,
            itemId: item.id,
          },
        }));

        await sendExpoPushMessages(messages);
        sent += messages.length;

        await item.ref.set(
          {
            reminder1dSentFor: targetYmd,
            reminder1dAt: FieldValue.serverTimestamp(),
            reminder1dRecipients: messages.length,
          },
          { merge: true },
        );
      }

      console.log(`feedReminders: target=${targetYmd} items=${items.length} pushes=${sent}`);
    },
  );
}

module.exports = {
  createFeedReminderScheduleHandler,
  tomorrowYmd,
  parseItemDateYmd,
};
