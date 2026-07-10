import type { ForoPost } from '@/types/foro';

const MONTHS_ES: Record<string, number> = {
  enero: 0,
  febrero: 1,
  marzo: 2,
  abril: 3,
  mayo: 4,
  junio: 5,
  julio: 6,
  agosto: 7,
  septiembre: 8,
  setiembre: 8,
  octubre: 9,
  noviembre: 10,
  diciembre: 11,
};

function buildLocalDate(
  year: number,
  month: number,
  day: number,
  hours = 9,
  minutes = 0,
): Date | null {
  const date = new Date(year, month, day, hours, minutes, 0, 0);
  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month ||
    date.getDate() !== day
  ) {
    return null;
  }
  return date;
}

function parseSpanishMonthDate(value: string): Date | null {
  const match = value.match(
    /(\d{1,2})\s+de\s+(enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|setiembre|octubre|noviembre|diciembre)(?:\s+de\s+|\s+)(\d{4})/i,
  );
  if (!match) {
    return null;
  }

  const day = Number(match[1]);
  const month = MONTHS_ES[match[2].toLowerCase()];
  const year = Number(match[3]);
  return buildLocalDate(year, month, day);
}

function parseSlashDate(value: string): Date | null {
  const match = value.match(
    /(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{2,4})(?:[^\d]*(\d{1,2}):(\d{2}))?/,
  );
  if (!match) {
    return null;
  }

  const day = Number(match[1]);
  const month = Number(match[2]) - 1;
  let year = Number(match[3]);
  if (year < 100) {
    year += 2000;
  }

  const hours = match[4] !== undefined ? Number(match[4]) : 9;
  const minutes = match[5] !== undefined ? Number(match[5]) : 0;
  return buildLocalDate(year, month, day, hours, minutes);
}

export function parseForoEventDate(value: string | null | undefined): Date | null {
  if (!value?.trim()) {
    return null;
  }

  const trimmed = value.trim();

  const iso = new Date(trimmed);
  if (!Number.isNaN(iso.getTime()) && /^\d{4}-\d{2}-\d{2}/.test(trimmed)) {
    return iso;
  }

  const slash = parseSlashDate(trimmed);
  if (slash) {
    return slash;
  }

  const spanish = parseSpanishMonthDate(trimmed);
  if (spanish) {
    return spanish;
  }

  const fallback = new Date(trimmed);
  if (!Number.isNaN(fallback.getTime())) {
    return fallback;
  }

  return null;
}

export function serializeForoEventDate(value: Date | null): string | null {
  return value ? value.toISOString() : null;
}

export function formatForoEventDateLabel(value: string | null | undefined): string {
  const parsed = parseForoEventDate(value);
  if (!parsed) {
    return value?.trim() ?? '';
  }

  const hasExplicitTime = Boolean(value?.includes('T')) || Boolean(value?.match(/\d{1,2}:\d{2}/));

  return parsed.toLocaleString('es-AR', {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    ...(hasExplicitTime ? { hour: '2-digit', minute: '2-digit' } : {}),
  });
}

export function canAddForoPostToCalendar(post: Pick<ForoPost, 'type' | 'eventDate'>): boolean {
  return post.type !== 'notificacion' && Boolean(parseForoEventDate(post.eventDate));
}
