import type { AppLocale } from '@/i18n/types';

export type NursingReminderKind = 'orders' | 'balances';

export type NursingReminderSlot = {
  id: string;
  kind: NursingReminderKind;
  hour: number;
  minute: number;
};

/**
 * Recordatorios de labor enfermero (hora local del dispositivo).
 * Se programan como notificaciones locales diarias (funcionan con pantalla bloqueada).
 */
export const NURSING_REMINDER_SLOTS: NursingReminderSlot[] = [
  // Indicaciones médicas
  { id: 'orders-0010', kind: 'orders', hour: 0, minute: 10 },
  { id: 'orders-0610', kind: 'orders', hour: 6, minute: 10 },
  { id: 'orders-1210', kind: 'orders', hour: 12, minute: 10 },
  { id: 'orders-1810', kind: 'orders', hour: 18, minute: 10 },
  // Cierre de balances
  { id: 'balances-0005', kind: 'balances', hour: 0, minute: 5 },
  { id: 'balances-1100', kind: 'balances', hour: 11, minute: 0 },
  { id: 'balances-1700', kind: 'balances', hour: 17, minute: 0 },
  { id: 'balances-2300', kind: 'balances', hour: 23, minute: 0 },
];

export const NURSING_REMINDER_CHANNEL_ID = 'nursing-reminders';
export const NURSING_REMINDER_ID_PREFIX = 'nursing-reminder-';
export const NURSING_REMINDERS_PREF_KEY = '@sanidapp/nursing-reminders-enabled';

/** Tips cotidianos del carrusel (keys i18n bajo nursing.tips.*). */
export const NURSING_CAROUSEL_TIP_IDS = [
  'handHygiene',
  'doubleCheck',
  'ivSite',
  'allergies',
  'vitalSigns',
  'handoff',
  'painScale',
  'fallRisk',
] as const;

export type NursingCarouselTipId = (typeof NURSING_CAROUSEL_TIP_IDS)[number];

export function nursingReminderNotificationId(slotId: string): string {
  return `${NURSING_REMINDER_ID_PREFIX}${slotId}`;
}

export function nursingReminderBodyKey(kind: NursingReminderKind): string {
  return kind === 'orders' ? 'nursing.reminders.ordersBody' : 'nursing.reminders.balancesBody';
}

export function nursingReminderTitleKey(kind: NursingReminderKind): string {
  return kind === 'orders' ? 'nursing.reminders.ordersTitle' : 'nursing.reminders.balancesTitle';
}

export function nursingCarouselTipKey(id: NursingCarouselTipId): string {
  return `nursing.tips.${id}`;
}

export type { AppLocale };
