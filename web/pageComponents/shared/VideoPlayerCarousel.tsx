import styled from 'styled-components'
import type { VideoPlayerCarouselData } from '../../types/types'
import { BackgroundContainer, HLSPlayer } from '@components'
import TitleText from './portableText/TitleText'
import { urlFor } from '../../common/helpers'
import IngressText from './portableText/IngressText'
import { ButtonLink } from './ButtonLink'
import { StyledHLSPlayer } from './VideoPlayer'
import { Icon } from '@equinor/eds-core-react'
import { chevron_left, chevron_right } from '@equinor/eds-icons'
import { useRef, useState } from 'react'
import { BackgroundColours } from '../../types/types'
import { usePrefersReducedMotion } from '../../common/hooks/usePrefersReducedMotion'

const StyledHeading = styled(TitleText)`
  padding: var(--iframe-titlePadding, 0 0 var(--space-large) 0);
  text-align: var(--iframe-titleAlign, left);
`

const Container = styled.div`
  padding: var(--iframe-innerPadding, var(--space-xxLarge) var(--layout-paddingHorizontal-large));
  max-width: var(--iframe-maxWidth, var(--maxViewportWidth));
  margin: auto;
`

const StyledButton = styled.button`
  position: absolute;
  margin-top: auto;
  margin-bottom: auto;
  top: 0;
  bottom: var(--space-64);
  z-index: 100;
  height: min-content;
  background: none;
  border: none;
  cursor: pointer;
`

const StyledLeftButton = styled(StyledButton)`
  left: 0;
  margin-left: calc(-1 * var(--space-3xLarge));
  @media (min-width: 700px) {
    margin-left: calc(-1 * var(--space-4xLarge));
  }
`

const StyledRightButton = styled(StyledButton)`
  right: 0;
  margin-right: calc(-1 * var(--space-3xLarge));
  @media (min-width: 700px) {
    margin-right: calc(-1 * var(--space-4xLarge));
  }
`

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  overflow-x: auto;
  gap: var(--space-medium);
  padding-bottom: var(--space-small);
  ::-webkit-scrollbar {
    height: 5px;
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

  const handleScroll = (scrollType: string) => {
    const container = scrollRef.current
    if (container) {
      container.scrollBy({
        left: scrollType === 'forward' ? 400 : -400,
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
      })
    }
  }

  let width: number, height: number

  if (aspectRatio === '16:9') {
    width = 920
    height = 518
  } else if (aspectRatio === '9:16') {
    width = 336
    height = 600
  } else {
    width = 600
    height = 600
  }

  return (
    <BackgroundContainer background={background} id={anchor}>
      <Container>
        {title && <StyledHeading value={title} />}
        <div style={{ position: 'relative' }}>
          <Wrapper ref={scrollRef}>
            <StyledLeftButton onClick={() => handleScroll('back')}>
              <Icon size={48} color={background === 'Slate Blue' ? 'white' : 'inherit'} data={chevron_left} />
            </StyledLeftButton>
            <StyledRightButton onClick={() => handleScroll('forward')}>
              <Icon size={48} color={background === 'Slate Blue' ? 'white' : 'inherit'} data={chevron_right} />
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
