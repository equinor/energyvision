import { HTMLAttributes, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { Icon } from '@equinor/eds-core-react'
import { chevron_left, chevron_right } from '@equinor/eds-icons'
import { usePrefersReducedMotion } from '../../common/hooks/usePrefersReducedMotion'

// TODO: Move buttons to own component
const StyledButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  margin-top: auto;
  margin-bottom: auto;
  min-height: 32px;
  min-width: 32px;
  background-color: white;
  border-radius: 100px;
  opacity: 0.6;
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
    background-color: var(--energy-red-100);
    fill: white;
  }
`

const StyledLeftButton = styled(StyledButton)`
  left: 0;
  margin-left: calc(-1 * (var(--space-12) + var(--space-2) + var(--space-1)));
  @media (min-width: 520px) {
    margin-left: calc(-1 * (var(--space-32)));
  }
`

const StyledRightButton = styled(StyledButton)`
  right: 0;
  margin-right: calc(-1 * (var(--space-12) + var(--space-2) + var(--space-1)));
  @media (min-width: 520px) {
    margin-right: calc(-1 * (var(--space-32)));
  }
`

const CarouselWrapper = styled.div`
  position: relative;
`
// If cards require more styling, move to styled switch statement
const CarouselDiv = styled.div<{ $isScrollable: boolean }>`
  ${({ $isScrollable }) => !$isScrollable && { justifyContent: 'center' }};
  display: flex;
  align-items: stretch;
  overflow-x: auto;
  gap: var(--space-medium);
  padding-bottom: var(--space-medium);

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
} & HTMLAttributes<HTMLDivElement>

export const Carousel = ({ children, scrollOffset, ...props }: CarouselType) => {
  const [isScrollable, setIsScrollable] = useState<boolean>(true)
  const scrollRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = usePrefersReducedMotion()

  const handleScroll = (scrollType: string) => {
    const container = scrollRef.current
    if (container) {
      const offset = scrollOffset || Math.max(0.5 * container.offsetWidth, 320)
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
    <CarouselWrapper>
      <CarouselDiv ref={scrollRef} $isScrollable={isScrollable} {...props}>
        {isScrollable && (
          <>
            <StyledLeftButton onClick={() => handleScroll('back')}>
              <Icon color="inherit" size={24} data={chevron_left} />
            </StyledLeftButton>
            <StyledRightButton onClick={() => handleScroll('forward')}>
              <Icon color="inherit" size={24} data={chevron_right} />
            </StyledRightButton>
          </>
        )}
        {children}
      </CarouselDiv>
    </CarouselWrapper>
  )
}
