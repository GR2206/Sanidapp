import { DRUG_CALCULATION_PARAMS } from '@/constants/calculations/drugCalculationParams';
import type { AppLocale } from '@/i18n/types';
import { loadAllDrugMeta } from '@/services/content/drugService';

export type CalculationDrugOption = {
  id: string;
  label: string;
  hasDoseFormula: boolean;
};

/**
 * Lista de fármacos de Cálculos = catálogo completo de farmacología.
 * Si no hay fórmula mg/kg en DRUG_CALCULATION_PARAMS, la UI usa el fallback de monografía.
 */
export async function loadCalculationDrugOptions(
  locale: AppLocale,
): Promise<CalculationDrugOption[]> {
  const meta = await loadAllDrugMeta('atencion-sanitaria', locale);
  const collator = locale === 'pt-BR' ? 'pt' : locale === 'en' ? 'en' : 'es';

  return meta
    .map((drugMeta) => ({
      id: drugMeta.id,
      label: drugMeta.name,
      hasDoseFormula: Boolean(DRUG_CALCULATION_PARAMS[drugMeta.id]?.schemes?.length),
    }))
    .sort((a, b) => a.label.localeCompare(b.label, collator));
}
