import { Hit as AlgoliaHit } from '@algolia/client-search'
import { useHits, UseHitsProps } from 'react-instantsearch-hooks'
import styled from 'styled-components'
import { List } from '@components'

const { Item } = List

const HitList = styled.div`
  /* Temp, use the grid */
  padding-right: var(--space-3xLarge);
  position: relative;
`
const HitItem = styled(Item)`
  /*  &:after {
    content: '';
    height: 1px;
    width: 100%;
    border-bottom: 1px solid var(--grey-20);
    /* Doesn't work in FF https://bugzilla.mozilla.org/show_bug.cgi?id=1481307 */
  /* transform: scaleY(0.5);
    position: absolute;
    border-radius: 0.01px;
  } */
  border-bottom: 1px solid var(--slate-blue-50);
`

export type HitsProps<THit> = React.ComponentProps<'div'> &
  UseHitsProps & {
    hitComponent: (props: { hit: THit }) => JSX.Element
  }

// @TODO: refactor into our code style
export function Hits<THit extends AlgoliaHit<Record<string, unknown>>>({ hitComponent: Hit }: HitsProps<THit>) {
  const { hits } = useHits()

  return (
    <HitList>
      <List variant="numbered" unstyled>
        {hits.map((hit) => (
          <HitItem key={hit.objectID} className="ais-Hits-item">
            <Hit hit={hit as unknown as THit} />
          </HitItem>
        ))}
      </List>
    </HitList>
  )
}
