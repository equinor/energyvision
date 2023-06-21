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

export const StyledHLSPlayer = styled(HLSPlayer)<{ $aspectRatio: string }>`
  object-fit: cover;

  ${({ $aspectRatio }) => {
    switch ($aspectRatio) {
      case VideoPlayerRatios['2:1']:
        return {
          height: '50%',
          width: '100%',
        }
      case VideoPlayerRatios['narrow']:
        return {
          height: '25%',
          width: '100%',
        }
      case VideoPlayerRatios['fullscreen']:
        return {
          height: '100vh',
          width: '100%',
        }
    }
  }}}
`

const FullWidthVideo = ({ anchor, data }: { data: FullWidthVideoData; anchor?: string }) => {
  const { video, designOptions, spacing } = data
  const { background, aspectRatio } = designOptions
  return (
    <BackgroundContainer background={background} id={anchor}>
      <Container style={spacing ? { marginTop: '50px', marginBottom: '50px' } : {}}>
        <StyledFigure>
          <StyledHLSPlayer
            $aspectRatio={aspectRatio}
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
