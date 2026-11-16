import type { Hit as AlgoliaHit } from '@algolia/client-search';
import { decode } from 'html-entities';
import {
  getHighlightedParts,
  getPropertyByPath,
} from 'instantsearch.js/es/lib/utils/index.js';
import { Fragment } from 'react';
import { Typography } from '@/core/Typography';
import type { HitData } from './UniversalHit';

type Highlight = {
  hit: AlgoliaHit<HitData>;
  attribute: string;
};

export const Highlight: React.FC<Highlight> = ({ hit, attribute }) => {
  const result =
    hit._snippetResult && attribute in hit._snippetResult
      ? hit._snippetResult
      : hit._highlightResult;

  const { value: attributeValue = '' } =
    getPropertyByPath(result, attribute) || {};
  const parts = getHighlightedParts(attributeValue);

  return (
    <>
      {parts.map((part, index) => {
        // Parts are a positional split of one string and never reorder, so the index is a stable key
        const key = `${index}-${part.value}`;
        const value = decode(part.value);
        if (part.isHighlighted) {
          return (
            <Typography
              variant="highlight"
              key={key}
              className="font-bold text-base"
            >
              {value}
            </Typography>
          );
        }
        return <Fragment key={key}>{value}</Fragment>;
      })}
    </>
  );
};
