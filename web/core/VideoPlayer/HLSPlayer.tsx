'use client'

import Hls from 'hls.js'
import { useEffect, useRef } from 'react'

export const HlsPlayer = ({ src, videoProps }: { src: any; videoProps: any }) => {
  const videoRef = useRef(null)

  useEffect(() => {
    const video = videoRef.current
    if (videoRef && video) {
      const hls = new Hls()
      hls.loadSource(src)
      hls.attachMedia(video)
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play()
      })
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      // Fallback for native HLS support (e.g., Safari on iOS/macOS)
      video.src = src
      video.addEventListener('loadedmetadata', () => {
        video.play()
      })
    }
  }, [src])

  return <video ref={videoRef} {...videoProps} />
}
