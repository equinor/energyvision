/* eslint-disable jsx-a11y/media-has-caption */
import styled from 'styled-components'
import {
  VideoControlsType,
  VideoPlayerData,
  VideoPlayerRatios,
  VideoType,
  VideoDesignOptionsType,
} from '../../types/types'
import { BackgroundContainer, HLSPlayer } from '@components'
import TitleText from '../shared/portableText/TitleText'
import { urlFor } from '../../common/helpers'
import IngressText from './portableText/IngressText'
import { ButtonLink } from './ButtonLink'

const StyledHeading = styled(TitleText)`
  padding: 0 0 var(--space-large) 0;
  text-align: left;
`

const Container = styled.div`
  padding: var(--space-3xLarge) var(--layout-paddingHorizontal-large);
  max-width: var(--maxViewportWidth);
  margin: auto;
`

const StyledFigure = styled.figure<{ $allowFullScreen?: boolean; $aspectRatio?: string; $height?: number }>`
  margin: 0 auto;
  video::-webkit-media-controls-fullscreen-button {
    ${({ $allowFullScreen }) =>
      !$allowFullScreen && {
        display: 'none',
      }}
  }

  ${({ $aspectRatio, $height }) => {
    if (!$height) {
      switch ($aspectRatio) {
        case VideoPlayerRatios['1:1']:
          return {
            height: '320px',
            width: '320px',
            '@media (min-width: 375px)': {
              height: '350px',
              width: '350px',
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

const Ingress = styled.div`
  margin-bottom: var(--space-large);
`

const ButtonWrapper = styled.div`
  margin-bottom: var(--space-xLarge);
`

const StyledHLSPlayer = styled(HLSPlayer)`
  object-fit: cover;
  width: inherit;

  :fullscreen {
    object-fit: contain;
  }
`

const getThumbnailRatio = (aspectRatio: string, height?: number) => {
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

type HLSVideoComponentType = {
  video: VideoType
  videoControls: VideoControlsType
  designOptions: VideoDesignOptionsType
}

export const HLSVideoComponent = ({ video, videoControls, designOptions }: HLSVideoComponentType) => {
  const { width: w, height: h } = getThumbnailRatio(designOptions.aspectRatio)

  return (
    <StyledFigure
      $allowFullScreen={videoControls?.allowFullScreen || true}
      $aspectRatio={designOptions.aspectRatio}
      $height={designOptions.height}
    >
      <StyledHLSPlayer
        src={video.url}
        title={video.title}
        poster={urlFor(video.thumbnail).width(w).height(h).url()}
        playsInline
        {...videoControls}
      />
    </StyledFigure>
  )
}

const VideoPlayer = ({ anchor, data }: { data: VideoPlayerData; anchor?: string }) => {
  const { title, ingress, action, video, videoControls, designOptions } = data
  const { background } = designOptions

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
        <HLSVideoComponent video={video} designOptions={designOptions} videoControls={videoControls} />
      </Container>
    </BackgroundContainer>
  )
}

export default VideoPlayer
