/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-unresolved */
import { BackgroundContainer, FigureCaption } from '@components'
import styled from 'styled-components'
import TitleText from '../portableText/TitleText'
import type { IframeCarouselData } from '../../../types/types'
import { HorizontalScroll, HorizontalScrollItem } from '../../shared/HorizontalScroll'

import 'swiper/css'
import 'swiper/css/pagination'
import CoreIFrame from '../iframe/IFrame'
import RichText from '../portableText/RichText'
import { Flags } from '../../../common/helpers/datasetHelpers'
import { Carousel } from '../../shared/Carousel'

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
`
const ItemContainer = styled.div`
  width: 100%;
`

const StyledHeading = styled(TitleText)`
  padding: var(--iframe-titlePadding, 0 0 var(--space-large) 0);
  text-align: var(--iframe-titleAlign, center);
`
const StyledItemHeading = styled(TitleText)`
  margin: var(--iframe-titlePadding, 0 0 var(--space-large) 0);
  text-align: var(--iframe-titleAlign, left);
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  line-clamp: 2;
  display: -webkit-box;
  -webkit-box-orient: vertical;
`

const StyledCarousel = styled(Carousel)`
  padding-right: var(--space-medium);
  padding-left: var(--space-medium);
`

const CarouselContainer = styled.div`
  padding: var(--iframe-innerPadding, 0 var(--layout-paddingHorizontal-small));
`

type IframeCarouselProps = {
  data: IframeCarouselData
  anchor?: string
}

const IframeCarousel = ({ data, anchor, ...rest }: IframeCarouselProps) => {
  const { title, items, designOptions } = data
  const { background } = designOptions

  return (
    <BackgroundContainer background={background} {...rest} id={anchor}>
      <Container>
        {title && <StyledHeading value={title} />}
        {Flags.IS_DEV ? (
          <CarouselContainer>
            <StyledCarousel>
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
                    <CoreIFrame
                      frameTitle={item.frameTitle}
                      url={item.url}
                      cookiePolicy={item.cookiePolicy}
                      aspectRatio={item.aspectRatio || '16:9'}
                      height={item.height}
                      hasSectionTitle={!!item.title}
                    />
                  )}
                </ItemContainer>
              ))}
            </StyledCarousel>
          </CarouselContainer>
        ) : (
          <HorizontalScroll type="iframe">
            {items.map((item) => (
              <HorizontalScrollItem key={item._key}>
                <ItemContainer>
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
                    <CoreIFrame
                      frameTitle={item.frameTitle}
                      url={item.url}
                      cookiePolicy={item.cookiePolicy}
                      aspectRatio={item.aspectRatio || '16:9'}
                      height={item.height}
                      hasSectionTitle={!!item.title}
                    />
                  )}
                </ItemContainer>
              </HorizontalScrollItem>
            ))}
          </HorizontalScroll>
        )}
      </Container>
    </BackgroundContainer>
  )
}

export default IframeCarousel
