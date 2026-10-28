'use client';

import { useCallback, useEffect, useReducer, useRef } from 'react';
import { usePrefersReducedMotion } from '@/lib/hooks/usePrefersReducedMotion';
import { CarouselLayout } from './CarouselLayout';
import {
  CAROUSEL_TRANSITION_MS,
  type Direction,
  getSlideOffset,
  initialLoopState,
  loopReducer,
  wrapIndex,
} from './loopState';
import type { CarouselModeProps } from './types';
import { useAutoRotation } from './useAutoRotation';

export function LoopCarousel({
  itemCount,
  autoRotation = false,
  ...props
}: CarouselModeProps) {
  const [state, dispatch] = useReducer(loopReducer, initialLoopState);
  const sliderRef = useRef<HTMLUListElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const currentIndex = wrapIndex(
    state.index + (state.phase === 'animating' ? state.direction : 0),
    itemCount,
  );
  const navigate = useCallback(
    (direction: Direction) => {
      dispatch({
        type: 'navigate',
        direction,
        count: itemCount,
        reducedMotion,
      });
    },
    [itemCount, reducedMotion],
  );
  const advance = useCallback(() => {
    if (state.phase === 'idle') navigate(1);
  }, [navigate, state.phase]);
  const rotation = useAutoRotation(
    autoRotation && !reducedMotion && itemCount > 1,
    advance,
  );
  const manualNavigate = (direction: Direction) => {
    rotation.stop();
    navigate(direction);
  };

  useEffect(() => {
    if (state.phase === 'preparing') {
      let secondFrame = 0;
      const firstFrame = requestAnimationFrame(() => {
        secondFrame = requestAnimationFrame(() =>
          dispatch({ type: 'animate' }),
        );
      });
      return () => {
        cancelAnimationFrame(firstFrame);
        cancelAnimationFrame(secondFrame);
      };
    }
    if (state.phase === 'animating') {
      // Fallback when a transition is cancelled or the browser suppresses its event.
      const timer = setTimeout(
        () => dispatch({ type: 'settle', count: itemCount }),
        reducedMotion ? 0 : CAROUSEL_TRANSITION_MS + 50,
      );
      return () => clearTimeout(timer);
    }
  }, [state.phase, itemCount, reducedMotion]);

  return (
    <CarouselLayout
      {...props}
      itemCount={itemCount}
      autoRotation={autoRotation && !reducedMotion && itemCount > 1}
      sliderRef={sliderRef}
      state={{
        displayMode: 'single',
        itemCount,
        currentIndex,
        getItemStyle: (index) => ({
          transform: `translate3d(calc(${getSlideOffset(index, state, itemCount)} * var(--carousel-slide-stride)), 0, 0)`,
          transitionProperty:
            state.phase === 'animating' && !reducedMotion
              ? 'transform, opacity'
              : 'none',
          transitionDuration: `${CAROUSEL_TRANSITION_MS}ms`,
        }),
      }}
      rotation={rotation}
      onPrevious={() => manualNavigate(-1)}
      onNext={() => manualNavigate(1)}
      listProps={{
        onTransitionEnd: (event) => {
          if (
            event.propertyName === 'transform' &&
            event.target instanceof HTMLElement &&
            event.target.parentElement === sliderRef.current
          ) {
            dispatch({ type: 'settle', count: itemCount });
          }
        },
        onKeyDown: (event) => {
          if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey)
            return;
          if (
            event.target !== event.currentTarget &&
            (!(event.target instanceof HTMLElement) ||
              event.target.parentElement !== event.currentTarget)
          )
            return;
          if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
            event.preventDefault();
            manualNavigate(event.key === 'ArrowRight' ? 1 : -1);
            sliderRef.current?.focus();
          }
        },
      }}
    />
  );
}
