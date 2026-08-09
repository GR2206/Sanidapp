/** Compara semver simple `a.b.c` → negativo si a<b, 0 si iguales, positivo si a>b. */
export function compareVersions(a: string, b: string): number {
  const parse = (value: string) =>
    value
      .trim()
      .replace(/^[^\d]*/, '')
      .split(/[.+-]/)
      .map((part) => Number.parseInt(part, 10))
      .map((n) => (Number.isFinite(n) ? n : 0));

  const left = parse(a);
  const right = parse(b);
  const len = Math.max(left.length, right.length, 1);

  for (let i = 0; i < len; i += 1) {
    const diff = (left[i] ?? 0) - (right[i] ?? 0);
    if (diff !== 0) return diff;
  }
  return 0;
}

export function isVersionOlder(current: string, latest: string): boolean {
  return compareVersions(current, latest) < 0;
}
