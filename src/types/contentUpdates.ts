import type { CategoryId } from '@/types/protocol';

export type ContentSection = CategoryId | 'farmacologia';

export type ContentUpdateBadgeMap = Record<ContentSection, number>;
