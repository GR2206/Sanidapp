import {
  collection,
  onSnapshot,
  type DocumentData,
} from 'firebase/firestore';

import { FIRESTORE_PATHS } from '@/constants/firebase';
import { getFirestoreDb } from '@/services/firebase/firebaseApp';
import type { SanatorioStaffMember } from '@/types/foro';

function memberFromSnapshot(uid: string, data: DocumentData): SanatorioStaffMember {
  return {
    uid,
    nombre: String(data.nombre ?? ''),
    apellido: String(data.apellido ?? ''),
    profesion: String(data.profesion ?? ''),
    role: String(data.role ?? 'user'),
  };
}

export function formatStaffMemberName(
  member: Pick<SanatorioStaffMember, 'nombre' | 'apellido'>,
): string {
  return `${member.nombre} ${member.apellido}`.trim();
}

export function subscribeSanatorioStaff(
  sanatorioId: string,
  listener: (staff: SanatorioStaffMember[]) => void,
  onError?: (error: Error) => void,
): () => void {
  const db = getFirestoreDb();
  if (!db) {
    listener([]);
    return () => undefined;
  }

  return onSnapshot(
    collection(db, ...FIRESTORE_PATHS.sanatorioUsuarios(sanatorioId)),
    (snapshot) => {
      const staff = snapshot.docs
        .map((item) => memberFromSnapshot(item.id, item.data()))
        .filter((member) => member.role === 'user')
        .sort((left, right) =>
          formatStaffMemberName(left).localeCompare(formatStaffMemberName(right), 'es'),
        );
      listener(staff);
    },
    (error) => {
      onError?.(error);
      listener([]);
    },
  );
}
