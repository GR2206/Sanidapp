import { getFirebaseFunctions } from '@/services/firebase/firebaseApp';
import { i18nError } from '@/i18n/resolveMessage';
import type { FeedKind } from '@/types/feed';

export type FeedInscriptionRosterItem = {
  id: string;
  uid: string | null;
  kind: FeedKind | string | null;
  itemId: string | null;
  itemTitle: string | null;
  amountGross: number;
  currency: string;
  payerNombre: string | null;
  payerApellido: string | null;
  payerEmail: string | null;
  payeeNombre: string | null;
  payeeApellido: string | null;
  paymentId: string | null;
  payoutStatus: string | null;
  createdAt: string | null;
};

export async function listFeedInscriptions(params?: {
  kind?: FeedKind;
  itemId?: string;
}): Promise<FeedInscriptionRosterItem[]> {
  const functions = getFirebaseFunctions();
  if (!functions) {
    throw i18nError('subscription.errors.firebaseNotConfigured');
  }
  const { httpsCallable } = await import('firebase/functions');
  const call = httpsCallable(functions, 'listFeedInscriptions');
  const result = await call({
    kind: params?.kind,
    itemId: params?.itemId,
  });
  const data = result.data as { items?: FeedInscriptionRosterItem[] };
  return data.items ?? [];
}

export function groupInscriptionsByCourse(
  items: FeedInscriptionRosterItem[],
): { key: string; title: string; kind: string; itemId: string; attendees: FeedInscriptionRosterItem[] }[] {
  const map = new Map<
    string,
    { key: string; title: string; kind: string; itemId: string; attendees: FeedInscriptionRosterItem[] }
  >();

  for (const item of items) {
    const kind = String(item.kind || 'cursos');
    const itemId = String(item.itemId || item.id);
    const key = `${kind}:${itemId}`;
    const existing = map.get(key);
    if (existing) {
      existing.attendees.push(item);
    } else {
      map.set(key, {
        key,
        title: item.itemTitle || itemId,
        kind,
        itemId,
        attendees: [item],
      });
    }
  }

  return Array.from(map.values()).sort((a, b) => a.title.localeCompare(b.title));
}

export function formatInscriptionShareText(params: {
  courseTitle: string;
  attendees: FeedInscriptionRosterItem[];
  headerLabel: string;
  emptyLabel: string;
}): string {
  const lines = [
    params.headerLabel,
    params.courseTitle,
    '',
  ];
  if (params.attendees.length === 0) {
    lines.push(params.emptyLabel);
    return lines.join('\n');
  }
  params.attendees.forEach((person, index) => {
    const name = `${person.payerNombre ?? ''} ${person.payerApellido ?? ''}`.trim() || '—';
    const email = person.payerEmail?.trim() || '—';
    const amount = `${person.amountGross} ${person.currency}`;
    lines.push(`${index + 1}. ${name}`);
    lines.push(`   ${email}`);
    lines.push(`   ${amount}`);
    lines.push('');
  });
  return lines.join('\n').trim();
}
