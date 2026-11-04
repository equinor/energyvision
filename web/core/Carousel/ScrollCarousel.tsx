'use client';

import { useCallback, useRef } from 'react';
import { usePrefersReducedMotion } from '@/lib/hooks/usePrefersReducedMotion';
import { CarouselLayout } from './CarouselLayout';
import type { CarouselModeProps } from './types';

export function ScrollCarousel(props: CarouselModeProps) {
  const sliderRef = useRef<HTMLUListElement>(null);
  const setContainerRef = useCallback(
    (element: HTMLElement | null) => {
      if (typeof props.ref === 'function') return props.ref(element);
      if (props.ref) props.ref.current = element;
    },
    [props.ref],
  );
  const reducedMotion = usePrefersReducedMotion();

  const scroll = (direction: -1 | 1) => {
    const slider = sliderRef.current;
    if (!slider) return;
    slider.scrollBy({
      left: direction * Math.max(slider.clientWidth * 0.8, 320),
      behavior: reducedMotion ? 'auto' : 'smooth',
    });
  };

  return (
    <CarouselLayout
      {...props}
      ref={setContainerRef}
      autoRotation={false}
      state={{
        displayMode: 'scroll',
        itemCount: props.itemCount,
        currentIndex: 0,
      }}
      sliderRef={sliderRef}
      onPrevious={() => scroll(-1)}
      onNext={() => scroll(1)}
    />
  );
}
