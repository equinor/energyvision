/* eslint-disable import/no-named-as-default-member */
/* eslint-disable jsx-a11y/media-has-caption */
import { useRef, HTMLProps, useEffect, useState } from 'react'
import Hls from 'hls.js'
import { Icon } from '@equinor/eds-core-react'
import { play_circle } from '@equinor/eds-icons'
import styled from 'styled-components'

type Props = Omit<HTMLProps<HTMLVideoElement>, 'src'> & {
  src: string
  playButton?: boolean
}

const Wrapper = styled.div`
  position: relative;
  height: 100%;
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

export const HLSPlayer: React.FC<Props> = ({ src, controls = false, playButton = false, ...props }) => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const hlsRef = useRef<Hls | null>(null)
  const [showPlayButton, setShowPlayButton] = useState(playButton)
  const [showControls, setShowControls] = useState(controls)

  useEffect(() => {
    const video = videoRef.current
    if (video && Hls.isSupported()) {
      const hls = new Hls()
      hlsRef.current = hls

      hls.loadSource(src)
      hls.attachMedia(video)

      return () => {
        hls.destroy()
      }
    }
  }, [src])

  useEffect(() => {
    const hls = hlsRef.current
    if (hls) {
      hls.on(Hls.Events.ERROR, (_, data) => {
        console.error('Error', data)
      })
    }
  }, [])

  const handlePlayButton = () => {
    if (videoRef.current) videoRef.current.play()
    setShowPlayButton(false)
    setShowControls(true)
  }

  if (playButton)
    return (
      <Wrapper>
        <video ref={videoRef} controls={showControls} {...props} />
        {showPlayButton && (
          <StyledButton onClick={handlePlayButton}>
            <Icon size={48} color="white" data={play_circle} />
          </StyledButton>
        )}
      </Wrapper>
    )

  return <video ref={videoRef} controls={controls} {...props} />
}
