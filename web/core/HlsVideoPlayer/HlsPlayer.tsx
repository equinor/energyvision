'use client'
import Hls from 'hls.js'
import { useEffect, useMemo, useRef } from 'react'
import envisTwMerge from '../../twMerge'

export const HlsPlayer = ({
  src,
  videoProps,
  className = '',
}: {
  src: string
  videoProps: any
  className?: string
}) => {
  const videoRef = useRef(null)
  const hlsRef = useRef<Hls | null>(null)

  const memoSrc = useMemo(() => {
    return src
  }, [src])

  useEffect(() => {
    const video = videoRef.current
    if (Hls.isSupported() && video) {
      const hls = new Hls()
      hlsRef.current = hls
      // Load the live playlist
      hls.loadSource(memoSrc)
      hls.attachMedia(video)
      // eslint-disable-next-line import/no-named-as-default-member
      hls.on(Hls.Events.ERROR, (_event, data) => {
        if (data.fatal) {
          console.log(`Stream error: ${data.details}`)
        }
      })

      //@ts-expect-error:todo
    } else if (video?.canPlayType('application/vnd.apple.mpegurl')) {
      // Safari native HLS support
      //@ts-expect-error:todo
      video.src = memoSrc
    } else {
      console.log('Live streaming not supported in this browser')
    }
    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy() // Crucial step to stop hls.js activity
      }
    }
  })

  return (
    <>
      {/* eslint-disable-next-line jsx-a11y/media-has-caption*/}
      <video
        ref={videoRef}
        {...videoProps}
        className={envisTwMerge(`w-full h-full object-cover absolute inset-0`, className)}
      />
    </>
  )
}
