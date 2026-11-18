import { cacheLife, cacheTag } from 'next/cache';
import { draftMode } from 'next/headers';
import type { QueryParams } from 'next-sanity';
import type { DefinedFetchType, LivePerspective } from 'next-sanity/live';
import { sanityFetch as nextSanityFetch } from './live';

const cachedNextSanityFetch: DefinedFetchType = async (options) => {
  cacheLife('max');
  if (!options.requestTag) {
    console.log(options.query);
  }
  return nextSanityFetch(options);
};

// For usage within generateMetadata and generateViewport
export async function sanityFetchMetadata<const QueryString extends string>({
  query,
  params = {},
  perspective = 'published',
  tags = [],
  requestTag,
}: {
  query: QueryString;
  params?: QueryParams;
  perspective?: LivePerspective;
  tags?: string[];
  requestTag?: string;
}) {
  'use cache: remote';
  cacheLife('max');
  cacheTag(...tags);
  const { data } = await nextSanityFetch({
    query,
    params,
    perspective,
    stega: false,
    tags,
    requestTag,
  });
  return { data };
}

export const routeSanityFetch: DefinedFetchType = async (options) => {
  // Drafts must stay uncached and keep stega/visual editing support.

  const { isEnabled: isDraft } = await draftMode();
  if (isDraft) {
    if (!options.requestTag) {
      console.log(options.query);
    }
    return nextSanityFetch({ ...options });
  }

  return cachedNextSanityFetch(options);
};
