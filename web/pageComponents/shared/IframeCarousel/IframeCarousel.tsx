/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-unresolved */
import { BackgroundContainer, FigureCaption } from '@components'
import styled from 'styled-components'
import TitleText from '../portableText/TitleText'
import type { IframeCarouselData } from '../../../types/types'

import 'swiper/css'
import 'swiper/css/pagination'
import CoreIFrame from '../iframe/IFrame'
import RichText from '../portableText/RichText'
import { Carousel } from '../../shared/Carousel'
import { ButtonLink } from '../ButtonLink'

const Container = styled.div`
  padding: var(--space-3xLarge) calc(var(--layout-paddingHorizontal-small) - var(--space-xxLarge));
  max-width: 1920px;
  margin-left: auto;
  margin-right: auto;
  & > figure {
    margin: 0;
  }
`
const Figure = styled.figure`
  margin: 0;
  width: 100%;
  flex-grow: 1;
`
const ItemContainer = styled.div`
  min-width: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;

  @media (min-width: 1300px) {
    min-width: 45%;
    /* exactly two items */
    :first-child:nth-last-child(2),
    :last-child:nth-child(2) {
      min-width: calc(50% - var(--space-medium));
    }
  }
`

const StyledHeading = styled(TitleText)`
  padding: 0 0 var(--space-large) 0;
  text-align: center;
`
const StyledItemHeading = styled(TitleText)`
  margin: 0 0 var(--space-large) 0;
  text-align: left;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  line-clamp: 2;
  display: -webkit-box;
  -webkit-box-orient: vertical;
`
const StyledButtonLink = styled(ButtonLink)`
  margin-top: var(--space-xLarge);
`
const StyledCoreIframe = styled(CoreIFrame)`
  flex-grow: 1;
`

type IframeCarouselProps = {
  data: IframeCarouselData
  anchor?: string
}

const IframeCarousel = ({ data, anchor, ...rest }: IframeCarouselProps) => {
  const { title, items, designOptions } = data
  const { background } = designOptions

  return (
    <BackgroundContainer background={{ backgroundColor: background }} {...rest} id={anchor}>
      <Container>
        {title && <StyledHeading value={title} />}
        <Carousel>
          {items.map((item) => (
            <ItemContainer key={item._key}>
              {item.title && <StyledItemHeading value={item.title} size="md" />}
              {item.description ? (
                <Figure>
                  <CoreIFrame
                    frameTitle={item.frameTitle}
                    url={item.url}
                    cookiePolicy={item.cookiePolicy}
                    aspectRatio={item.aspectRatio}
                    height={item.height}
                    hasSectionTitle={!!title}
                  />
                  <FigureCaption size="medium">
                    <RichText value={item.description} />
                  </FigureCaption>
                </Figure>
              ) : (
                <StyledCoreIframe
                  frameTitle={item.frameTitle}
                  url={item.url}
                  cookiePolicy={item.cookiePolicy}
                  aspectRatio={item.aspectRatio || '16:9'}
                  height={item.height}
                  hasSectionTitle={!!item.title}
                />
              )}
              {item.action && item.action.label && <StyledButtonLink action={item.action} />}
            </ItemContainer>
          ))}
        </Carousel>
      </Container>
    </BackgroundContainer>
  )
}

export default IframeCarousel
