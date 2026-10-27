'use client';

import { useEffect, useRef } from 'react';

type StatCalloutBackgroundVideoProps = {
  src: string;
};

export const StatCalloutBackgroundVideo = ({
  src,
}: StatCalloutBackgroundVideoProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const motionPreference = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    );
    let isVisible = false;

    const syncPlayback = () => {
      if (!isVisible || motionPreference.matches) {
        video.pause();
        return;
      }

      video.play().catch((error: unknown) => {
        if (error instanceof DOMException && error.name === 'AbortError') {
          return;
        }
        console.warn('Stat callout background video could not play.', error);
      });
    };

    const observer =
      typeof IntersectionObserver === 'undefined'
        ? undefined
        : new IntersectionObserver(
            ([entry]) => {
              isVisible = entry.isIntersecting;
              syncPlayback();
            },
            { threshold: 0.25 },
          );

    if (observer) {
      observer.observe(video);
    } else {
      isVisible = true;
      syncPlayback();
    }

    motionPreference.addEventListener('change', syncPlayback);

    return () => {
      observer?.disconnect();
      motionPreference.removeEventListener('change', syncPlayback);
      video.pause();
    };
  }, []);

  return (
    <video
      ref={videoRef}
      aria-hidden="true"
      className="absolute inset-0 h-full w-full object-cover"
      muted
      playsInline
      preload="metadata"
      src={src}
      tabIndex={-1}
    />
  );
};
