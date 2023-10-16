import { pushToDataLayer } from '../../lib/gtm'
import { useEffect, useMemo, useCallback } from 'react'

type GTMTitleType = { videoTitle: string | undefined }
type VideoRefType = React.RefObject<HTMLVideoElement>

const GTM_PLAY_EVENT = 'video_play'
const GTM_PAUSE_EVENT = 'video_pause'

const useVideoAnalytics = (videoRef: VideoRefType, src: string, title?: string): void => {
  const GTM_TITLE: GTMTitleType = useMemo(() => ({ videoTitle: title || src }), [title, src])

  const handlePlayEvent = useCallback(() => {
    pushToDataLayer(GTM_PLAY_EVENT, GTM_TITLE)
  }, [GTM_TITLE])

  const handlePauseEvent = useCallback(() => {
    pushToDataLayer(GTM_PAUSE_EVENT, GTM_TITLE)
  }, [GTM_TITLE])

  useEffect(() => {
    const videoElement = videoRef.current

    if (!videoElement) return

    videoElement.addEventListener('play', handlePlayEvent)
    videoElement.addEventListener('pause', handlePauseEvent)

    // Clean up event listeners on unmount
    return () => {
      videoElement.removeEventListener('play', handlePlayEvent)
      videoElement.removeEventListener('pause', handlePauseEvent)
    }
  }, [videoRef, handlePlayEvent, handlePauseEvent])
}

export default useVideoAnalytics
