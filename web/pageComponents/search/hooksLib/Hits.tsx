// This is the actual typescript version from the docs

/* import { Hit as AlgoliaHit } from '@algolia/client-search';
import { useHits, UseHitsProps } from 'react-instantsearch-hooks';

export type HitsProps<THit> = React.ComponentProps<'div'> &
  UseHitsProps & {
    hitComponent: (props: { hit: THit }) => JSX.Element;
  };

export function Hits<THit extends AlgoliaHit<Record<string, unknown>>>({
  hitComponent: Hit,
}: HitsProps<THit>) {
  const { hits } = useHits();

  return (
    <div className="ais-Hits">
      <ol className="ais-Hits-list">
        {hits.map((hit) => (
          <li key={hit.objectID} className="ais-Hits-item">
            <Hit hit={hit as unknown as THit} />
          </li>
        ))}
      </ol>
    </div>
  );
} */

import { useHits } from 'react-instantsearch-hooks'

type HitsProps = {
  // Let's consider to create a compound component instead of this Algolia example way of doing it
  hitComponent: any
  setIsOpen: (arg0: boolean) => void
}

const Hits = ({ hitComponent: Hit, setIsOpen }: HitsProps) => {
  const { hits, results } = useHits()
  const hasQuery = results && results.query !== ''

  return (
    <div>
      {hasQuery ? (
        <ol>
          {hits.map((hit) => (
            <li key={hit.objectID} className="ais-Hits-item">
              <Hit setIsOpen={setIsOpen} hit={hit} />
            </li>
          ))}
        </ol>
      ) : (
        <span>No query yet</span>
      )}
    </div>
  )
}

export default Hits
