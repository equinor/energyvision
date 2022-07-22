import { VideoData } from '../../types/types'
import { BackgroundContainer } from '@components'
import styled from 'styled-components'
import IngressText from '../../pageComponents/shared/portableText/IngressText'
import TitleText from '../../pageComponents/shared/portableText/TitleText'
import { useEffect, useRef } from 'react'
import Hls from 'hls.js'

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
  const videoRef = useRef(null)
  const src = asset.url
  useEffect(() => {
    let hls: Hls | undefined = undefined
    if (videoRef.current) {
      const video: HTMLVideoElement = videoRef.current

      if (video.canPlayType('application/vnd.apple.mpegurl')) {
        // This will run in safari, where HLS is supported natively
        video.src = src
      } else if (Hls.isSupported()) {
        // This will run in all other modern browsers
        hls = new Hls()
        hls.loadSource(src)
        hls.attachMedia(video)
      }
    }

    return () => {
      if (hls) {
        hls.destroy()
      }
    }
  }, [videoRef, src])

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
            // eslint-disable-next-line jsx-a11y/media-has-caption
            <video controls ref={videoRef} style={{ width: '100%' }} />
          }
        </Container>
      </BackgroundContainer>
    </>
  )
}

export default Video
