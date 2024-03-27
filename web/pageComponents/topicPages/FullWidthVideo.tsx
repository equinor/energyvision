import { FullWidthVideoData, FullWidthVideoRatio } from '../../types/types'
import styled from 'styled-components'
import { BackgroundContainer } from '@components'
import { HLSPlayer } from '../../components/src/HLSPlayer'
import { VideoJS } from '../../components/src/VideoJsPlayer'
import dynamic from 'next/dynamic'

const DynamicHLSVideoComponent = dynamic<React.ComponentProps<typeof VideoJS>>(
  () => import('../../components/src/VideoJsPlayer').then((mod) => mod.VideoJS),
  {
    ssr: false,
    loading: () => <p>Loading...</p>,
  },
)

const Container = styled.div<{ $aspectRatio: FullWidthVideoRatio }>`
  position: relative;
  width: 100%;
  ${({ $aspectRatio }) => {
    switch ($aspectRatio) {
      case 'fullScreen':
        return 'height: 100vh;'
      case 'narrow':
        return `
          padding-bottom: 75%;
          @media(min-width: 750px) {
            padding-bottom: 30%;
          }
        `
      case '2:1':
        return 'padding-bottom: 50%;'
      default:
        return 'padding-bottom: 50%;'
    }
  }}
`

const StyledFigure = styled.figure`
  justify-content: center;
  display: flex;
  margin: 0;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  position: absolute;
`

const StyledHLSPlayer = styled(DynamicHLSVideoComponent)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  video {
    object-fit: cover;
  }
`

const FullWidthVideo = ({ anchor, data }: { data: FullWidthVideoData; anchor?: string }) => {
  const { video, designOptions, spacing } = data
  const { background, aspectRatio } = designOptions
  return (
    <BackgroundContainer background={background} id={anchor}>
      <Container $aspectRatio={aspectRatio} style={spacing ? { marginTop: '50px', marginBottom: '50px' } : {}}>
        <StyledFigure>
          <StyledHLSPlayer title={video.title} autoPlay muted loop src={video.url} />
        </StyledFigure>
      </Container>
    </BackgroundContainer>
  )
}

export default FullWidthVideo
