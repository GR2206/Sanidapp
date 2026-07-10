import type { Href } from 'expo-router';

import { ROUTES } from '@/constants/routes';
import type { ContentSection } from '@/types/contentUpdates';

export interface DashboardNavItem {
  id: ContentSection;
  label: string;
  labelFull?: string;
  icon: 'human-male-height' | 'baby-face-outline' | 'baby-carriage' | 'pill';
  route: Href | `/category/${string}`;
}

export const DASHBOARD_NAV_ITEMS: DashboardNavItem[] = [
  {
    id: 'adulto',
    label: 'Adulto',
    icon: 'human-male-height',
    route: ROUTES.category('adulto'),
  },
  {
    id: 'pediatrico',
    label: 'Pediátrico',
    icon: 'baby-face-outline',
    route: ROUTES.category('pediatrico'),
  },
  {
    id: 'neonatologia',
    label: 'Neo',
    labelFull: 'Neonatología',
    icon: 'baby-carriage',
    route: ROUTES.category('neonatologia'),
  },
  {
    id: 'farmacologia',
    label: 'Farma',
    labelFull: 'Farmacología',
    icon: 'pill',
    route: ROUTES.farmacologia as Href,
  },
];
