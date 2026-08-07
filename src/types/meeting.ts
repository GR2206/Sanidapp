export type MeetingRoomStatus = 'open' | 'ended';

export interface MeetingRoom {
  id: string;
  joinCode: string;
  title: string;
  hostUid: string;
  hostName: string;
  status: MeetingRoomStatus;
  livekitRoomName: string;
  maxParticipants: number;
  maxDurationMinutes: number;
  isPremiumHost: boolean;
  participantCount: number;
  createdAt?: string | null;
  endsAtMs: number;
  sanatorioId?: string | null;
}

export interface MeetingJoinResult {
  roomId: string;
  joinCode: string;
  title: string;
  token: string;
  serverUrl: string;
  livekitRoomName: string;
  maxParticipants: number;
  maxDurationMinutes: number;
  endsAtMs: number;
  isHost: boolean;
  needsNativeBuild?: boolean;
}
