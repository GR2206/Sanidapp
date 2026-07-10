import { router } from 'expo-router';

import { ROUTES } from '@/constants/routes';
import type { ContentItemType } from '@/types/userActivity';

export function navigateToContentItem(type: ContentItemType, id: string): void {
  switch (type) {
    case 'protocol':
      router.push(ROUTES.protocol(id));
      break;
    case 'drug':
      router.push(ROUTES.drug(id));
      break;
    case 'pathology':
      router.push(ROUTES.pathology(id));
      break;
  }
}
