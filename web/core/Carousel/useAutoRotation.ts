'use client';

import { type MouseEvent, useEffect, useRef, useState } from 'react';
import { AUTO_ROTATION_MS } from './loopState';

export function useAutoRotation(enabled: boolean, advance: () => void) {
  const [stopped, setStopped] = useState(false);
  const [hovered, setHovered] = useState(false);
  const toggleIntent = useRef<boolean | null>(null);
  const running = enabled && !stopped && !hovered;

  useEffect(() => {
    if (!running) return;
    const timer = setTimeout(advance, AUTO_ROTATION_MS);
    return () => clearTimeout(timer);
  }, [advance, running]);

  return {
    running,
    stopped,
    stop: () => setStopped(true),
    toggle: (event: MouseEvent<HTMLButtonElement>) => {
      setStopped(
        event.detail > 0 ? (toggleIntent.current ?? !stopped) : !stopped,
      );
      toggleIntent.current = null;
    },
    onPointerDown: () => {
      toggleIntent.current = !stopped;
    },
    onPointerCancel: () => {
      toggleIntent.current = null;
    },
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
  };
}
