import * as Calendar from 'expo-calendar';
import { Platform } from 'react-native';

import { i18nError } from '@/i18n/resolveMessage';
import type { ForoPost } from '@/types/foro';
import { parseForoEventDate } from '@/utils/foroCalendar';

const DEFAULT_DURATION_MINUTES = 60;

async function ensureCalendarPermission(): Promise<void> {
  const { status } = await Calendar.requestCalendarPermissionsAsync();
  if (status !== 'granted') {
    throw i18nError('foro.calendarPermissionDenied');
  }
}

async function getWritableCalendarId(): Promise<string> {
  const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
  const writable = calendars.filter((item) => item.allowsModifications);

  const preferred =
    writable.find((item) => item.isPrimary) ??
    writable.find((item) => item.source?.isLocalAccount) ??
    writable[0];

  if (preferred?.id) {
    return preferred.id;
  }

  const defaultCalendar = await Calendar.getDefaultCalendarAsync();
  if (defaultCalendar?.id) {
    return defaultCalendar.id;
  }

  throw i18nError(
    Platform.OS === 'android' ? 'foro.calendarNotFoundAndroid' : 'foro.calendarNotFound',
  );
}

export async function addForoPostToDeviceCalendar(
  post: ForoPost,
  sanatorioName?: string | null,
): Promise<void> {
  if (Platform.OS === 'web') {
    throw i18nError('foro.calendarWebUnavailable');
  }

  const start = parseForoEventDate(post.eventDate);
  if (!start) {
    throw i18nError('foro.calendarInvalidDate');
  }

  await ensureCalendarPermission();
  const calendarId = await getWritableCalendarId();
  const end = new Date(start.getTime() + DEFAULT_DURATION_MINUTES * 60_000);

  await Calendar.createEventAsync(calendarId, {
    title: post.title,
    startDate: start,
    endDate: end,
    notes: post.body,
    location: sanatorioName?.trim() || undefined,
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  });
}
