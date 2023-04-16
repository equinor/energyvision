import styled from 'styled-components'
import type { VideoPlayerCarouselData } from '../../types/types'
import { BackgroundContainer } from '@components'
import TitleText from './portableText/TitleText'
import { urlFor } from '../../common/helpers'
import { StyledHLSPlayer } from './VideoPlayer'
import { Icon } from '@equinor/eds-core-react'
import { chevron_left, chevron_right } from '@equinor/eds-icons'
import { useEffect, useRef, useState } from 'react'
import { usePrefersReducedMotion } from '../../common/hooks/usePrefersReducedMotion'

const StyledHeading = styled(TitleText)`
  padding: var(
    --iframe-innerPadding,
    var(--space-xxLarge) var(--layout-paddingHorizontal-large) 0 var(--layout-paddingHorizontal-large)
  );
  margin-bottom: calc(-1 * var(--space-small));
  text-align: var(--iframe-titleAlign, left);
`

const Container = styled.div`
  padding: var(--iframe-innerPadding, var(--space-xxLarge) var(--layout-paddingHorizontal-medium));
  max-width: var(--iframe-maxWidth, var(--maxViewportWidth));
  margin: auto;
`

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

const StyledLeftButton = styled(StyledButton)<{ $isScrollable: boolean }>`
  ${({ $isScrollable }) => !$isScrollable && { display: 'none' }};
  left: 0;
  margin-left: calc(-1 * (var(--space-12) + var(--space-2) + var(--space-1)));
`

const StyledRightButton = styled(StyledButton)<{ $isScrollable: boolean }>`
  ${({ $isScrollable }) => !$isScrollable && { display: 'none' }};
  right: 0;
  margin-right: calc(-1 * (var(--space-12) + var(--space-2) + var(--space-1)));
`

const Wrapper = styled.div<{ $isScrollable: boolean }>`
  ${({ $isScrollable }) => !$isScrollable && { justifyContent: 'center' }};
  display: flex;
  align-items: start;
  overflow-x: auto;
  gap: var(--space-medium);
  padding-bottom: var(--space-small);
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

const VideoItem = styled.div<{ $aspectRatio: string }>`
  display: flex;
  min-width: fit-content;
  flex-direction: column;
  ${({ $aspectRatio }) => ($aspectRatio === '16:9' ? { minWidth: '90%' } : { minWidth: 'auto' })};

  h3 {
    padding: var(--space-medium) var(--space-small);
  }
`

const VideoPlayer = ({ anchor, data }: { data: VideoPlayerCarouselData; anchor?: string }) => {
  const { title, items, designOptions } = data
  const { background, aspectRatio } = designOptions
  const scrollRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = usePrefersReducedMotion()
  const [isScrollable, setIsScrollable] = useState<boolean>(true)

  const handleScroll = (scrollType: string) => {
    const container = scrollRef.current
    if (container) {
      const offset = Math.max(0.5 * container.offsetWidth, 320)
      container.scrollBy({
        left: scrollType === 'forward' ? offset : -offset,
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
      })
    }
  }

  let width: number, height: number

  if (aspectRatio === '16:9') {
    width = 1380
    height = 777
  } else if (aspectRatio === '9:16') {
    width = 336
    height = 600
  } else {
    width = 600
    height = 600
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
  }, [scrollRef])

  return (
    <BackgroundContainer background={background} id={anchor}>
      {title && <StyledHeading value={title} />}
      <Container>
        <div style={{ position: 'relative' }}>
          <Wrapper ref={scrollRef} $isScrollable={isScrollable}>
            <StyledLeftButton $isScrollable={isScrollable} onClick={() => handleScroll('back')}>
              <Icon color="inherit" size={24} data={chevron_left} />
            </StyledLeftButton>
            <StyledRightButton $isScrollable={isScrollable} onClick={() => handleScroll('forward')}>
              <Icon color="inherit" size={24} data={chevron_right} />
            </StyledRightButton>
            {items.map((item) => (
              <VideoItem key={item.id} $aspectRatio={aspectRatio}>
                <StyledHLSPlayer
                  $aspectRatio={aspectRatio}
                  src={item.video.url}
                  title={item.video.title}
                  poster={urlFor(item.video.thumbnail)
                    .width(width)
                    .height(height)
                    .focalPoint(item.video.thumbnail.hotspot?.x || 0, item.video.thumbnail.hotspot?.y || 0)
                    .crop('focalpoint')
                    .fit('crop')
                    .url()}
                  playButton
                  playsInline
                />
                <StyledHeading size="lg" level="h3" value={item.title} />
              </VideoItem>
            ))}
          </Wrapper>
        </div>
      </Container>
    </BackgroundContainer>
  )
}

export default VideoPlayer
