'use client';
import { Icon } from '@equinor/eds-core-react';
import { search } from '@equinor/eds-icons';
import type { MouseEvent } from 'react';
import ButtonLink from '@/core/Link/ButtonLink';

export type SearchLinkProps = {
  href: string;
  label: string;
};

export const SearchLink = ({ href, label }: SearchLinkProps) => {
  // Client-side navigation to /search can serve a stale cached shell; force a full page load.
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }
    event.preventDefault();
    window.location.assign(href);
  };

  return (
    <ButtonLink
      variant="ghost"
      aria-expanded="false"
      aria-label={label}
      prefetch={false}
      href={href}
      onClick={handleClick}
      className="clickbound-area w-full p-2 md:px-5 md:py-3"
    >
      <Icon size={24} data={search} />
      <span className="max-md:sr-only">{label}</span>
    </ButtonLink>
  );
};

export default SearchLink;
