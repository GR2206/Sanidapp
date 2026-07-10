export type FeedKind = 'cursos' | 'congresos';

export interface FeedItem {
  id: string;
  title: string;
  subtitle?: string;
  date?: string;
  location?: string;
  url?: string;
  body?: string;
}

export interface FeedPage {
  version: string;
  updatedAt?: string;
  title: string;
  intro?: string;
  items: FeedItem[];
}

export interface GistFeedConfig {
  user: string;
  gistId: string;
  filename: string;
}

export interface GistConfig {
  cursos: GistFeedConfig;
  congresos: GistFeedConfig;
}
