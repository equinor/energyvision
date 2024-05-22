import useConsentState from './useConsentState'
import { pushToDataLayer } from '../../lib/gtm'
import { useEffect, useCallback, useState } from 'react'
import Player from 'video.js/dist/types/player'

const GTM_PLAY_EVENT = 'video_play'
const GTM_PAUSE_EVENT = 'video_pause'
const GTM_COMPLETION_EVENT = 'video_completion'
const GTM_PROGRESS_MILESTONES = [25, 50, 75, 90] // Percentages

type EventType = typeof GTM_PLAY_EVENT | typeof GTM_PAUSE_EVENT | typeof GTM_COMPLETION_EVENT | string

type EventData = {
  eventType: EventType
  videoTitle: string
  currentTime: number
  src: string
  videoType?: string
}

// Video Analytics Hook
const useVideojsAnalytics = (player: Player | null, src: string, title?: string, autoPlay?: boolean): void => {
  const [allowAnalytics, setAllowAnalytics] = useState(false)

  useConsentState(
    'statistics',
    () => setAllowAnalytics(true),
    () => setAllowAnalytics(false),
  )

  const pushEventToDataLayer = useCallback(
    (eventType: EventType, player: Player) => {
      if (!autoPlay) {
        const eventData: EventData = {
          eventType,
          videoTitle: title || src,
          videoType: player.loop() ? 'loop' : undefined,
          currentTime: player.currentTime() || 0,
          src,
        }
        console.log('Pushing video_event')
        pushToDataLayer('video_event', eventData)
      }
    },
    [title, src, autoPlay],
  )

  usePlayEvent(player, pushEventToDataLayer, allowAnalytics)
  usePauseEvent(player, pushEventToDataLayer, allowAnalytics)
  useCompletionEvent(player, pushEventToDataLayer, allowAnalytics)
  useVideoProgressEvent(player, pushEventToDataLayer, allowAnalytics)
}

const usePlayEvent = (
  player: Player | null,
  pushEvent: (eventType: EventType, player: Player) => void,
  allowAnalytics: boolean,
) => {
  useEffect(() => {
    if (!player) return
    const handlePlay = () => {
      console.log('Play event' + allowAnalytics)
      if (allowAnalytics) {
        pushEvent(GTM_PLAY_EVENT, player)
      }
    }
    player.on('play', handlePlay)
    console.log('Play event on')
    return () => {
      console.log('Play event off')
      player.off('play', handlePlay)
    }
  }, [player, pushEvent, allowAnalytics])
}

const usePauseEvent = (
  player: Player | null,
  pushEvent: (eventType: EventType, player: Player) => void,
  allowAnalytics: boolean,
) => {
  useEffect(() => {
    if (!player) return
    const handlePause = () => {
      const isVideoEnded = player.remainingTime() <= 0
      if (!isVideoEnded && allowAnalytics) {
        pushEvent(GTM_PAUSE_EVENT, player)
      }
    }
    player.on('pause', handlePause)
    return () => {
      player.off('pause', handlePause)
    }
  }, [player, pushEvent, allowAnalytics])
}

const useCompletionEvent = (
  player: Player | null,
  pushEvent: (eventType: EventType, player: Player) => void,
  allowAnalytics: boolean,
) => {
  useEffect(() => {
    if (!player) return
    const handleCompletion = () => {
      if (allowAnalytics) {
        pushEvent(GTM_COMPLETION_EVENT, player)
      }
    }
    player.on('ended', handleCompletion)

    return () => {
      player.off('ended', handleCompletion)
    }
  }, [player, pushEvent, allowAnalytics])
}

const useVideoProgressEvent = (
  player: Player | null,
  pushEvent: (eventType: EventType, player: Player) => void,
  allowAnalytics: boolean,
) => {
  const [trackedMilestones, setTrackedMilestones] = useState<number[]>([])
  const intervalDuration = 1000 // Check every second

  useEffect(() => {
    if (!player) return
    const intervalId = setInterval(() => {
      const duration = player.duration()
      if ((!allowAnalytics || !duration) && !player) return
      const currentTime = player.currentTime()
      if (currentTime && duration) {
        const progress = (currentTime / duration) * 100
        GTM_PROGRESS_MILESTONES.forEach((milestone) => {
          if (progress >= milestone && !trackedMilestones.includes(milestone)) {
            pushEvent(`video_progress_${milestone}`, player)
            setTrackedMilestones((prev) => [...prev, milestone])
          }
        })
      }
    }, intervalDuration)

    const handlePlay = () => {
      if (player.currentTime() === 0 && !player.loop) {
        setTrackedMilestones([]) // Reset milestones at the start of a new play session
      }
    }

    player.on('timeupdate', handlePlay)

    return () => {
      clearInterval(intervalId)
      player.off('timeupdate', handlePlay)
    }
  }, [player, pushEvent, allowAnalytics, trackedMilestones])
}

export default useVideojsAnalytics
