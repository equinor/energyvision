import { useHits } from 'react-instantsearch-hooks'
import { List } from '@components'
import styled from 'styled-components'
import type { HitProps } from './Hit'

const { Item } = List

type HitsProps = {
  // Let's consider to create a compound component instead of this Algolia example way of doing it
  hitComponent: React.FC<HitProps>
  setIsOpen: (arg0: boolean) => void
}

const HitItem = styled(Item)`
  &:after {
    content: '';
    height: 1px;
    width: 100%;
    border-bottom: 1px solid var(--grey-20);
    /* Doesn't work in FF https://bugzilla.mozilla.org/show_bug.cgi?id=1481307 */
    transform: scaleY(0.5);
    position: absolute;
    border-radius: 0.01px;
  }
`

const HitsContainer = styled.div`
  position: relative;
`

const Hits = ({ hitComponent: Hit, setIsOpen }: HitsProps) => {
  const { hits } = useHits()

  return (
    <HitsContainer>
      <List variant="numbered" unstyled>
        {hits.map((hit) => (
          <HitItem key={hit.objectID}>
            <Hit setIsOpen={setIsOpen} hit={hit} />
          </HitItem>
        ))}
      </List>
    </HitsContainer>
  )
}

export default Hits
