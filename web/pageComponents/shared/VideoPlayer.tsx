import styled from 'styled-components'
import { VideoPlayerData, VideoPlayerRatios } from '../../types/types'
import { BackgroundContainer, HLSPlayer } from '@components'
import TitleText from '../shared/portableText/TitleText'
import { urlFor } from '../../common/helpers'
import IngressText from './portableText/IngressText'
import { ButtonLink } from './ButtonLink'

const StyledHeading = styled(TitleText)`
  padding: var(--iframe-titlePadding, 0 0 var(--space-large) 0);
  text-align: var(--iframe-titleAlign, left);
`

const Container = styled.div`
  padding: var(--iframe-innerPadding, var(--space-3xLarge) var(--layout-paddingHorizontal-large));
  max-width: var(--iframe-maxWidth, var(--maxViewportWidth));
  margin: auto;
`

const StyledFigure = styled.figure<{ allowFullScreen: boolean }>`
  justify-content: center;
  display: flex;
  margin: 0;
  /* background-color: var(--grey-100); */
  background-color: transparent;
  video::-webkit-media-controls-fullscreen-button {
    ${({ allowFullScreen }) =>
      !allowFullScreen && {
        display: 'none',
      }}
  }
`

const Ingress = styled.div`
  margin-bottom: var(--space-large);
`

const ButtonWrapper = styled.div`
  margin-bottom: var(--space-xLarge);
`

export const StyledHLSPlayer = styled(HLSPlayer)<{ $aspectRatio: string; $height?: number }>`
  object-fit: cover;

  ${({ $aspectRatio, $height }) => {
    if (!$height) {
      switch ($aspectRatio) {
        case VideoPlayerRatios['1:1']:
          return {
            height: '320px',
            width: '320px',
            '@media (min-width: 375px)': {
              height: '375px',
              width: '375px',
            },
            '@media (min-width: 800px)': {
              height: '487px',
              width: '487px',
            },
            '@media (min-width: 1000px)': {
              height: '600px',
              width: '600px',
            },
          }
        case VideoPlayerRatios['16:9']:
          return {
            height: '56.25%',
            width: '100%',
          }
        case VideoPlayerRatios['9:16']:
          return {
            height: '569px',
            width: '320px',
            '@media (min-width: 375px)': {
              height: '600px',
              width: '337.5px',
            },
          }
      }
    }
    return {
      height: $height,
      width: '100%',
    }
  }}
`

export const getThumbnailRatio = (aspectRatio: string, height?: number) => {
  switch (aspectRatio) {
    case VideoPlayerRatios['16:9']:
      return {
        width: 1380,
        height: 777,
      }
    case VideoPlayerRatios['9:16']:
      return {
        width: 336,
        height: 600,
      }
    case VideoPlayerRatios['1:1']:
      return {
        width: 600,
        height: 600,
      }
    default:
      return {
        width: 0,
        height: height || 0,
      }
  }
}

const VideoPlayer = ({ anchor, data }: { data: VideoPlayerData; anchor?: string }) => {
  const { title, ingress, action, video, videoControls, designOptions } = data
  const { background, height, aspectRatio } = designOptions
  const { allowFullScreen, ...controls } = videoControls
  const { width: w, height: h } = getThumbnailRatio(aspectRatio)

  return (
    <BackgroundContainer background={background} id={anchor}>
      <Container>
        {title && <StyledHeading value={title} />}
        {ingress && (
          <Ingress>
            <IngressText value={ingress} />
          </Ingress>
        )}
        {action && action.label && (
          <ButtonWrapper>
            <ButtonLink action={action} />
          </ButtonWrapper>
        )}
        <StyledFigure allowFullScreen={allowFullScreen}>
          <StyledHLSPlayer
            $aspectRatio={aspectRatio}
            $height={height}
            src={video.url}
            title={video.title}
            poster={urlFor(video.thumbnail).width(w).height(h).url()}
            playsInline
            {...controls}
          />
        </StyledFigure>
      </Container>
    </BackgroundContainer>
  )
}

export default VideoPlayer
