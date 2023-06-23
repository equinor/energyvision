import { FullWidthVideoData, VideoPlayerRatios } from '../../types/types'
import styled from 'styled-components'
import { BackgroundContainer, HLSPlayer } from '@components'

const Container = styled.div`
  max-width: var(--iframe-maxWidth, var(--maxViewportWidth));
  margin: auto;
`

const StyledFigure = styled.figure`
  justify-content: center;
  display: flex;
  margin: 0;
  background-color: transparent;
`

interface StyledHLSPlayerProps {
  aspectRatio: VideoPlayerRatios
}

const StyledHLSPlayer = styled(HLSPlayer)<StyledHLSPlayerProps>`
  object-fit: cover;
  width: 100%;
  height: ${(props) => {
    switch (props.aspectRatio) {
      case VideoPlayerRatios.narrow:
        return '40vh'
      case VideoPlayerRatios.fullScreen:
        return '100vh'
      case VideoPlayerRatios['2:1']:
        return '50%'
      default:
        return '50%'
    }
  }};
`

const FullWidthVideo = ({ anchor, data }: { data: FullWidthVideoData; anchor?: string }) => {
  const { video, designOptions, spacing } = data
  const { background, aspectRatio } = designOptions
  return (
    <BackgroundContainer background={background} id={anchor}>
      <Container style={spacing ? { marginTop: '50px', marginBottom: '50px' } : {}}>
        <StyledFigure>
          <StyledHLSPlayer
            aspectRatio={aspectRatio}
            src={video.url}
            title={video.title}
            playsInline
            autoPlay
            muted
            loop
          />
        </StyledFigure>
      </Container>
    </BackgroundContainer>
  )
}

export default FullWidthVideo
