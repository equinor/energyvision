import { useHits, UseHitsProps } from 'react-instantsearch-hooks-web'
import { FormattedMessage } from 'react-intl'
import styled from 'styled-components'
import MagazineCard from '../../cards/MagazineCard'
import type { MagazineCardData } from '../../../types/types'

const HitList = styled.div`
  width: 100%;
  display: grid;
  justify-content: center;
  grid-gap: var(--space-large);

  --card-minWidth: 200px;
  --card-maxWidth: 335px;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, var(--card-minWidth)), var(--card-maxWidth)));

  @media (min-width: 1000px) {
    --card-maxWidth: 400px;
  }
`

const StyledMagazineCard = styled(MagazineCard)`
  min-width: var(--card-minWidth);
  max-width: var(--card-maxWidth);

  flex-basis: 0;
  flex-grow: 1;
`

export type HitsProps<THit> = React.ComponentProps<'div'> &
  UseHitsProps & {
    hitComponent: (props: { hit: THit }) => JSX.Element
  }

// @TODO: refactor into our code style
export function Hits() {
  const { hits } = useHits()

  if (!hits || hits.length === 0) {
    return <FormattedMessage id="newsroom_no_hits" defaultMessage="Your search returned no results" />
  }

  return (
    <HitList>
      {hits.map((hit) => {
        const data = {
          title: hit.pageTitle,
          slug: hit.slug,
          tags: hit.magazineTags,
          heroImage: hit.heroImage,
        }

        return <StyledMagazineCard key={hit.objectID} data={data as MagazineCardData} />
      })}
    </HitList>
  )
}
