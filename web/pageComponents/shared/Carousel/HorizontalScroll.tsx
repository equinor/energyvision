/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-unresolved */
import { Children, ReactNode } from 'react'
import { Swiper, SwiperSlide, type SwiperProps } from 'swiper/react'
import { FreeMode, Scrollbar } from 'swiper'
import styled, { css } from 'styled-components'
import { NavButton } from './Navigation'

import 'swiper/css'
import 'swiper/css/scrollbar'
import 'swiper/css/free-mode'

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
    padding-bottom: var(--space-xxLarge);
  }

  .swiper-scrollbar {
    left: 0;
    margin: 0 var(--space-3xLarge);
    width: calc(100% - (var(--space-3xLarge) * 2));
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

export type HorizontalScrollProps = {
  slidesPerView?: number | 'auto'
  type?: CarouselTypes
  children: any
}

export const HorizontalScroll = ({
  slidesPerView = 'auto',
  type = 'card',
  children,
  ...rest
}: HorizontalScrollProps) => {
  const numberOfItems = Children.toArray(children).length

  return (
    <StyledSwiper
      scrollbar={{
        draggable: true,
      }}
      freeMode={true}
      modules={[Scrollbar, FreeMode]}
      slidesPerView={slidesPerView}
      grabCursor={true}
      $items={numberOfItems}
      $carouselType={type}
      {...rest}
    >
      <NavButton type="prev" />
      {children}
      <NavButton type="next" />
    </StyledSwiper>
  )
}

export type HorizontalScrollItemProps = {
  children: ReactNode
}

export const HorizontalScrollItem = ({ children, ...rest }: HorizontalScrollItemProps) => {
  return <StyledSwiperSlide {...rest}>{children}</StyledSwiperSlide>
}
// This is required in order for the Swiper library to correctly render
HorizontalScrollItem.displayName = 'SwiperSlide'
