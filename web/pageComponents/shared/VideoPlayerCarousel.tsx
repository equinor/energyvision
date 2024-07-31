import styled from 'styled-components'
import { VideoPlayerCarouselData, VideoPlayerRatios } from '../../types/types'
import { BackgroundContainer } from '@components'
import TitleText from './portableText/TitleText'
import { VideoJsComponent } from './VideoPlayer'
import { Carousel } from './Carousel'
import { twMerge } from 'tailwind-merge'

const StyledHeading = styled(TitleText)`
  margin-bottom: calc(-1 * var(--space-small));
  text-align: left;
`

const Container = styled.div`
  padding: var(--space-xLarge) 0 0 0;
  max-width: var(--maxViewportWidth);
  margin: auto;
`

const HeadingWrapper = styled.div`
  max-width: var(--maxViewportWidth);
  margin: auto;
`

const VideoItem = styled.div<{ $aspectRatio: string }>`
  height: 100%;
  display: flex;
  position: relative;
  flex-direction: column;
  ${({ $aspectRatio }) => ($aspectRatio === VideoPlayerRatios['16:9'] ? { minWidth: '90%' } : { minWidth: 'auto' })};

  h3 {
    padding: var(--space-medium) var(--space-small);
  }
`

const VideoPlayer = ({
  anchor,
  data,
  className,
}: {
  data: VideoPlayerCarouselData
  anchor?: string
  className?: string
}) => {
  const { title, items, designOptions } = data
  const { background, aspectRatio } = designOptions

  return (
    <BackgroundContainer background={background} id={anchor} className={twMerge(`pb-page-content`, className)}>
      {title && (
        <HeadingWrapper>
          <StyledHeading value={title} className="px-layout-lg pb-2" />
        </HeadingWrapper>
      )}
      <Container>
        <Carousel>
          {items.map((item) => (
            <VideoItem key={item.id} $aspectRatio={aspectRatio}>
              <VideoJsComponent
                video={item.video}
                designOptions={designOptions}
                videoControls={{
                  playButton: true,
                  controls: true,
                }}
              />
              {item.title && <StyledHeading size="lg" level="h3" value={item.title} className="px-layout-lg" />}
            </VideoItem>
          ))}
        </Carousel>
      </Container>
    </BackgroundContainer>
  )
}

export default VideoPlayer
