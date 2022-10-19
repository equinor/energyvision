import '@mux/mux-video'

type VideoProps = {
  videoHero: {
    playbackId: string
  }
}

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

export const VideoHero = ({ videoHero }: VideoProps) => {
  return (
    <>
      <mux-video stream-type="on-demand" playback-id={videoHero?.playbackId} controls style={{ width: '100%' }} />
    </>
  )
}
