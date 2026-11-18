// Studio's SlugInput is read-only; slugs are only produced by "Generate", which runs
// @sindresorhus/slugify. Its output is strictly lowercase ASCII letters, digits and
// hyphens (underscores, dots and non-ASCII are stripped), with segments joined by "/".
const SLUG_SEGMENT_PATTERN = /^[a-z0-9-]+$/;

// Studio presentation links drafts without a route as /preview/<documentId>.
// Sanity document IDs allow letters, digits, "_", "-" and "." (e.g. drafts.<id>).
const PREVIEW_SEGMENT = 'preview';
const SANITY_DOCUMENT_ID_PATTERN = /^[a-zA-Z0-9._-]+$/;

const toSegments = (slug: string | string[]): string[] =>
  (Array.isArray(slug) ? slug : slug.split('/')).filter(Boolean);

export const isValidSlug = (
  slug: string | string[] | undefined,
): slug is string | string[] => {
  if (!slug) return false;
  const segments = toSegments(slug);
  if (segments.length === 0) return false;

  if (segments[0] === PREVIEW_SEGMENT) {
    return (
      segments.length === 2 && SANITY_DOCUMENT_ID_PATTERN.test(segments[1])
    );
  }

  return segments.every((segment) => SLUG_SEGMENT_PATTERN.test(segment));
};
