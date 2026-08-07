import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  serverTimestamp,
  setDoc,
  type DocumentData,
  type Firestore,
} from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

import { FIRESTORE_PATHS } from '@/constants/firebase';
import { i18nError } from '@/i18n/resolveMessage';
import { getFirebaseStorage, getFirestoreDb } from '@/services/firebase/firebaseApp';
import type { FeedItem, FeedKind, FeedPage, FeedPublishScope } from '@/types/feed';

type PathSegments = readonly [string, ...string[]];

function asPath(segments: readonly string[]): PathSegments {
  if (segments.length === 0) {
    throw new Error('Firestore path vacío');
  }
  return segments as PathSegments;
}

function feedCollection(db: Firestore, path: readonly string[]) {
  const segments = asPath(path);
  return collection(db, ...segments);
}

function feedDoc(db: Firestore, path: readonly string[]) {
  const segments = asPath(path);
  return doc(db, ...segments);
}

function stringOrEmpty(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

export function feedItemFromFirestore(id: string, data: DocumentData): FeedItem {
  return {
    id,
    title: stringOrEmpty(data.title) || 'Sin título',
    subtitle: stringOrEmpty(data.subtitle) || undefined,
    caption: stringOrEmpty(data.caption) || undefined,
    date: stringOrEmpty(data.date) || undefined,
    location: stringOrEmpty(data.location) || undefined,
    imageUrl: stringOrEmpty(data.imageUrl) || undefined,
    url: stringOrEmpty(data.url) || undefined,
    linkLabel: stringOrEmpty(data.linkLabel) || undefined,
    body: stringOrEmpty(data.body) || undefined,
    cupos: stringOrEmpty(data.cupos) || undefined,
    precio: stringOrEmpty(data.precio) || undefined,
    modalidad: stringOrEmpty(data.modalidad) || undefined,
    finaliza: stringOrEmpty(data.finaliza) || undefined,
    duracion: stringOrEmpty(data.duracion) || undefined,
    speakerPage: stringOrEmpty(data.speakerPage) || undefined,
    idioma: stringOrEmpty(data.idioma) || undefined,
    zonaHoraria: stringOrEmpty(data.zonaHoraria) || undefined,
    paymentMode:
      data.paymentMode === 'in_app' || data.paymentMode === 'external'
        ? data.paymentMode
        : undefined,
    paymentCurrency:
      data.paymentCurrency === 'EUR' || data.paymentCurrency === 'USD' || data.paymentCurrency === 'ARS'
        ? data.paymentCurrency
        : undefined,
    payeeNombre: stringOrEmpty(data.payeeNombre) || undefined,
    payeeApellido: stringOrEmpty(data.payeeApellido) || undefined,
    payeeCbuCvu: stringOrEmpty(data.payeeCbuCvu) || undefined,
    stripeConnectAccountId: stringOrEmpty(data.stripeConnectAccountId) || undefined,
    paymentTermsAcceptedAt: stringOrEmpty(data.paymentTermsAcceptedAt) || undefined,
    scopeType: data.scopeType === 'sanatorio' ? 'sanatorio' : 'global',
    sanatorioId: stringOrEmpty(data.sanatorioId) || null,
    organizerSanatorioId: stringOrEmpty(data.organizerSanatorioId) || null,
    organizerSanatorioName: stringOrEmpty(data.organizerSanatorioName) || null,
  };
}

function itemsPath(scope: FeedPublishScope, kind: FeedKind) {
  return scope.type === 'global'
    ? FIRESTORE_PATHS.globalFeedItems(kind)
    : FIRESTORE_PATHS.sanatorioFeedItems(scope.sanatorioId, kind);
}

function itemPath(scope: FeedPublishScope, kind: FeedKind, itemId: string) {
  return scope.type === 'global'
    ? FIRESTORE_PATHS.globalFeedItem(kind, itemId)
    : FIRESTORE_PATHS.sanatorioFeedItem(scope.sanatorioId, kind, itemId);
}

function pageTitle(kind: FeedKind): string {
  return kind === 'cursos' ? 'Cursos' : 'Congresos';
}

function sortFeedItems(items: FeedItem[]): FeedItem[] {
  return [...items].sort((a, b) => (a.date || '').localeCompare(b.date || ''));
}

export async function loadFirestoreFeedPage(
  scope: FeedPublishScope,
  kind: FeedKind,
): Promise<FeedPage> {
  const db = getFirestoreDb();
  if (!db) {
    return { version: '1.0', title: pageTitle(kind), items: [] };
  }

  const snapshot = await getDocs(feedCollection(db, itemsPath(scope, kind)));
  const items = sortFeedItems(
    snapshot.docs.map((entry) => feedItemFromFirestore(entry.id, entry.data())),
  );

  return {
    version: '1.0',
    updatedAt: new Date().toISOString().slice(0, 10),
    title: pageTitle(kind),
    items,
  };
}

export type FeedItemWriteInput = Omit<FeedItem, 'id'> & {
  id?: string;
  /** Solo al publicar en global desde un sanatorio. */
  organizerSanatorioId?: string | null;
  organizerSanatorioName?: string | null;
};

function toFirestorePayload(input: FeedItemWriteInput, authorUid: string, scope: FeedPublishScope) {
  const organizerSanatorioId =
    scope.type === 'global'
      ? input.organizerSanatorioId?.trim() || null
      : scope.sanatorioId;
  const organizerSanatorioName =
    scope.type === 'global'
      ? input.organizerSanatorioName?.trim() || null
      : input.organizerSanatorioName?.trim() || null;

  return {
    title: input.title.trim(),
    subtitle: input.subtitle?.trim() || null,
    caption: input.caption?.trim() || null,
    date: input.date?.trim() || null,
    location: input.location?.trim() || null,
    imageUrl: input.imageUrl?.trim() || null,
    url: input.url?.trim() || null,
    linkLabel: input.linkLabel?.trim() || null,
    body: input.body?.trim() || null,
    cupos: input.cupos?.trim() || null,
    precio: input.precio?.trim() || null,
    modalidad: input.modalidad?.trim() || null,
    finaliza: input.finaliza?.trim() || null,
    duracion: input.duracion?.trim() || null,
    speakerPage: input.speakerPage?.trim() || null,
    idioma: input.idioma?.trim() || null,
    zonaHoraria: input.zonaHoraria?.trim() || null,
    paymentMode: input.paymentMode === 'in_app' ? 'in_app' : 'external',
    paymentCurrency:
      input.paymentMode === 'in_app'
        ? input.paymentCurrency === 'EUR' || input.paymentCurrency === 'USD'
          ? input.paymentCurrency
          : 'ARS'
        : null,
    payeeNombre: input.payeeNombre?.trim() || null,
    payeeApellido: input.payeeApellido?.trim() || null,
    payeeCbuCvu: input.payeeCbuCvu?.trim() || null,
    stripeConnectAccountId: input.stripeConnectAccountId?.trim() || null,
    paymentTermsAcceptedAt: input.paymentTermsAcceptedAt?.trim() || null,
    authorUid,
    scopeType: scope.type,
    sanatorioId: scope.type === 'sanatorio' ? scope.sanatorioId : null,
    organizerSanatorioId,
    organizerSanatorioName,
    updatedAt: serverTimestamp(),
  };
}

export async function upsertFeedItem(
  scope: FeedPublishScope,
  kind: FeedKind,
  input: FeedItemWriteInput,
  authorUid: string,
): Promise<string> {
  const db = getFirestoreDb();
  if (!db) {
    throw i18nError('subscription.errors.firebaseNotConfigured');
  }

  const itemId = input.id?.trim() || doc(feedCollection(db, itemsPath(scope, kind))).id;
  const refDoc = feedDoc(db, itemPath(scope, kind, itemId));
  const existing = await getDoc(refDoc);
  const resolvedAuthor = existing.exists()
    ? String(existing.data()?.authorUid || authorUid)
    : authorUid;

  await setDoc(
    refDoc,
    {
      ...toFirestorePayload(input, resolvedAuthor, scope),
      ...(existing.exists() ? {} : { createdAt: serverTimestamp() }),
    },
    { merge: true },
  );

  return itemId;
}

export async function deleteFeedItem(
  scope: FeedPublishScope,
  kind: FeedKind,
  itemId: string,
): Promise<void> {
  const db = getFirestoreDb();
  if (!db) {
    throw i18nError('subscription.errors.firebaseNotConfigured');
  }

  await deleteDoc(feedDoc(db, itemPath(scope, kind, itemId)));
}

/** Sube JPG/PNG a Storage y devuelve URL de descarga. */
export async function uploadFeedImage(params: {
  scope: FeedPublishScope;
  kind: FeedKind;
  localUri: string;
  contentType?: string;
}): Promise<string> {
  const storage = getFirebaseStorage();
  if (!storage) {
    throw i18nError('subscription.errors.firebaseNotConfigured');
  }

  const response = await fetch(params.localUri);
  const blob = await response.blob();
  const ext = (params.contentType ?? blob.type ?? 'image/jpeg').includes('png') ? 'png' : 'jpg';
  const folder =
    params.scope.type === 'global'
      ? `feeds/global/${params.kind}`
      : `feeds/sanatorios/${params.scope.sanatorioId}/${params.kind}`;
  const path = `${folder}/${Date.now()}.${ext}`;
  const storageRef = ref(storage, path);
  await uploadBytes(storageRef, blob, {
    contentType: params.contentType ?? (ext === 'png' ? 'image/png' : 'image/jpeg'),
  });
  return getDownloadURL(storageRef);
}
