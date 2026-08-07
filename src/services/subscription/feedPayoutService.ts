import { getFirebaseFunctions } from '@/services/firebase/firebaseApp';
import { i18nError } from '@/i18n/resolveMessage';

export type FeedPayoutItem = {
  id: string;
  uid: string | null;
  kind: string | null;
  itemId: string | null;
  itemTitle: string | null;
  amountGross: number;
  commissionPercent: number;
  commissionAmount: number;
  payeeAmount: number;
  currency: string;
  payeeNombre: string | null;
  payeeApellido: string | null;
  payeeCbuCvu: string | null;
  payoutStatus: string;
  payoutMethod: string | null;
  payoutTransferRef: string | null;
  paymentId: string | null;
  payeeConcept: string;
  commissionConcept: string;
};

export async function listFeedPayouts(
  payoutStatus: 'pending' | 'paid' | 'all' = 'pending',
): Promise<FeedPayoutItem[]> {
  const functions = getFirebaseFunctions();
  if (!functions) {
    throw i18nError('subscription.errors.firebaseNotConfigured');
  }
  const { httpsCallable } = await import('firebase/functions');
  const call = httpsCallable(functions, 'listFeedPayouts');
  const result = await call({ payoutStatus });
  const data = result.data as { items?: FeedPayoutItem[] };
  return data.items ?? [];
}

export async function settleFeedPayout(params: {
  inscriptionId: string;
  method: 'manual' | 'mercadopago';
  transferRef?: string;
}): Promise<FeedPayoutItem> {
  const functions = getFirebaseFunctions();
  if (!functions) {
    throw i18nError('subscription.errors.firebaseNotConfigured');
  }
  const { httpsCallable } = await import('firebase/functions');
  const call = httpsCallable(functions, 'settleFeedPayout');
  try {
    const result = await call(params);
    const data = result.data as { item: FeedPayoutItem };
    return data.item;
  } catch (cause) {
    const error = cause as { message?: string };
    throw new Error(error.message ?? 'i18n:feedPayout.errors.settleFailed');
  }
}
