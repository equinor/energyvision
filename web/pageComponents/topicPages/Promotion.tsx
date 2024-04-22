import styled from 'styled-components'
import { BackgroundContainer } from '@components'
import SinglePromotion from './promotions/SinglePromotion'
import MultiplePromotions from './promotions/MultiplePromotions'
import TitleText from '../shared/portableText/TitleText'
import IngressText from '../shared/portableText/IngressText'
import type { PromotionData } from '../../types/types'
import { twMerge } from 'tailwind-merge'

const Wrapper = styled.div`
  --card-maxWidth: 400px;
  --card-minWidth: 200px;
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
    <BackgroundContainer background={designOptions?.background} id={anchor} renderFragmentWhenPossible>
      <div className={twMerge(`pb-page-content px-layout-md max-w-viewport mx-auto`, className)} {...rest}>
        <header className="flex-col flex items-center gap-8 pb-8">
          {title && <TitleText value={title} level="h2" size="xl" />}
          {ingress && (
            <Ingress>
              <IngressText value={ingress} />
            </Ingress>
          )}
        </header>
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
      </div>
    </BackgroundContainer>
  )
}

export default Promotion
