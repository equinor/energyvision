import styled from 'styled-components'
import type { VideoPlayerCarouselData } from '../../types/types'
import { BackgroundContainer } from '@components'
import TitleText from './portableText/TitleText'
import { urlFor } from '../../common/helpers'
import { StyledHLSPlayer } from './VideoPlayer'
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
  padding: var(--iframe-innerPadding, var(--space-xxLarge) var(--layout-paddingHorizontal-medium));
  max-width: var(--iframe-maxWidth, var(--maxViewportWidth));
  margin: auto;
`

const VideoItem = styled.div<{ $aspectRatio: string }>`
  display: flex;
  flex-direction: column;
  ${({ $aspectRatio }) => ($aspectRatio === '16:9' ? { minWidth: '90%' } : { minWidth: 'auto' })};

  h3 {
    padding: var(--space-medium) var(--space-small);
  }
`

const VideoPlayer = ({ anchor, data }: { data: VideoPlayerCarouselData; anchor?: string }) => {
  const { title, items, designOptions } = data
  const { background, aspectRatio } = designOptions

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

  return (
    <BackgroundContainer background={background} id={anchor}>
      {title && <StyledHeading value={title} />}
      <Container>
        <Carousel>
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
        </Carousel>
      </Container>
    </BackgroundContainer>
  )
}

export default VideoPlayer
