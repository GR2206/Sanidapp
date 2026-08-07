/** Cupos: "30" o "20/30". */
function parseFeedCupos(cupos) {
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

function formatFeedCupos(remaining, total) {
  const safeRemaining = Math.max(0, Math.floor(remaining));
  if (total != null && Number.isFinite(total) && total > 0) {
    return `${safeRemaining}/${Math.floor(total)}`;
  }
  return String(safeRemaining);
}

module.exports = {
  parseFeedCupos,
  formatFeedCupos,
};
