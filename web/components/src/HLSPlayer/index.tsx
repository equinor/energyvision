/* eslint-disable import/no-named-as-default-member */
/* eslint-disable jsx-a11y/media-has-caption */
import { useRef, HTMLProps, useEffect, useState, useCallback } from 'react'
import styled from 'styled-components'
import Hls from 'hls.js'
import { Icon } from '@equinor/eds-core-react'
import { play_circle, pause_circle } from '@equinor/eds-icons'
import useVideoAnalytics from '../../../lib/hooks/useVideoAnalytics'

type HLSProps = Omit<HTMLProps<HTMLVideoElement>, 'src'> & {
  src: string
  playButton?: boolean
}

const Wrapper = styled.div<{ $showSpinner: boolean }>`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;

  video::-webkit-media-controls {
    visibility: ${({ $showSpinner }) => ($showSpinner ? 'visible' : 'hidden')};
  }

  video::-webkit-media-controls-enclosure {
    visibility: visible;
  }
`

const StyledButton = styled.button`
  position: absolute;
  margin: auto;
  z-index: 1;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background: none;
  border: none;
  cursor: pointer;
`

const SmallStyledButton = styled.button`
  position: absolute;
  margin: auto;
  z-index: 1;
  bottom: 0;
  right: 0;
  background: none;
  border: none;
  cursor: pointer;
  opacity: 0.4;
  color: white;
  &:hover {
    opacity: 0.6;
  }

  @media (min-width: 767px) {
    svg {
      height: 32px;
      width: 32px;
    }
  }
`

export const HLSPlayer: React.FC<HLSProps> = ({
  src,
  controls = false,
  playButton = false,
  autoPlay = false,
  ...props
}) => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [showPlayButton, setShowPlayButton] = useState(playButton)
  const [showControls, setShowControls] = useState(controls)
  const [showSpinner, setShowSpinner] = useState(autoPlay)
  const [isPlaying, setIsPlaying] = useState(autoPlay)
  const hlsRef = useRef<Hls | null>(null)

  useVideoAnalytics(videoRef, src, props.title)

  const handlePlayButton = useCallback(() => {
    if (videoRef.current && hlsRef.current) {
      if (videoRef.current.paused) {
        hlsRef.current.startLoad()
        setShowSpinner(true)
        videoRef.current.play()
        setShowPlayButton(false)
        setShowControls(true)
        setIsPlaying(true)
      } else {
        videoRef.current.pause()
        setIsPlaying(false)
      }
    }
  }, [])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    if (Hls.isSupported()) {
      const hls = new Hls({
        autoStartLoad: autoPlay, // This ensures video is not loaded automatically
      })
      hlsRef.current = hls

      hls.on(Hls.Events.ERROR, (_, data) => {
        if (data.fatal) {
          switch (data.type) {
            case Hls.ErrorTypes.NETWORK_ERROR:
              // try to recover network error
              console.error('Network error encountered', data)
              break
            case Hls.ErrorTypes.MEDIA_ERROR:
              console.error('Media error encountered', data)
              break
            default:
              // cannot recover
              console.error('Unrecoverable error encountered', data)
              hls.destroy()
              break
          }
        }
      })

      hls.loadSource(src)
      hls.attachMedia(video)
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = src
    }

    // Add play event listener
    const handlePlayEvent = () => {
      if (hlsRef.current) {
        hlsRef.current.startLoad()
        setShowSpinner(true)
      }
    }

    video.addEventListener('play', handlePlayEvent)

    return () => {
      if (video) {
        video.removeEventListener('play', handlePlayEvent)
        video.removeAttribute('src')
      }
      if (hlsRef.current) {
        hlsRef.current.destroy()
      }
    }
  }, [autoPlay, src])

  useEffect(() => {
    playButton && setShowControls(false)
  }, [playButton])

  return (
    <Wrapper $showSpinner={showSpinner}>
      <video
        playsInline
        ref={videoRef}
        autoPlay={playButton ? false : autoPlay}
        controls={autoPlay ? false : showControls || controls}
        {...props}
      />
      {showPlayButton && (
        <StyledButton onClick={handlePlayButton} aria-label={isPlaying ? 'Pause' : 'Play'}>
          <Icon
            size={48}
            color="white"
            style={{ opacity: 0.8 }}
            data={play_circle}
            aria-label={isPlaying ? 'Pause icon' : 'Play icon'}
          />
        </StyledButton>
      )}
      {!showPlayButton && autoPlay && (
        <SmallStyledButton onClick={handlePlayButton} aria-label={isPlaying ? 'Pause' : 'Play'}>
          <Icon
            size={24}
            data={isPlaying ? pause_circle : play_circle}
            aria-label={isPlaying ? 'Pause icon' : 'Play icon'}
          />
        </SmallStyledButton>
      )}
    </Wrapper>
  )
}
