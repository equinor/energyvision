import styled from 'styled-components'
import { BackgroundContainer } from '@components'
import SinglePromotion from './promotions/SinglePromotion'
import MultiplePromotions from './promotions/MultiplePromotions'
import TitleText from '../shared/portableText/TitleText'
import IngressText from '../shared/portableText/IngressText'
import type { PromotionData } from '../../types/types'
import { twMerge } from 'tailwind-merge'

const Wrapper = styled.div`
  --card-minWidth: 200px;
  --card-maxWidth: 100%;

  @media (min-width: 1000px) {
    --card-maxWidth: 400px;
  }
`
const Ingress = styled.div`
  margin-bottom: var(--space-xLarge);
`

const Intro = styled.div`
  padding: 0 var(--layout-paddingHorizontal-large);
  max-width: var(--maxViewportWidth);
  margin: 0 auto;
`

const StyledHeading = styled(TitleText)`
  text-align: var(--promotion-titleAlign, center);
  margin-bottom: var(--space-xLarge);
`

const Promotion = ({
  data,
  anchor,
  className,
  ...rest
}: {
  data: PromotionData
  anchor?: string
  className?: string
}) => {
  const { title, ingress, content, useHorizontalScroll, designOptions } = data
  // const { articles = [], pages = [] } = data.promotion
  const promotions = content?.promotions || []
  const variant = data.content?.type

  return (
    <BackgroundContainer {...designOptions} id={anchor} renderFragmentWhenPossible>
      <Wrapper className={twMerge(`pb-page-content xl:px-14 max-w-viewport mx-auto`, className)} {...rest}>
        <Intro>
          {title && <StyledHeading value={title} level="h2" size="xl" />}
          {ingress && (
            <Ingress>
              <IngressText value={ingress} />
            </Ingress>
          )}
        </Intro>
        {promotions?.length === 1 ? (
          /*  TODO: More than just people and events */
          <SinglePromotion promotion={promotions[0]} hasSectionTitle={!!title} />
        ) : (
          <MultiplePromotions
            data={promotions}
            variant={variant}
            hasSectionTitle={!!title}
            eventPromotionSettings={content?.eventPromotionSettings}
            useHorizontalScroll={useHorizontalScroll}
          />
        )}
      </Wrapper>
    </BackgroundContainer>
  )
}

export default Promotion
