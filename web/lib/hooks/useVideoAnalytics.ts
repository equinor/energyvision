import useConsentState from './useConsentState'
import { pushToDataLayer } from '../../lib/gtm'
import { useEffect, useCallback, useState, RefObject } from 'react'

const GTM_PLAY_EVENT = 'video_play'
const GTM_PAUSE_EVENT = 'video_pause'
const GTM_COMPLETION_EVENT = 'video_completion'
const GTM_PROGRESS_MILESTONES = [25, 50, 75, 90] // Percentages

type VideoRefType = RefObject<HTMLVideoElement>
type EventType = typeof GTM_PLAY_EVENT | typeof GTM_PAUSE_EVENT | typeof GTM_COMPLETION_EVENT | string

type EventData = {
  eventType: EventType
  videoTitle: string
  currentTime: number
  src: string
  videoType?: string
}

// Video Analytics Hook
const useVideoAnalytics = (videoRef: VideoRefType, src: string, title?: string): void => {
  const [allowAnalytics, setAllowAnalytics] = useState(false)
  useConsentState(
    'statistics',
    () => setAllowAnalytics(true),
    () => setAllowAnalytics(false),
  )

  const pushEventToDataLayer = useCallback(
    (eventType: EventType, videoElement: HTMLVideoElement) => {
      const eventData: EventData = {
        eventType,
        videoTitle: title || src,
        videoType: videoElement.loop ? 'loop' : undefined,
        currentTime: videoElement.currentTime,
        src,
      }
      pushToDataLayer('video_event', eventData)
    },
    [title, src],
  )

  usePlayEvent(videoRef, pushEventToDataLayer, allowAnalytics)
  usePauseEvent(videoRef, pushEventToDataLayer, allowAnalytics)
  useCompletionEvent(videoRef, pushEventToDataLayer, allowAnalytics)
  useCompletionEventForLoopingVideos(videoRef, pushEventToDataLayer, allowAnalytics)
  useVideoProgressEvent(videoRef, pushEventToDataLayer, allowAnalytics)
}

const usePlayEvent = (
  videoRef: VideoRefType,
  pushEvent: (eventType: EventType, videoElement: HTMLVideoElement) => void,
  allowAnalytics: boolean,
) => {
  useEffect(() => {
    const videoElement = videoRef.current
    if (!videoElement) return

    const handlePlay = () => {
      if (allowAnalytics) {
        pushEvent(GTM_PLAY_EVENT, videoElement)
      }
    }
    videoElement.addEventListener('play', handlePlay)

    return () => videoElement.removeEventListener('play', handlePlay)
  }, [videoRef, pushEvent, allowAnalytics])
}

const usePauseEvent = (
  videoRef: VideoRefType,
  pushEvent: (eventType: EventType, videoElement: HTMLVideoElement) => void,
  allowAnalytics: boolean,
) => {
  useEffect(() => {
    const videoElement = videoRef.current
    if (!videoElement) return

    const handlePause = () => {
      const isVideoEnded = videoElement.currentTime >= videoElement.duration
      if (!isVideoEnded && allowAnalytics) {
        pushEvent(GTM_PAUSE_EVENT, videoElement)
      }
    }
    videoElement.addEventListener('pause', handlePause)

    return () => videoElement.removeEventListener('pause', handlePause)
  }, [videoRef, pushEvent, allowAnalytics])
}

const useCompletionEvent = (
  videoRef: VideoRefType,
  pushEvent: (eventType: EventType, videoElement: HTMLVideoElement) => void,
  allowAnalytics: boolean,
) => {
  useEffect(() => {
    const videoElement = videoRef.current
    if (!videoElement) return

    const handleCompletion = () => {
      if (allowAnalytics) {
        pushEvent(GTM_COMPLETION_EVENT, videoElement)
      }
    }
    videoElement.addEventListener('ended', handleCompletion)

    return () => videoElement.removeEventListener('ended', handleCompletion)
  }, [videoRef, pushEvent, allowAnalytics])
}

// Looping videos do not trigger 'ended' event listener
// This hook triggers completion when the video is about to loop
const useCompletionEventForLoopingVideos = (
  videoRef: VideoRefType,
  pushEvent: (eventType: EventType, videoElement: HTMLVideoElement) => void,
  allowAnalytics: boolean,
) => {
  const [hasTriggered, setHasTriggered] = useState(false)

  useEffect(() => {
    const videoElement = videoRef.current
    if (!videoElement || !videoElement.loop || !allowAnalytics || hasTriggered) return

    const threshold = 1 // Threshold in seconds to determine "near end"
    const handleTimeUpdate = () => {
      const timeLeft = videoElement.duration - videoElement.currentTime
      const nearEnd = timeLeft < threshold

      if (nearEnd && !hasTriggered) {
        pushEvent(GTM_COMPLETION_EVENT, videoElement)
        setHasTriggered(true) // Prevent further triggers
      }
    }

    videoElement.addEventListener('timeupdate', handleTimeUpdate)

    return () => videoElement.removeEventListener('timeupdate', handleTimeUpdate)
  }, [videoRef, pushEvent, allowAnalytics, hasTriggered])
}

const useVideoProgressEvent = (
  videoRef: VideoRefType,
  pushEvent: (eventType: EventType, videoElement: HTMLVideoElement) => void,
  allowAnalytics: boolean,
) => {
  const [trackedMilestones, setTrackedMilestones] = useState<number[]>([])
  const intervalDuration = 1000 // Check every second

  useEffect(() => {
    const videoElement = videoRef.current
    if (!videoElement) return

    const intervalId = setInterval(() => {
      if (!allowAnalytics || !videoElement.duration) return

      const progress = (videoElement.currentTime / videoElement.duration) * 100
      GTM_PROGRESS_MILESTONES.forEach((milestone) => {
        if (progress >= milestone && !trackedMilestones.includes(milestone)) {
          pushEvent(`video_progress_${milestone}`, videoElement)
          setTrackedMilestones((prev) => [...prev, milestone])
        }
      })
    }, intervalDuration)

    const handlePlay = () => {
      if (videoElement.currentTime === 0 && !videoElement.loop) {
        setTrackedMilestones([]) // Reset milestones at the start of a new play session
      }
    }

    videoElement.addEventListener('play', handlePlay)

    return () => {
      clearInterval(intervalId)
      videoElement.removeEventListener('play', handlePlay)
    }
  }, [videoRef, pushEvent, allowAnalytics, trackedMilestones])
}

export default useVideoAnalytics
