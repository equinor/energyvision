import { pushToDataLayer } from '../../lib/gtm'
import { useEffect, useMemo, useCallback, useState } from 'react'
import useConsentState from './useConsentState'

type GTMTitleType = { videoTitle: string | undefined }
type VideoRefType = React.RefObject<HTMLVideoElement>

const GTM_PLAY_EVENT = 'video_play'
const GTM_PAUSE_EVENT = 'video_pause'

const useVideoAnalytics = (videoRef: VideoRefType, src: string, title?: string): void => {
  const [allowAnalytics, setAllowAnalytics] = useState(false)

  useConsentState(
    'statistics',
    () => setAllowAnalytics(true),
    () => setAllowAnalytics(false),
  )

  const GTM_TITLE: GTMTitleType = useMemo(() => ({ videoTitle: title || src }), [title, src])

  const handlePlayEvent = useCallback(() => {
    pushToDataLayer(GTM_PLAY_EVENT, GTM_TITLE)
  }, [GTM_TITLE])

  const handlePauseEvent = useCallback(() => {
    pushToDataLayer(GTM_PAUSE_EVENT, GTM_TITLE)
  }, [GTM_TITLE])

  useEffect(() => {
    const videoElement = videoRef.current

    if (!videoElement || !allowAnalytics) return

    videoElement.addEventListener('play', handlePlayEvent)
    videoElement.addEventListener('pause', handlePauseEvent)

    // Clean up event listeners on unmount
    return () => {
      videoElement.removeEventListener('play', handlePlayEvent)
      videoElement.removeEventListener('pause', handlePauseEvent)
    }
  }, [allowAnalytics, videoRef, handlePlayEvent, handlePauseEvent])
}

export default useVideoAnalytics
