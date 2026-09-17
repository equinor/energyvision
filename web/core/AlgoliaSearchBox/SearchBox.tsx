'use client';

import { Icon } from '@equinor/eds-core-react';
import { close, search } from '@equinor/eds-icons';
import { useTranslations } from 'next-intl';
import { useEffect, useId, useRef } from 'react';
import {
  SearchBox as InstantSearchSearchBox,
  type SearchBoxProps as InstantSearchSearchBoxProps,
} from 'react-instantsearch';
import { twMerge } from 'tailwind-merge';

export const MINIMUM_DEBOUNCED_QUERY_LENGTH = 3;
export const MINIMUM_SUBMITTED_QUERY_LENGTH = 2;
const SEARCH_DEBOUNCE_MS = 400;

type PendingSearch = {
  query: string;
  search: (query: string) => void;
};

type Variant = 'default' | 'inverted';

export type SearchBoxProps = Omit<
  InstantSearchSearchBoxProps,
  | 'classNames'
  | 'queryHook'
  | 'onSubmit'
  | 'resetIconComponent'
  | 'submitIconComponent'
  | 'translations'
> & {
  variant?: Variant;
  className?: string;
  inputClassName?: string;
  label?: string;
  labelClassName?: string;
};

function ResetIcon() {
  return <Icon size={24} data={close} />;
}

function SubmitIcon() {
  return <Icon size={24} data={search} />;
}

/** Requires an Algolia InstantSearch provider higher in the component tree. */
export function SearchBox({
  variant = 'default',
  className,
  inputClassName,
  label,
  labelClassName,
  placeholder,
  searchAsYouType = true,
  ...props
}: SearchBoxProps) {
  const intl = useTranslations();
  const inputId = useId();
  const debounceTimeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const pendingSearchRef = useRef<PendingSearch>(null);

  useEffect(() => {
    return () => clearTimeout(debounceTimeoutRef.current);
  }, []);

  const queryHook: InstantSearchSearchBoxProps['queryHook'] = (
    query,
    refine,
  ) => {
    clearTimeout(debounceTimeoutRef.current);
    const trimmedQuery = query.trim();
    pendingSearchRef.current = { query: trimmedQuery, search: refine };

    if (!searchAsYouType) {
      refine(
        trimmedQuery.length >= MINIMUM_SUBMITTED_QUERY_LENGTH
          ? trimmedQuery
          : '',
      );
      return;
    }

    if (trimmedQuery.length < MINIMUM_DEBOUNCED_QUERY_LENGTH) {
      refine('');
      return;
    }

    debounceTimeoutRef.current = setTimeout(() => {
      refine(trimmedQuery);
    }, SEARCH_DEBOUNCE_MS);
  };

  function handleSubmit() {
    clearTimeout(debounceTimeoutRef.current);
    const pendingSearch = pendingSearchRef.current;

    if (
      !pendingSearch ||
      pendingSearch.query.length < MINIMUM_SUBMITTED_QUERY_LENGTH
    ) {
      return;
    }

    pendingSearch.search(pendingSearch.query);
  }

  const inputVariantClassName = {
    default: 'bg-white-100 text-slate-80',
    inverted:
      'border-y border-l border-white-100 bg-slate-blue-95 text-white-100',
  };
  const resetVariantClassName = {
    default: 'text-slate-80 hover:bg-grey-20 focus-visible:envis-outline',
    inverted:
      'text-white-100 hover:bg-white-100 hover:text-slate-blue-95 focus-visible:envis-outline-invert',
  };
  const submitVariantClassName = {
    default: 'bg-norwegian-woods-70 text-slate-80 hover:bg-norwegian-woods-60',
    inverted:
      'bg-white-100 text-slate-blue-95 hover:bg-white-100/40 hover:text-white-100',
  };
  const formVariantClassName = {
    default:
      '[&:has(input:focus-visible):not(:has(:active))]:envis-outline [&:has(button[type=submit]:focus-visible):not(:has(:active))]:envis-outline dark:[&:has(input:focus-visible):not(:has(:active))]:envis-outline-invert dark:[&:has(button[type=submit]:focus-visible):not(:has(:active))]:envis-outline-invert',
    inverted:
      '[&:has(input:focus-visible):not(:has(:active))]:envis-outline-invert [&:has(button[type=submit]:focus-visible):not(:has(:active))]:envis-outline-invert',
  };

  return (
    <div className={className}>
      {label && (
        <label
          htmlFor={inputId}
          className={twMerge(
            'block max-w-text py-4 font-normal text-base text-slate-80 leading-inherit dark:text-white-100',
            labelClassName,
          )}
        >
          {label}
        </label>
      )}
      <InstantSearchSearchBox
        {...props}
        queryHook={queryHook}
        searchAsYouType={searchAsYouType}
        onSubmit={searchAsYouType ? handleSubmit : undefined}
        placeholder={placeholder ?? intl('search')}
        inputProps={{ id: inputId }}
        resetIconComponent={ResetIcon}
        submitIconComponent={SubmitIcon}
        translations={{
          resetButtonTitle: intl('search_reset'),
          submitButtonTitle: intl('search_submit'),
        }}
        classNames={{
          form: twMerge(
            'relative grid grid-cols-[1fr_min-content] rounded-xs',
            formVariantClassName[variant],
          ),
          input: twMerge(
            'col-start-1 row-start-1 grow rounded-s-xs rounded-e-none py-4 pr-12 pl-6 focus:outline-hidden',
            inputVariantClassName[variant],
            inputClassName,
          ),
          reset: twMerge(
            'absolute top-1/2 right-16 not-[hidden]:flex size-8 -translate-y-1/2 items-center justify-center rounded-full focus:outline-hidden',
            resetVariantClassName[variant],
          ),
          submit: twMerge(
            'col-start-2 row-start-1 h-full rounded-e-xs px-4 py-3 focus:outline-hidden',
            submitVariantClassName[variant],
          ),
          loadingIndicator:
            'absolute top-1/2 right-16 size-8 -translate-y-1/2 items-center justify-center text-white-100 not-[hidden]:flex',
        }}
      />
    </div>
  );
}
