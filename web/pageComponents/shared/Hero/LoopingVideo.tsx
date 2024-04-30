import { useSanityLoader } from '../../../lib/hooks/useSanityLoader'
import styled from 'styled-components'
import { LoopingVideoData, LoopingVideoRatio } from '../../../types'
import dynamic from 'next/dynamic'
import { VideoJS } from '@components/VideoJsPlayer'

const DEFAULT_MAX_WIDTH = 1920

const DynamicVideoJsComponent = dynamic<React.ComponentProps<typeof VideoJS>>(
  () => import('../../../components/src/VideoJsPlayer').then((mod) => mod.VideoJS),
  {
    ssr: false,
    loading: () => <p>Loading...</p>,
  },
)

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

export const LoopingVideo = ({ video }: { video: LoopingVideoData }) => {
  const { title, url, thumbnail, ratio } = video
  const thumbnailURL = useSanityLoader(thumbnail, DEFAULT_MAX_WIDTH, undefined)
  return (
    <Container $aspectRatio={ratio}>
      <StyledFigure>
        <StyledPlayer
          loop
          muted
          autoPlay
          title={title}
          poster={thumbnailURL.src}
          src={url}
          videoDescription={thumbnail.alt}
        />
      </StyledFigure>
    </Container>
  )
}
