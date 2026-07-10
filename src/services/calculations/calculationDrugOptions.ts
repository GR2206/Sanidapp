import { CALCULATION_DRUG_CATALOG } from '@/constants/calculations/drugCalculationCatalog';
import { DRUG_CALCULATION_PARAMS } from '@/constants/calculations/drugCalculationParams';
import type { AppLocale } from '@/i18n/types';
import { loadAllDrugMeta } from '@/services/content/drugService';

export type CalculationDrugOption = {
  id: string;
  label: string;
  hasDoseFormula: boolean;
};

export async function loadCalculationDrugOptions(
  locale: AppLocale,
): Promise<CalculationDrugOption[]> {
  const meta = await loadAllDrugMeta('atencion-sanitaria', locale);
  const metaById = new Map(meta.map((item) => [item.id, item]));
  const catalogIds = new Set(CALCULATION_DRUG_CATALOG.map((entry) => entry.id));

  const options: CalculationDrugOption[] = [];

  for (const id of catalogIds) {
    const drugMeta = metaById.get(id);
    if (!drugMeta) continue;

    options.push({
      id,
      label: drugMeta.name,
      hasDoseFormula: Boolean(DRUG_CALCULATION_PARAMS[id]?.schemes?.length),
    });
  }

  const collator = locale === 'pt-BR' ? 'pt' : locale === 'en' ? 'en' : 'es';
  return options.sort((a, b) => a.label.localeCompare(b.label, collator));
}
