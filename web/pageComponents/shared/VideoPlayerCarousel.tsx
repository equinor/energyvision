import styled from 'styled-components'
import { VideoPlayerCarouselData, VideoPlayerRatios } from '../../types/types'
import { BackgroundContainer } from '@components'
import TitleText from './portableText/TitleText'
import { HLSVideoComponent } from './VideoPlayer'
import { Carousel } from './Carousel'

const StyledHeading = styled(TitleText)`
  padding: var(
    --iframe-innerPadding,
    var(--space-xxLarge) var(--layout-paddingHorizontal-large) 0 var(--layout-paddingHorizontal-large)
  );
  margin-bottom: calc(-1 * var(--space-small));
  text-align: var(--iframe-titleAlign, left);
`

const Container = styled.div`
  padding: var(--iframe-innerPadding, var(--space-xLarge) 0);
  max-width: var(--iframe-maxWidth, var(--maxViewportWidth));
  margin: auto;
`

const HeadingWrapper = styled.div`
  max-width: var(--iframe-maxWidth, var(--maxViewportWidth));
  margin: auto;
`

const VideoItem = styled.div<{ $aspectRatio: string }>`
  height: 100%;
  display: flex;
  flex-direction: column;
  ${({ $aspectRatio }) => ($aspectRatio === VideoPlayerRatios['16:9'] ? { minWidth: '90%' } : { minWidth: 'auto' })};

  h3 {
    padding: var(--space-medium) var(--space-small);
  }
`

const VideoPlayer = ({ anchor, data }: { data: VideoPlayerCarouselData; anchor?: string }) => {
  const { title, items, designOptions } = data
  const { background, aspectRatio } = designOptions

  return (
    <BackgroundContainer background={background} id={anchor}>
      <HeadingWrapper>{title && <StyledHeading value={title} />}</HeadingWrapper>
      <Container>
        <Carousel>
          {items.map((item) => (
            <VideoItem key={item.id} $aspectRatio={aspectRatio}>
              <HLSVideoComponent
                video={item.video}
                designOptions={designOptions}
                videoControls={{
                  playButton: true,
                }}
              />
              <StyledHeading size="lg" level="h3" value={item.title} />
            </VideoItem>
          ))}
        </Carousel>
      </Container>
    </BackgroundContainer>
  )
}

export default VideoPlayer
