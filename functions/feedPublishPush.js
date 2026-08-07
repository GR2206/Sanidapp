const { onDocumentCreated } = require('firebase-functions/v2/firestore');

function kindLabel(kind) {
  return kind === 'congresos' ? 'Congreso' : 'Curso';
}

function buildMessagesFromTokenSnap(tokensSnap, { title, body, data, skipUid }) {
  const messages = [];
  const seen = new Set();

  for (const tokenDoc of tokensSnap.docs) {
    const tokenData = tokenDoc.data() ?? {};
    const token = String(tokenData.expoPushToken || '').trim();
    const uid = String(tokenData.uid || tokenDoc.id || '').trim();
    if (!token.startsWith('ExponentPushToken')) continue;
    if (skipUid && uid === skipUid) continue;
    if (seen.has(token)) continue;
    seen.add(token);

    messages.push({
      to: token,
      sound: 'default',
      title,
      body,
      priority: 'high',
      channelId: 'foro-sum',
      data,
    });
  }

  return messages;
}

/**
 * Push al publicar feed global (Cursos/Congresos públicos) → todos los tokens globales.
 */
function createNotifyGlobalFeedPublishedHandler(getDb, sendExpoPushMessages) {
  return onDocumentCreated('apps/sanidapp/feeds/{kind}/items/{itemId}', async (event) => {
    const snap = event.data;
    if (!snap) return;

    const { kind, itemId } = event.params;
    if (!['cursos', 'congresos'].includes(kind)) return;

    const item = snap.data() ?? {};
    const title = String(item.title || '').trim() || kindLabel(kind);
    const authorUid = String(item.authorUid || '').trim();
    const db = getDb();
    const tokensSnap = await db.collection('apps/sanidapp/pushTokens').get();

    const messages = buildMessagesFromTokenSnap(tokensSnap, {
      title: `${kindLabel(kind)} nuevo`,
      body: title,
      skipUid: authorUid,
      data: {
        screen: kind,
        kind,
        audience: 'public',
        itemId,
        scopeType: 'global',
      },
    });

    if (messages.length) {
      await sendExpoPushMessages(messages);
    }
  });
}

/**
 * Push al publicar feed privado del sanatorio → solo tokens de ese sanatorio.
 */
function createNotifySanatorioFeedPublishedHandler(getDb, sendExpoPushMessages) {
  return onDocumentCreated(
    'apps/sanidapp/sanatorios/{sanatorioId}/feeds/{kind}/items/{itemId}',
    async (event) => {
      const snap = event.data;
      if (!snap) return;

      const { sanatorioId, kind, itemId } = event.params;
      if (!['cursos', 'congresos'].includes(kind)) return;

      const item = snap.data() ?? {};
      const title = String(item.title || '').trim() || kindLabel(kind);
      const authorUid = String(item.authorUid || '').trim();
      const db = getDb();

      const sanatorioDoc = await db.doc(`apps/sanidapp/sanatorios/${sanatorioId}`).get();
      const sanatorioData = sanatorioDoc.data() ?? {};
      const sanatorioName = sanatorioData.shortName || sanatorioData.name || 'Institución';

      const tokensSnap = await db
        .collection(`apps/sanidapp/sanatorios/${sanatorioId}/pushTokens`)
        .get();

      const messages = buildMessagesFromTokenSnap(tokensSnap, {
        title: `${kindLabel(kind)} · ${sanatorioName}`,
        body: title,
        skipUid: authorUid,
        data: {
          screen: kind === 'congresos' ? 'congresos-institucion' : 'cursos-institucion',
          kind,
          audience: 'institution',
          itemId,
          sanatorioId,
          scopeType: 'sanatorio',
        },
      });

      if (messages.length) {
        await sendExpoPushMessages(messages);
      }
    },
  );
}

module.exports = {
  createNotifyGlobalFeedPublishedHandler,
  createNotifySanatorioFeedPublishedHandler,
};
