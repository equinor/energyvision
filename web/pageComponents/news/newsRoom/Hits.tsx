import { Hit as AlgoliaHit } from '@algolia/client-search'
import { useHits, UseHitsProps } from 'react-instantsearch-hooks'
import { List } from '@components'

const { Item } = List

export type HitsProps<THit> = React.ComponentProps<'div'> &
  UseHitsProps & {
    hitComponent: (props: { hit: THit }) => JSX.Element
  }

export function Hits<THit extends AlgoliaHit<Record<string, unknown>>>({ hitComponent: Hit }: HitsProps<THit>) {
  const { hits } = useHits()

  return (
    <div>
      <List variant="numbered" unstyled>
        {hits.map((hit) => (
          <Item key={hit.objectID} className="ais-Hits-item">
            <Hit hit={hit as unknown as THit} />
          </Item>
        ))}
      </List>
    </div>
  )
}
