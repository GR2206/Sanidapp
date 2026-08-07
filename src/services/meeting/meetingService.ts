import Constants from 'expo-constants';

import { getFirebaseFunctions } from '@/services/firebase/firebaseApp';
import { i18nError } from '@/i18n/resolveMessage';
import type { MeetingJoinResult } from '@/types/meeting';

export function isMeetingNativeAvailable(): boolean {
  // Expo Go no incluye WebRTC nativo de LiveKit.
  return Constants.appOwnership !== 'expo';
}

async function callMeetingFunction<T>(name: string, data: Record<string, unknown>): Promise<T> {
  const functions = getFirebaseFunctions();
  if (!functions) {
    throw i18nError('subscription.errors.firebaseNotConfigured');
  }
  const { httpsCallable } = await import('firebase/functions');
  const fn = httpsCallable(functions, name);
  try {
    const result = await fn(data);
    return result.data as T;
  } catch (cause) {
    const error = cause as {
      message?: string;
      code?: string | number;
      details?: unknown;
      customData?: { message?: string };
    };
    const details =
      typeof error.details === 'string'
        ? error.details
        : typeof error.customData?.message === 'string'
          ? error.customData.message
          : undefined;
    const raw = String(details || error.message || '').trim();
    // Firebase a veces solo manda el código ("INTERNAL") sin texto útil.
    if (!raw || /^(internal|unknown|unavailable|deadline-exceeded)$/i.test(raw)) {
      throw new Error('i18n:meeting.errors.generic');
    }
    throw new Error(raw);
  }
}

export async function createMeetingRoom(title?: string): Promise<MeetingJoinResult> {
  return callMeetingFunction<MeetingJoinResult>('createMeetingRoom', {
    title: title?.trim() || undefined,
  });
}

export async function joinMeetingRoom(joinCode: string): Promise<MeetingJoinResult> {
  return callMeetingFunction<MeetingJoinResult>('joinMeetingRoom', {
    joinCode: joinCode.trim().toUpperCase(),
  });
}

export async function leaveMeetingRoom(roomId: string): Promise<void> {
  await callMeetingFunction('leaveMeetingRoom', { roomId });
}

export async function endMeetingRoom(roomId: string): Promise<void> {
  await callMeetingFunction('endMeetingRoom', { roomId });
}

export type MeetingRecordingStopResult = {
  downloadUrl: string;
  filename: string;
  durationMs: number;
  title: string;
  roomId: string;
  joinCode: string;
};

export async function startMeetingRecording(roomId: string): Promise<{ egressId: string; alreadyRecording: boolean }> {
  return callMeetingFunction('startMeetingRecording', { roomId });
}

export async function stopMeetingRecording(roomId: string): Promise<MeetingRecordingStopResult> {
  return callMeetingFunction<MeetingRecordingStopResult>('stopMeetingRecording', { roomId });
}
