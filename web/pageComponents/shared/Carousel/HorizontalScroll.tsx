/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-unresolved */
import { Children, ReactNode } from 'react'
import { Swiper, SwiperSlide, type SwiperProps } from 'swiper/react'
import { FreeMode, Scrollbar } from 'swiper'
import styled, { css } from 'styled-components'
import { NavButton } from './Navigation'
import { EdsProvider } from '@equinor/eds-core-react'

import 'swiper/css'
import 'swiper/css/scrollbar'
import 'swiper/css/free-mode'

const CardCarouselStyles = css`
  --card-maxWidth: 360px;

  padding: 0 var(--space-large);

  @media (max-width: 800px) {
    --card-maxWidth: 300px;
  }
`

// more to be added
export type CarouselTypes = 'card'

export type StyledSwiperTypes = {
  $carouselType?: CarouselTypes
} & SwiperProps

const Wrapper = styled.div<{ $items?: number }>`
  max-width: calc(var(--card-maxWidth) * ${({ items }: any) => items || '3'} + var(--space-large) * 4);
  margin: auto;

  position: relative;
  padding: 0 var(--space-xxLarge);

  @media (max-width: 600px) {
    padding: 0;
  }
`

const StyledSwiper = styled(Swiper)<StyledSwiperTypes>`
  ${({ $carouselType }: any) => ($carouselType === 'card' ? CardCarouselStyles : '')}

  position: unset;

  .swiper-wrapper {
    padding: var(--space-medium) 0 var(--space-xxLarge) 0;
  }

  .swiper-scrollbar {
    left: 0;
    margin: 0 var(--space-3xLarge);
    width: calc(100% - (var(--space-3xLarge) * 2));
  }
`

const StyledSwiperSlide = styled(SwiperSlide)`
  display: flex;
  width: var(--card-maxWidth);
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
    <Wrapper $items={numberOfItems}>
      <StyledSwiper
        scrollbar={{
          draggable: true,
        }}
        freeMode={true}
        modules={[Scrollbar, FreeMode]}
        slidesPerView={slidesPerView}
        grabCursor={true}
        $carouselType={type}
        {...rest}
      >
        {children}
        <EdsProvider density="compact">
          <NavButton type="prev" />
          <NavButton type="next" />
        </EdsProvider>
      </StyledSwiper>
    </Wrapper>
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
