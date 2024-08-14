import { NextVideoPlayer } from '@core/VideoPlayer/VideoPlayer'
import { useSanityLoader } from '../../../lib/hooks/useSanityLoader'
import { LoopingVideoData, LoopingVideoRatio } from '../../../types'
import { Ratios } from '../SanityImage'

const DEFAULT_MAX_WIDTH = 1920

/* 
const Container = styled.div<{ $aspectRatio: LoopingVideoRatio }>`
  position: relative;
  ${({ $aspectRatio }) =>
    $aspectRatio === 'narrow'
      ? `
        padding-bottom: 75%;
        @media (min-width: 750px) {
          padding-bottom: 30%;
        }
      `
      : 'padding-bottom: 50%;'}
`

const StyledFigure = styled.figure`
  justify-content: center;
  display: flex;
  margin: 0;
  width: 100%;
  height: 100%;
  position: absolute;
`

const StyledPlayer = styled(DynamicVideoJsComponent)`
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  .vjs-poster img {
    object-fit: cover;
  }
`
 */
export const LoopingVideo = ({ video }: { video: LoopingVideoData }) => {
  const { title, url, thumbnail, ratio } = video
  const thumbnailURL = useSanityLoader(thumbnail, DEFAULT_MAX_WIDTH, Ratios.NINE_TO_SIXTEEN)
  return (
    <div className={`relative`}>
      <NextVideoPlayer loop muted autoPlay playButton={false} poster={thumbnailURL.src} src={url} />
    </div>

    /*     <Container $aspectRatio={ratio}>
      <StyledFigure>
        <StyledPlayer
          loop
          muted
          autoPlay
          playButton={false}
          title={title}
          poster={thumbnailURL.src}
          src={url}
          videoDescription={thumbnail.alt}
        />
      </StyledFigure>
    </Container> */
  )
}
