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

const IframeCarouselStyles = css`
  --card-maxWidth: 480px;

  @media (max-width: 800px) {
    --card-maxWidth: 300px;
    padding: 0 var(--space-large);
  }
`

const PromoTileStyles = css`
  --card-maxWidth: 400px;
  padding: 0 var(--space-large);

  @media (max-width: 800px) {
    --card-maxWidth: 300px;
    padding: 0 var(--space-large);
  }
`

// more to be added
export type CarouselTypes = 'card' | 'iframe' | 'promoTile'

export type StyledSwiperTypes = {
  $carouselType?: CarouselTypes
  $items?: number
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
  ${({ $carouselType }: any) => {
    switch ($carouselType) {
      case 'card':
        return CardCarouselStyles
      case 'iframe':
        return IframeCarouselStyles
      case 'promoTile':
        return PromoTileStyles
      default:
        return CardCarouselStyles
    }
  }}

  position: unset;

  .swiper-wrapper {
    padding: var(--space-medium) 0 var(--space-xxLarge) 0;
    @media (min-width: 800px) {
      justify-content: ${({ $items, $carouselType }: any) =>
        $items ? ($items < 3 && $carouselType === 'iframe' ? 'center' : 'normal') : `normal`};
    }
  }

  .swiper-scrollbar {
    left: 0;
    margin: 0 var(--space-3xLarge);
    width: calc(100% - (var(--space-3xLarge) * 2));
    z-index: 1;
  }
`

const StyledSwiperSlide = styled(SwiperSlide)<{ $autoSlideWidth?: boolean }>`
  display: flex;
  width: ${({ $autoSlideWidth }) => ($autoSlideWidth ? 'auto' : 'var(--card-maxWidth)')};
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
        $items={numberOfItems}
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
  autoSlideWidth?: boolean
  children: ReactNode
}

export const HorizontalScrollItem = ({ autoSlideWidth, children, ...rest }: HorizontalScrollItemProps) => {
  return (
    <StyledSwiperSlide $autoSlideWidth={autoSlideWidth} {...rest}>
      {children}
    </StyledSwiperSlide>
  )
}
// This is required in order for the Swiper library to correctly render
HorizontalScrollItem.displayName = 'SwiperSlide'
