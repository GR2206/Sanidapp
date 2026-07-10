import type { AppLocale } from '@/i18n/types';
import type { DrugMeta } from '@/types/drug';
import { collatorLocale } from '@/utils/collatorLocale';

export type DrugLetterSection = {
  title: string;
  data: DrugMeta[];
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

/** Agrupa fármacos por letra inicial (A, B, C…) en orden alfabético. */
export function groupDrugsByLetter(
  drugs: DrugMeta[],
  locale: AppLocale = 'es',
): DrugLetterSection[] {
  const collator = collatorLocale(locale);
  const sorted = [...drugs].sort((a, b) =>
    a.name.localeCompare(b.name, collator, { sensitivity: 'base' }),
  );
  const groups = new Map<string, DrugMeta[]>();

  for (const drug of sorted) {
    const letter = sectionLetter(drug.name);
    const bucket = groups.get(letter);
    if (bucket) {
      bucket.push(drug);
    } else {
      groups.set(letter, [drug]);
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
