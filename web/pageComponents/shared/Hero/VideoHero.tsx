import '@mux/mux-video'
import { VideoHeroData } from '../../../types/types'

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

export const VideoHero = ({ video }: { video?: VideoHeroData }) => {
  if (!video?.playbackId) return <div>Missing video playbackId</div>
  return <mux-video stream-type="on-demand" playback-id={video.playbackId} controls style={{ width: '100%' }} />
}
