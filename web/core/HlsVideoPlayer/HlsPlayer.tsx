'use client'
import Hls from 'hls.js'
import { useEffect, useMemo, useRef, useState } from 'react'
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
  const [error, setError] = useState<boolean>(false)
  const [errorText, setErrorText] = useState<string | null>(null)

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
      hls.on(Hls.Events.MEDIA_ATTACHED, function () {
        console.log('autoplay with muted')
        /*         if (autoPlay) {
          video.muted = true
          video.play()
        } */
      })
      // eslint-disable-next-line import/no-named-as-default-member
      hls.on(Hls.Events.ERROR, (_event, data) => {
        if (data.fatal) {
          setError(true)
          console.log(`Stream error: ${data.details}`)
        }
      })
      return () => {
        hls.destroy()
      }
      //@ts-ignore:todo
    } else if (video?.canPlayType('application/vnd.apple.mpegurl')) {
      // Safari native HLS support
      //@ts-ignore:todo
      video.src = memoSrc
    } else {
      setError(true)
      setErrorText('Live streaming not supported in this browser')
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      {error && <div className="text-red-500">Error: {errorText}</div>}
      {/* eslint-disable-next-line jsx-a11y/media-has-caption*/}
      <video
        ref={videoRef}
        {...videoProps}
        className={envisTwMerge(`w-full h-full object-cover absolute inset-0`, className)}
      />
    </>
  )
}
