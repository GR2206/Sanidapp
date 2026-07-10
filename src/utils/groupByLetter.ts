import type { AppLocale } from '@/i18n/types';
import { collatorLocale } from '@/utils/collatorLocale';

interface NamedItem {
  id: string;
  name: string;
}

export type LetterSection<T extends NamedItem> = {
  title: string;
  data: T[];
};

function sectionLetter(name: string): string {
  const first = name.trim().charAt(0).toUpperCase();
  if (!first) return '#';

  const normalized = first.normalize('NFD').replace(/\p{M}/gu, '');
  if (/[A-Z]/.test(normalized)) {
    return normalized;
  }

  return '#';
}

/** Agrupa ítems por letra inicial (A, B, C…) en orden alfabético. */
export function groupByLetter<T extends NamedItem>(
  items: T[],
  locale: AppLocale = 'es',
): LetterSection<T>[] {
  const collator = collatorLocale(locale);
  const sorted = [...items].sort((a, b) =>
    a.name.localeCompare(b.name, collator, { sensitivity: 'base' }),
  );
  const groups = new Map<string, T[]>();

  for (const item of sorted) {
    const letter = sectionLetter(item.name);
    const bucket = groups.get(letter);
    if (bucket) {
      bucket.push(item);
    } else {
      groups.set(letter, [item]);
    }
  }

  return Array.from(groups.entries())
    .sort(([a], [b]) => {
      if (a === '#') return 1;
      if (b === '#') return -1;
      return a.localeCompare(b, collator);
    })
    .map(([title, data]) => ({ title, data }));
}
