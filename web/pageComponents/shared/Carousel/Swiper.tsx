/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-unresolved */
import { Children, ReactNode } from 'react'
import { Swiper, SwiperSlide, type SwiperProps } from 'swiper/react'
import { Pagination } from 'swiper'
import styled, { css } from 'styled-components'

import 'swiper/css'
import 'swiper/css/pagination'

const CardCarouselStyles = css`
  max-width: calc(var(--card-maxWidth) * ${({ items }: any) => items || '3'} + var(--space-large) * 4);
  padding: 0 var(--space-large);

  @media (max-width: 800px) {
    --card-maxWidth: 300px;
  }
`

// more to be added
export type CarouselTypes = 'card'

export type StyledSwiperTypes = {
  $items?: number
  $carouselType?: CarouselTypes
} & SwiperProps

const StyledSwiper = styled(Swiper)<StyledSwiperTypes>`
  ${({ $carouselType }: any) => ($carouselType === 'card' ? CardCarouselStyles : '')}

  .swiper-wrapper {
    padding-bottom: var(--space-3xLarge);
  }

  .swiper-pagination {
    bottom: 0;
  }
`

const StyledSwiperSlide = styled(SwiperSlide)`
  display: flex;
  width: auto;
  height: auto;
  margin-right: var(--space-large);

  &:last-of-type {
    margin: 0;
  }
`

export type CarouselProps = {
  slidesPerView?: number | 'auto'
  type?: CarouselTypes
  children: any
}

export const Carousel = ({ slidesPerView = 'auto', type = 'card', children, ...rest }: CarouselProps) => {
  const numberOfItems = Children.toArray(children).length

  return (
    <StyledSwiper
      pagination={{
        dynamicBullets: true,
        clickable: true,
      }}
      modules={[Pagination]}
      slidesPerView={slidesPerView}
      $items={numberOfItems}
      $carouselType={type}
      {...rest}
    >
      {children}
    </StyledSwiper>
  )
}

export type CarouselItemProps = {
  children: ReactNode
}

export const CarouselItem = ({ children, ...rest }: CarouselItemProps) => {
  return <StyledSwiperSlide {...rest}>{children}</StyledSwiperSlide>
}
// This is required in order for the Swiper library to correctly render
CarouselItem.displayName = 'SwiperSlide'
