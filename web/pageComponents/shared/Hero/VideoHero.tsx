import styled from 'styled-components'
import { PortableTextBlock } from '@portabletext/types'
import TitleText from '../portableText/TitleText'
import '@mux/mux-video'

type VideoProps = {
  videoHero: {
    playbackId: string
  }
  title: PortableTextBlock[]
}

const TitleWrapper = styled.div`
  padding: var(--space-xLarge) var(--layout-paddingHorizontal-large) 0 var(--layout-paddingHorizontal-large);
`
const StyledHeading = styled(TitleText)`
  max-width: 1186px; /* 1920 - (2 * 367) */
  margin-left: auto;
  margin-right: auto;
`
interface MuxVideoHTMLAttributes<T> extends React.VideoHTMLAttributes<T> {
  debug?: boolean
  autoplay?: boolean
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      'mux-video': React.DetailedHTMLProps<MuxVideoHTMLAttributes<HTMLVideoElement>, HTMLVideoElement>
    }
  }
}

export const VideoHero = ({ videoHero, title }: VideoProps) => {
  return (
    <>
      <mux-video stream-type="on-demand" playback-id={videoHero?.playbackId} controls style={{ width: '100%' }} />
      <TitleWrapper>{title && <StyledHeading value={title} level="h1" size="2xl" />}</TitleWrapper>
    </>
  )
}
