import type { ForoPost } from '@/types/foro';

export function canViewForoPost(
  post: ForoPost,
  viewerUid: string | null,
  options?: { isAdmin?: boolean },
): boolean {
  if (options?.isAdmin) {
    return true;
  }

  if (!post.targetUid) {
    return true;
  }

  if (!viewerUid) {
    return false;
  }

  return post.targetUid === viewerUid || post.authorUid === viewerUid;
}

export function filterForoPostsForViewer(
  posts: ForoPost[],
  viewerUid: string | null,
  options?: { isAdmin?: boolean },
): ForoPost[] {
  return posts.filter((post) => canViewForoPost(post, viewerUid, options));
}
