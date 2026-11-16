'use client';
import { sendGTMEvent } from '@next/third-parties/google';
import { useCallback, useEffect, useRef } from 'react';
import useConsent from '@/lib/hooks/useConsent';

const GTM_PLAY_EVENT = 'video_play';
const GTM_PAUSE_EVENT = 'video_pause';
const GTM_COMPLETION_EVENT = 'video_completion';
const GTM_PROGRESS_MILESTONES = [25, 50, 75, 90]; // Percentages
const PROGRESS_INTERVAL_MS = 1000;

type EventType =
  | typeof GTM_PLAY_EVENT
  | typeof GTM_PAUSE_EVENT
  | typeof GTM_COMPLETION_EVENT
  | `video_progress_${number}`;

type UseVideoAnalyticsOptions = {
  media: HTMLMediaElement | null;
  src: string;
  title?: string;
  autoPlay?: boolean;
};

/** Pushes play, pause, completion and progress milestone events to GTM for user initiated videos. */
export const useVideoAnalytics = ({
  media,
  src,
  title,
  autoPlay = false,
}: UseVideoAnalyticsOptions): void => {
  const allowAnalytics = useConsent(['statistics']) || false;
  const trackedMilestonesRef = useRef<Set<number>>(new Set());

  const pushEvent = useCallback(
    (eventType: EventType, element: HTMLMediaElement) => {
      sendGTMEvent({
        event: 'video_event',
        eventType,
        videoTitle: title || src,
        videoType: element.loop ? 'loop' : undefined,
        currentTime: element.currentTime || 0,
        src,
      });
    },
    [title, src],
  );

  useEffect(() => {
    if (!media || !allowAnalytics || autoPlay) return;

    const handlePlay = () => pushEvent(GTM_PLAY_EVENT, media);
    const handlePause = () => {
      if (!media.ended) pushEvent(GTM_PAUSE_EVENT, media);
    };
    const handleEnded = () => pushEvent(GTM_COMPLETION_EVENT, media);
    const handleTimeUpdate = () => {
      // Reset milestones at the start of a new play session
      if (media.currentTime === 0 && !media.loop) {
        trackedMilestonesRef.current.clear();
      }
    };

    const intervalId = window.setInterval(() => {
      const { duration, currentTime } = media;
      if (!Number.isFinite(duration) || duration <= 0 || !currentTime) return;

      const progress = (currentTime / duration) * 100;
      for (const milestone of GTM_PROGRESS_MILESTONES) {
        if (
          progress >= milestone &&
          !trackedMilestonesRef.current.has(milestone)
        ) {
          trackedMilestonesRef.current.add(milestone);
          pushEvent(`video_progress_${milestone}`, media);
        }
      }
    }, PROGRESS_INTERVAL_MS);

    media.addEventListener('play', handlePlay);
    media.addEventListener('pause', handlePause);
    media.addEventListener('ended', handleEnded);
    media.addEventListener('timeupdate', handleTimeUpdate);

    return () => {
      window.clearInterval(intervalId);
      media.removeEventListener('play', handlePlay);
      media.removeEventListener('pause', handlePause);
      media.removeEventListener('ended', handleEnded);
      media.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, [media, allowAnalytics, autoPlay, pushEvent]);
};
