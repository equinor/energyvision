import styled from 'styled-components'
import PeopleCard from '../cards/PeopleCard/PeopleCard'
import type { PeopleCardData, EventCardData, CardData } from '../../types/types'

const LandscapeWrapper = styled.div`
  max-width: 250px;
  margin-top: var(--space-xLarge);
  margin-left: auto;
  margin-right: auto;
  @media (min-width: 450px) {
    padding: 0 var(--layout-paddingHorizontal-large);
    max-width: var(--maxViewportWidth);
  }
`

type SinglePromotionData = {
  promotion: PeopleCardData | CardData | EventCardData
  hasSectionTitle?: boolean
}

const SinglePromotion = ({ promotion, hasSectionTitle = false }: SinglePromotionData) => {
  return (
    <LandscapeWrapper>
      <PeopleCard orientation="landscape" data={promotion as PeopleCardData} hasSectionTitle={hasSectionTitle} />
    </LandscapeWrapper>
  )
}

export default SinglePromotion
