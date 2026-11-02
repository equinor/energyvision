'use client';

import { useCallback, useEffect, useRef } from 'react';
import { usePrefersReducedMotion } from '@/lib/hooks/usePrefersReducedMotion';
import { CarouselLayout } from './CarouselLayout';
import type { CarouselModeProps } from './types';

const WHEEL_EASING_MS = 90;

export function ScrollCarousel(props: CarouselModeProps) {
  const sliderRef = useRef<HTMLUListElement>(null);
  const containerRef = useRef<HTMLElement>(null);
  const setContainerRef = useCallback(
    (element: HTMLElement | null) => {
      containerRef.current = element;
      if (typeof props.ref === 'function') return props.ref(element);
      if (props.ref) props.ref.current = element;
    },
    [props.ref],
  );
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const container = containerRef.current;
    const slider = sliderRef.current;
    if (!container || !slider) return;
    let previousSnapType: string | undefined;
    let frame = 0;
    let targetPosition = 0;
    let lastFrameTime = 0;
    const direction = getComputedStyle(slider).direction === 'rtl' ? -1 : 1;
    const stopAnimation = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      if (previousSnapType !== undefined) {
        slider.style.scrollSnapType = previousSnapType;
        previousSnapType = undefined;
      }
    };
    const animateScroll = (time: number) => {
      const elapsed = Math.min(time - lastFrameTime, 64);
      lastFrameTime = time;
      const position = slider.scrollLeft * direction;
      const remaining = targetPosition - position;
      const next =
        Math.abs(remaining) < 2
          ? targetPosition
          : position + remaining * (1 - Math.exp(-elapsed / WHEEL_EASING_MS));
      slider.scrollTo({ left: next * direction, behavior: 'instant' });
      frame =
        Math.abs(targetPosition - slider.scrollLeft * direction) > 1
          ? requestAnimationFrame(animateScroll)
          : 0;
    };
    const handleWheel = (event: WheelEvent) => {
      if (
        event.defaultPrevented ||
        event.ctrlKey ||
        event.shiftKey ||
        Math.abs(event.deltaX) >= Math.abs(event.deltaY)
      ) {
        stopAnimation();
        return;
      }

      // Preserve wheel input for nested content that can scroll vertically.
      if (event.target instanceof Element) {
        let target = event.target;
        while (target !== container) {
          if (
            target !== slider &&
            target instanceof HTMLElement &&
            target.scrollHeight - target.clientHeight > 1 &&
            /auto|scroll/.test(getComputedStyle(target).overflowY) &&
            (event.deltaY < 0
              ? target.scrollTop > 1
              : target.scrollTop <
                target.scrollHeight - target.clientHeight - 1)
          )
            return;
          if (!target.parentElement) break;
          target = target.parentElement;
        }
      }

      const lineHeight =
        Number.parseFloat(getComputedStyle(slider).lineHeight) ||
        Number.parseFloat(getComputedStyle(slider).fontSize);
      const delta =
        event.deltaY *
        (event.deltaMode === WheelEvent.DOM_DELTA_LINE
          ? lineHeight
          : event.deltaMode === WheelEvent.DOM_DELTA_PAGE
            ? slider.clientWidth
            : 1);
      const maxScroll = slider.scrollWidth - slider.clientWidth;
      const position = slider.scrollLeft * direction;
      if (
        maxScroll <= 1 ||
        (delta < 0 && position <= 1) ||
        (delta > 0 && position >= maxScroll - 1)
      )
        return;

      event.preventDefault();
      // Keep wheel gestures free-scrolling rather than snapping back at rest.
      if (previousSnapType === undefined) {
        previousSnapType = slider.style.scrollSnapType;
        slider.style.scrollSnapType = 'none';
      }
      targetPosition = Math.max(
        0,
        Math.min(maxScroll, (frame ? targetPosition : position) + delta),
      );
      if (reducedMotion) {
        slider.scrollTo({
          left: targetPosition * direction,
          behavior: 'instant',
        });
      } else if (!frame) {
        lastFrameTime = performance.now();
        frame = requestAnimationFrame(animateScroll);
      }
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    container.addEventListener('pointerdown', stopAnimation);
    return () => {
      container.removeEventListener('wheel', handleWheel);
      container.removeEventListener('pointerdown', stopAnimation);
      stopAnimation();
    };
  }, [reducedMotion]);

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
