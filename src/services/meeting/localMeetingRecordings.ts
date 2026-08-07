import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system/legacy';

const INDEX_KEY = '@sanidapp/meetingRecordings/v1';
const DIR = `${FileSystem.documentDirectory}meeting-recordings/`;

export type LocalMeetingRecording = {
  id: string;
  title: string;
  roomId: string;
  joinCode: string;
  fileUri: string;
  createdAtMs: number;
  durationMs: number;
};

async function ensureDir() {
  const info = await FileSystem.getInfoAsync(DIR);
  if (!info.exists) {
    await FileSystem.makeDirectoryAsync(DIR, { intermediates: true });
  }
}

export async function listLocalMeetingRecordings(): Promise<LocalMeetingRecording[]> {
  const raw = await AsyncStorage.getItem(INDEX_KEY);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw) as LocalMeetingRecording[];
    return Array.isArray(parsed) ? parsed.sort((a, b) => b.createdAtMs - a.createdAtMs) : [];
  } catch {
    return [];
  }
}

async function saveIndex(items: LocalMeetingRecording[]) {
  await AsyncStorage.setItem(INDEX_KEY, JSON.stringify(items));
}

export async function saveMeetingRecordingFromUrl(params: {
  downloadUrl: string;
  title: string;
  roomId: string;
  joinCode?: string;
  durationMs?: number;
  filenameHint?: string;
}): Promise<LocalMeetingRecording> {
  await ensureDir();
  const id = `${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
  const safeName = String(params.filenameHint || `${id}.mp4`)
    .replace(/[^a-zA-Z0-9._-]/g, '_')
    .slice(0, 80);
  const fileUri = `${DIR}${safeName.endsWith('.mp4') ? safeName : `${safeName}.mp4`}`;

  const result = await FileSystem.downloadAsync(params.downloadUrl, fileUri);
  if (result.status !== 200) {
    throw new Error(`Download failed (${result.status})`);
  }

  const entry: LocalMeetingRecording = {
    id,
    title: params.title.trim() || 'Sala Sanidapp',
    roomId: params.roomId,
    joinCode: params.joinCode?.trim() || '',
    fileUri: result.uri,
    createdAtMs: Date.now(),
    durationMs: Math.max(0, Number(params.durationMs) || 0),
  };

  const items = await listLocalMeetingRecordings();
  items.unshift(entry);
  await saveIndex(items);
  return entry;
}

export async function deleteLocalMeetingRecording(id: string): Promise<void> {
  const items = await listLocalMeetingRecordings();
  const target = items.find((item) => item.id === id);
  const next = items.filter((item) => item.id !== id);
  await saveIndex(next);
  if (target?.fileUri) {
    try {
      const info = await FileSystem.getInfoAsync(target.fileUri);
      if (info.exists) await FileSystem.deleteAsync(target.fileUri, { idempotent: true });
    } catch {
      // ignore missing file
    }
  }
}
