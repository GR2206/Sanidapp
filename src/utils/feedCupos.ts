/** Interpreta cupos libres: "30" → 30; "20/30" → remaining 20, total 30. */
export type ParsedFeedCupos = {
  remaining: number;
  total: number | null;
};

export function parseFeedCupos(cupos: string | undefined | null): ParsedFeedCupos | null {
  const raw = String(cupos ?? '').trim();
  if (!raw) return null;

  const slash = raw.match(/^(\d+)\s*\/\s*(\d+)\s*$/);
  if (slash) {
    const remaining = Number(slash[1]);
    const total = Number(slash[2]);
    if (!Number.isFinite(remaining) || !Number.isFinite(total) || remaining < 0 || total < 0) {
      return null;
    }
    return { remaining, total };
  }

  const digits = raw.replace(/[^\d]/g, '');
  if (!digits) return null;
  const remaining = Number(digits);
  if (!Number.isFinite(remaining) || remaining < 0) return null;
  return { remaining, total: remaining };
}

export function formatFeedCupos(remaining: number, total: number | null): string {
  const safeRemaining = Math.max(0, Math.floor(remaining));
  if (total != null && Number.isFinite(total) && total > 0) {
    return `${safeRemaining}/${Math.floor(total)}`;
  }
  return String(safeRemaining);
}

export const LOW_CUPOS_THRESHOLD = 5;

export function isLowCupos(remaining: number | null | undefined): boolean {
  return remaining != null && remaining > 0 && remaining <= LOW_CUPOS_THRESHOLD;
}
