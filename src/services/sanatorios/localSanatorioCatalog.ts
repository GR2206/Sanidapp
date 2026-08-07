import rosarioCatalog from '../../../content/sanatorios/rosario.json';

import type { Sanatorio, SanatorioCatalog, SanatorioRegionGroup } from '@/types/sanatorio';

/** Catálogos locales por región. Agregar JSON nuevos acá al expandir. */
const CATALOGS: SanatorioCatalog[] = [rosarioCatalog as SanatorioCatalog];

function withRegion(catalog: SanatorioCatalog): Sanatorio[] {
  const regionId = catalog.region;
  const regionLabel = catalog.regionLabel?.trim() || regionId;
  return catalog.sanatorios.map((item) => ({
    ...item,
    regionId,
    regionLabel,
  }));
}

/** Lista plana de sanatorios locales (con regionId / regionLabel). */
export function loadLocalSanatorios(): Sanatorio[] {
  return CATALOGS.flatMap(withRegion);
}

export type SanatorioRegionOption = {
  regionId: string;
  regionLabel: string;
  count: number;
};

/** Regiones disponibles en el catálogo local (orden de carga). */
export function listLocalRegions(): SanatorioRegionOption[] {
  return CATALOGS.map((catalog) => ({
    regionId: catalog.region,
    regionLabel: catalog.regionLabel?.trim() || catalog.region,
    count: catalog.sanatorios.length,
  }));
}

export function filterSanatoriosByRegion(
  sanatorios: Sanatorio[],
  regionId: string | null,
): Sanatorio[] {
  if (!regionId) return [];
  return sanatorios.filter((item) => item.regionId === regionId);
}

/** Agrupa sanatorios por región preservando el orden de catálogos. */
export function groupSanatoriosByRegion(sanatorios: Sanatorio[]): SanatorioRegionGroup[] {
  const groups: SanatorioRegionGroup[] = [];
  const indexByRegion = new Map<string, number>();

  for (const item of sanatorios) {
    const regionId = item.regionId?.trim() || 'other';
    const regionLabel = item.regionLabel?.trim() || item.city || regionId;
    const existing = indexByRegion.get(regionId);
    if (existing == null) {
      indexByRegion.set(regionId, groups.length);
      groups.push({ regionId, regionLabel, sanatorios: [item] });
    } else {
      groups[existing].sanatorios.push(item);
    }
  }

  return groups;
}
