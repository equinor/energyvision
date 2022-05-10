import styled from 'styled-components'
import { BackgroundContainer } from '@components'

import SinglePromotion from './promotions/SinglePromotion'
import MultiplePromotions from './promotions/MultiplePromotions'
import SimpleBlockContent from '../../common/SimpleBlockContent'
import { TitleBlockRenderer } from '../../common/serializers'
import IngressText from '../../common/portableText/IngressText'
import type { PromotionData } from '../../types/types'

const Wrapper = styled.div`
  padding: var(--promotion-padding, var(--space-3xLarge) 0);
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

const StyledHeading = styled(TitleBlockRenderer)`
  text-align: var(--promotion-titleAlign, center);
  margin-bottom: var(--space-xLarge);
`

const Promotion = ({ data, ...rest }: { data: PromotionData }) => {
  const { title, ingress, content, designOptions } = data
  // const { articles = [], pages = [] } = data.promotion
  const promotions = content?.promotions || []
  const variant = data.content?.type

  return (
    <BackgroundContainer background={designOptions?.background}>
      <Wrapper {...rest}>
        <Intro>
          {title && (
            <SimpleBlockContent
              blocks={title}
              serializers={{
                types: {
                  block: (props) => <StyledHeading level="h2" size="xl" {...props} />,
                },
              }}
            />
          )}
          {ingress && (
            <Ingress>
              <IngressText value={ingress} centered={true} />
            </Ingress>
          )}
        </Intro>
        {promotions?.length === 1 ? (
          /*  TODO: More than just people and events */
          <SinglePromotion promotion={promotions[0]} hasSectionTitle={!!title} />
        ) : (
          <MultiplePromotions data={promotions} variant={variant} hasSectionTitle={!!title} />
        )}
      </Wrapper>
    </BackgroundContainer>
  )
}

export default Promotion
