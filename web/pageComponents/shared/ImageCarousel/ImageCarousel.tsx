/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-unresolved */
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper'
import { BackgroundContainer } from '@components'
import styled from 'styled-components'
import TitleText from '../portableText/TitleText'
import { CarouselItem } from './ImageCarouselItem'
import type { ImageCarouselData } from '../../../types/types'

import 'swiper/css'
import 'swiper/css/pagination'
import { twMerge } from 'tailwind-merge'

const Container = styled.div`
  & > figure {
    margin: 0;
  }
`

const StyledHeading = styled(TitleText)`
  padding: 0 0 var(--space-large) 0;
  text-align: left;
`

type ImageCarouselProps = {
  data: ImageCarouselData
  anchor?: string
  className?: string
}

const ImageCarousel = ({ data, anchor, className, ...rest }: ImageCarouselProps) => {
  const { title, items, options, designOptions } = data
  const { background } = designOptions
  const { autoplay, delay } = options

  return (
    <BackgroundContainer background={background} {...rest} id={anchor}>
      <Container className={twMerge(`pb-page-content px-layout-sm max-w-viewport mx-auto`, className)}>
        {title && <StyledHeading value={title} />}
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          pagination={{
            type: 'fraction',
            el: '.paginationWrapper',
          }}
          navigation={true}
          modules={[Autoplay, Pagination]}
          {...(autoplay
            ? {
                autoplay: {
                  delay: delay * 1000,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                },
              }
            : {})}
        >
          {items.map((item, index, array) => {
            const pagination = (index + 1).toString() + ' / ' + array.length.toString()
            return (
              <SwiperSlide key={item._key}>
                <CarouselItem
                  image={item.image}
                  caption={item.caption}
                  attribution={item.attribution}
                  pagination={pagination}
                />
              </SwiperSlide>
            )
          })}
        </Swiper>
      </Container>
    </BackgroundContainer>
  )
}

export default ImageCarousel
