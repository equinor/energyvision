import { HTMLAttributes, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { Icon } from '@equinor/eds-core-react'
import { chevron_left, chevron_right } from '@equinor/eds-icons'
import { usePrefersReducedMotion } from '../../common/hooks/usePrefersReducedMotion'
import { outlineTemplate, Tokens } from '@utils'

const { outline } = Tokens

const StyledButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  margin-top: auto;
  margin-bottom: auto;
  min-height: 30px;
  min-width: 30px;
  background-color: white;
  border-radius: 100px;
  outline: 0.5px solid var(--grey-30);
  top: 0;
  bottom: 0;
  box-shadow: 0px 6px 20px rgba(0, 0, 0, 0.2);
  z-index: 2;
  height: min-content;
  border: none;
  padding: 0;
  transition: all 0.5s ease;
  cursor: pointer;

  :hover {
    opacity: 1;
    fill: white;
    background-color: var(--energy-red-100);
    outline: transparent;
  }
  &[data-focus-visible-added]:focus {
    ${outlineTemplate(outline)}
  }

  @media (min-width: 520px) {
    min-height: 32px;
    min-width: 32px;
  }
`

const StyledIcon = styled(Icon)`
  height: 22px;
  width: 22px;

  @media (min-width: 520px) {
    min-height: 24px;
    min-width: 24px;
  }
`

const StyledLeftButton = styled(StyledButton)`
  left: 0;
  margin-left: calc(-1 * (var(--space-12)));
  @media (min-width: 520px) {
    margin-left: calc(-1 * (var(--space-40)));
  }
`

const StyledRightButton = styled(StyledButton)`
  right: 0;
  margin-right: calc(-1 * (var(--space-12)));
  @media (min-width: 520px) {
    margin-right: calc(-1 * (var(--space-40)));
  }
`

const Container = styled.div`
  padding: 0 var(--layout-paddingHorizontal-small);
  max-width: var(--maxViewportWidth);
  margin: auto;
`

const CarouselWrapper = styled.div`
  position: relative;
`
const CarouselDiv = styled.div<{ $isScrollable: boolean; $horizontalPadding: boolean }>`
  ${({ $isScrollable }) => !$isScrollable && { justifyContent: 'center' }};
  ${({ $horizontalPadding }) => $horizontalPadding && { padding: '0 var(--space-large)' }};
  padding-bottom: var(--space-large);
  padding-top: var(--space-large);
  display: flex;
  align-items: stretch;
  overflow-x: auto;
  gap: var(--space-medium);

  ::-webkit-scrollbar {
    height: 5px;
    cursor: pointer;
  }
  ::-webkit-scrollbar-thumb {
    background-color: var(--energy-red-100);
    border-radius: 10px;
    width: 1px;
  }
  ::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.6);
    border-radius: 10px;
    margin: 0 var(--space-4xLarge);
  }
`

type CarouselType = {
  children: React.ReactNode
  scrollOffset?: number
  horizontalPadding?: boolean
} & HTMLAttributes<HTMLDivElement>

export const Carousel = ({ children, scrollOffset, horizontalPadding = false, ...props }: CarouselType) => {
  const [isScrollable, setIsScrollable] = useState<boolean>(true)
  const scrollRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = usePrefersReducedMotion()

  const handleScroll = (scrollType: string) => {
    const container = scrollRef.current
    if (container) {
      const noOfItems = container?.childElementCount - 2 // exclude right & left arrow from children count.
      const itemWidth = container?.lastElementChild?.clientWidth || 0
      const padding = (container?.scrollWidth - itemWidth * noOfItems) / (noOfItems - 1)
      const calculatedOffset = itemWidth + padding / 2
      const offset = scrollOffset || calculatedOffset

      container.scrollBy({
        left: scrollType === 'forward' ? offset : -offset,
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
      })
    }
  }

  useEffect(() => {
    const checkIfScrollable = function (el: HTMLDivElement) {
      if (!el) return false
      const hasScrollableContent = el?.scrollWidth > el?.clientWidth
      const overflowYStyle = window.getComputedStyle(el).overflowX
      const isOverflowHidden = overflowYStyle.indexOf('hidden') !== -1
      return hasScrollableContent && !isOverflowHidden
    }

    const container = scrollRef.current
    if (container) {
      setIsScrollable(checkIfScrollable(container))
      window.addEventListener('resize', () => setIsScrollable(checkIfScrollable(container)))
      return () => {
        window.removeEventListener('resize', () => setIsScrollable(checkIfScrollable(container)))
      }
    }
  }, [scrollRef, children])

  return (
    <Container>
      <CarouselWrapper>
        <CarouselDiv ref={scrollRef} $isScrollable={isScrollable} $horizontalPadding={horizontalPadding} {...props}>
          {isScrollable && (
            <>
              <StyledLeftButton className="carousel-arrow" aria-label="Left Arrow" onClick={() => handleScroll('back')}>
                <StyledIcon color="inherit" data={chevron_left} />
              </StyledLeftButton>
              <StyledRightButton
                className="carousel-arrow"
                aria-label="Right Arrow"
                onClick={() => handleScroll('forward')}
              >
                <StyledIcon color="inherit" data={chevron_right} />
              </StyledRightButton>
            </>
          )}
          {children}
        </CarouselDiv>
      </CarouselWrapper>
    </Container>
  )
}
