import type { CategoryId } from '@/types/protocol';

export type ContentItemType = 'protocol' | 'drug' | 'pathology';

export interface RecentContentItem {
  id: string;
  type: ContentItemType;
  title: string;
  subtitle?: string;
  viewedAt: string;
}

export interface FavoriteContentItem {
  id: string;
  type: ContentItemType;
  title: string;
  subtitle?: string;
  savedAt: string;
}

export interface UniversalSearchResult {
  id: string;
  type: ContentItemType;
  title: string;
  subtitle: string;
  protocolCategory?: CategoryId;
}
