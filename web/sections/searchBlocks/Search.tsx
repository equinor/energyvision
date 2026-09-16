'use client';
import { Icon } from '@equinor/eds-core-react';
import { close, search } from '@equinor/eds-icons';
import type { SearchClient } from 'instantsearch.js';
import { useLocale, useTranslations } from 'next-intl';
import { useEffect, useRef } from 'react';
import {
  Configure,
  Index,
  InstantSearch,
  SearchBox,
  type SearchBoxProps,
} from 'react-instantsearch';
import { PaginationContextProvider } from '@/contexts/PaginationContext';
import usePaginationPadding from '@/lib/hooks/usePaginationPadding';
import { Pagination } from '@/sections/searchBlocks/pagination/Pagination';
import SearchResults from '@/sections/searchBlocks/SearchResults';
import { searchClient as client } from '../../lib/algolia';

const MINIMUM_QUERY_LENGTH = 3;
const SEARCH_DEBOUNCE_MS = 400;

type PendingSearch = {
  query: string;
  search: (query: string) => void;
};

function ResetIcon() {
  return <Icon size={24} data={close} />;
}

function SubmitIcon() {
  return <Icon size={24} data={search} />;
}

const searchClient = client();
const queriedSearchClient: SearchClient = {
  ...searchClient,
  search(requests) {
    if (
      requests.some(
        ({ params }) =>
          typeof params?.query !== 'string' ||
          params.query.trim().length < MINIMUM_QUERY_LENGTH,
      )
    ) {
      return Promise.resolve({
        results: requests.map(() => ({
          hits: [],
          nbHits: 0,
          nbPages: 0,
          page: 0,
          processingTimeMS: 0,
          hitsPerPage: 0,
          exhaustiveNbHits: false,
          query: '',
          params: '',
        })),
      });
    }

    return searchClient.search(requests);
  },
};

export function Search() {
  const intl = useTranslations();
  const locale = useLocale();
  const resultsRef = useRef<HTMLDivElement>(null);
  const debounceTimeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const pendingSearchRef = useRef<PendingSearch>(null);
  const envPrefix =
    process.env.NEXT_PUBLIC_SANITY_DATASET === 'global' ? 'prod' : 'dev';

  useEffect(() => {
    return () => clearTimeout(debounceTimeoutRef.current);
  }, []);

  const queryHook: SearchBoxProps['queryHook'] = (query, search) => {
    clearTimeout(debounceTimeoutRef.current);
    const trimmedQuery = query.trim();
    pendingSearchRef.current = { query: trimmedQuery, search };

    if (trimmedQuery.length < MINIMUM_QUERY_LENGTH) {
      search('');
      return;
    }

    debounceTimeoutRef.current = setTimeout(() => {
      search(trimmedQuery);
    }, SEARCH_DEBOUNCE_MS);
  };

  function handleSearchSubmit() {
    clearTimeout(debounceTimeoutRef.current);
    const pendingSearch = pendingSearchRef.current;

    if (!pendingSearch || pendingSearch.query.length < MINIMUM_QUERY_LENGTH) {
      return;
    }

    pendingSearch.search(pendingSearch.query);
  }

  const padding = usePaginationPadding();
  const indices = [
    {
      value: `${envPrefix}_TOPICS_${locale}`,
      label: intl('search_topics_tab'),
    },
    {
      value: `${envPrefix}_EVENTS_${locale}`,
      label: intl('search_events_tab'),
    },
    {
      value: `${envPrefix}_NEWS_${locale}`,
      label: intl('search_news_tab'),
    },
    {
      value: `${envPrefix}_MAGAZINE_${locale}`,
      label: intl('search_magazine_tab'),
    },
  ];

  // The main index will be "all" at some point
  const mainIndex = `${envPrefix}_TOPICS_${locale}`;

  return (
    <main className="min-h-[calc(100dvh-694px)] bg-slate-blue-95 md:min-h-[calc(100dvh-479px)]">
      <InstantSearch
        key={mainIndex}
        indexName={mainIndex}
        searchClient={queriedSearchClient}
      >
        <Configure hitsPerPage={5} snippetEllipsisText="..." />
        {indices.map((index) => (
          <Index
            indexName={index.value}
            key={index.label}
            indexId={index.value}
          />
        ))}
        <div className="mx-auto p-8 px-layout-sm lg:px-layout-lg">
          <h1 className="sr-only">{intl('search_page_title')}</h1>

          <div className="max-w-175">
            <SearchBox
              queryHook={queryHook}
              onSubmit={handleSearchSubmit}
              autoFocus={true}
              placeholder={intl('search')}
              resetIconComponent={ResetIcon}
              submitIconComponent={SubmitIcon}
              translations={{
                resetButtonTitle: intl('search_reset'),
                submitButtonTitle: intl('search_submit'),
              }}
              classNames={{
                form: 'relative grid grid-cols-[1fr_min-content] rounded-xs [&:has(input:focus-visible):not(:has(:active))]:envis-outline-invert [&:has(button[type=submit]:focus-visible):not(:has(:active))]:envis-outline-invert',
                input:
                  'col-start-1 row-start-1 grow rounded-s-xs rounded-e-none border-y border-l border-white-100 bg-slate-blue-95 py-4 pr-12 pl-6 text-white-100 focus:outline-hidden',
                reset:
                  'absolute top-1/2 right-16 size-8 -translate-y-1/2 items-center justify-center rounded-full text-white-100 not-[hidden]:flex hover:bg-white-100 hover:text-slate-blue-95 focus:outline-hidden focus-visible:envis-outline-invert',
                submit:
                  'col-start-2 row-start-1 h-full rounded-e-xs bg-white-100 px-4 py-3 text-slate-blue-95 hover:bg-white-100/40 hover:text-white-100 focus:outline-hidden',
                loadingIndicator:
                  'absolute top-1/2 right-16 size-8 -translate-y-1/2 items-center justify-center text-white-100 not-[hidden]:flex',
              }}
            />
          </div>
          <SearchResults resultsRef={resultsRef} items={indices} />
          <PaginationContextProvider defaultRef={resultsRef}>
            <Pagination
              className="mt-12 justify-center"
              padding={padding}
              hitsPerPage={5}
            />
          </PaginationContextProvider>
        </div>
      </InstantSearch>
    </main>
  );
}
