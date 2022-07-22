import { VideoData } from '../../types/types'
import { BackgroundContainer } from '@components'
import styled from 'styled-components'
import IngressText from '../../pageComponents/shared/portableText/IngressText'
import TitleText from '../../pageComponents/shared/portableText/TitleText'
import MuxVideo from '@mux/mux-video-react';

type VideoProps = {
  data: VideoData
  anchor?: string
}
const Container = styled.div`
  padding: var(--space-3xLarge) var(--layout-paddingHorizontal-large);
  max-width: var(--maxViewportWidth);
  margin: auto;
`
const StyledIngress = styled.div`
  padding: 0 0 var(--space-medium);
`
const StyledTitle = styled(TitleText)`
  margin-bottom: var(--space-xLarge);
`

const Video = ({ data, anchor }: VideoProps) => {
  const { asset, designOptions, title, ingress } = data
  const playbackId = asset.playbackId

  return (
    <>
      <BackgroundContainer background={designOptions.background} id={anchor}>
        <Container>
          {title && <StyledTitle value={title} />}
          {ingress && (
            <StyledIngress>
              <IngressText value={ingress} />
            </StyledIngress>
          )}
          {
            <MuxVideo
              streamType="on-demand"
              playbackId={playbackId}
              controls
              style={{ height: '100%', width: '100%' }}
            />
          }
        </Container>
      </BackgroundContainer>
    </>
  )
}

export default Video
