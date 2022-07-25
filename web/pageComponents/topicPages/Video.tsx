/* eslint-disable @typescript-eslint/no-namespace*/
import { VideoData } from '../../types/types'
import { BackgroundContainer } from '@components'
import styled from 'styled-components'
import IngressText from '../../pageComponents/shared/portableText/IngressText'
import TitleText from '../../pageComponents/shared/portableText/TitleText'
import '@mux/mux-video';

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
interface MuxVideoHTMLAttributes<T> extends React.VideoHTMLAttributes<T> {
  debug?: boolean;
  autoplay?: boolean;
}


declare global {
  namespace JSX {
    interface IntrinsicElements {
      'mux-video': React.DetailedHTMLProps<MuxVideoHTMLAttributes<HTMLVideoElement>, HTMLVideoElement>;
    }
  }
}

const Video = ({ data, anchor }: VideoProps) => {
  const { asset, designOptions, title, ingress } = data
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
           <mux-video
           stream-type="on-demand"
           playback-id={asset.playbackId}
           controls
           style={{width:'100%'}}
         />
          }
        </Container>
      </BackgroundContainer>
    </>
  )
}

export default Video
