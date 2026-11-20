'use client';
import type { SanityImageObject } from '@sanity/image-url';
import { useTranslations } from 'next-intl';
import { forwardRef } from 'react';
import { useHits, useInstantSearch } from 'react-instantsearch';
import { twMerge } from 'tailwind-merge';
import NewsHeadliner from './NewsHeadliner';
import NewsItem from './NewsItem';
import NewsSectionsSkeleton from './NewsSectionsSkeleton';

type NewsSectionsProps = {
  fallbackImages?: SanityImageObject[];
} & React.ComponentProps<'div'>;

const getFallbackImage = (
  objectId: string,
  fallbackImages?: SanityImageObject[],
) => {
  if (!fallbackImages?.length) {
    return undefined;
  }

  const hash = [...objectId].reduce(
    (value, character) => (value * 31 + character.charCodeAt(0)) >>> 0,
    0,
  );

  return fallbackImages[hash % fallbackImages.length];
};

const NewsSections = forwardRef<HTMLDivElement, NewsSectionsProps>(
  function NewsSections({ fallbackImages, className = '' }, ref) {
    const { items } = useHits();
    const { indexUiState, results, status } = useInstantSearch();
    const t = useTranslations();

    const query = indexUiState.query?.trim();
    const fallbackResultSummary = `${results.nbHits} hits for "${query ?? ''}" with selected filters.`;
    const resultSummary = t.has('newsroom_search_results_summary')
      ? t('newsroom_search_results_summary', {
          numberOfHits: results.nbHits,
          searchQuery: query ?? '',
        })
      : fallbackResultSummary;

    if (!items || items.length === 0) {
      return t('newsroom_no_hits');
    }

    return status !== 'loading' && status !== 'stalled' ? (
      <div ref={ref} className={twMerge(`flex flex-col gap-4`, className)}>
        {query && (
          <p aria-live="polite" className="text-slate-80 text-sm">
            {resultSummary}
          </p>
        )}
        {items.map((hit, index) => {
          const fallbackImage = hit?.heroImage?.image?.asset
            ? undefined
            : getFallbackImage(hit.objectID, fallbackImages);

          return index === 0 ? (
            <NewsHeadliner
              key={hit.objectID}
              //@ts-ignore: TODO Hit<BaseHit> into a NewsRoomNewsItem
              data={{
                ...hit,
                title: hit.pageTitle,
              }}
              {...(fallbackImage && { fallbackImage })}
            />
          ) : (
            <NewsItem
              key={hit.objectID}
              //@ts-ignore: TODO Hit<BaseHit> into a NewsRoomNewsItem
              data={{
                ...hit,
                title: hit.pageTitle,
              }}
              {...(fallbackImage && { fallbackImage })}
            />
          );
        })}
      </div>
    ) : (
      <NewsSectionsSkeleton />
    );
  },
);

export default NewsSections;
