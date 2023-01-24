/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-unresolved */
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper'
import { BackgroundContainer } from '@components'
import styled from 'styled-components'
import TitleText from '../portableText/TitleText'
import { CarouselItem } from './ImageCarouselItem'
import { EdsProvider } from '@equinor/eds-core-react'
import { NavButton } from './Navigation'
import type { ImageCarouselData } from '../../../types/types'

import 'swiper/css'
import 'swiper/css/pagination'

const Container = styled.div`
  padding: var(--space-3xLarge) var(--layout-paddingHorizontal-small);
  max-width: 1920px;
  margin-left: auto;
  margin-right: auto;
  & > figure {
    margin: 0;
  }
`

const StyledHeading = styled(TitleText)`
  padding: var(--iframe-titlePadding, 0 0 var(--space-large) 0);
  text-align: var(--iframe-titleAlign, left);
`

type ImageCarouselProps = {
  data: ImageCarouselData
  anchor?: string
}

const ImageCarousel = ({ data, anchor, ...rest }: ImageCarouselProps) => {
  const { title, items, options, designOptions } = data
  const { background } = designOptions

  const delay = options.delay * 1000

  return (
    <BackgroundContainer background={background} {...rest} id={anchor}>
      <Container>
        {title && <StyledHeading value={title} />}
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: delay,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          pagination={{
            type: 'fraction',
            el: '.paginationWrapper',
          }}
          navigation={true}
          modules={[Autoplay, Pagination]}
        >
          {items.map((item) => (
            <SwiperSlide key={item._key}>
              <CarouselItem image={item.image} caption={item.caption} attribution={item.attribution} />
            </SwiperSlide>
          ))}
          <EdsProvider density="compact">
            <NavButton type="prev" />
            <NavButton type="next" />
          </EdsProvider>
        </Swiper>
      </Container>
    </BackgroundContainer>
  )
}

export default ImageCarousel
