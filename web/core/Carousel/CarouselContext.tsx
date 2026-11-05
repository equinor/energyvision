'use client';

import { useTranslations } from 'next-intl';
import { createContext, useContext } from 'react';
import type { CarouselState } from './types';

export const CarouselContext = createContext<CarouselState | null>(null);

export function useCarouselItem(index: number) {
  const context = useContext(CarouselContext);
  const intl = useTranslations();
  if (!context)
    throw new Error('Carousel items must be rendered inside Carousel');

  const { displayMode, currentIndex, itemCount, getItemStyle } = context;
  const active = displayMode === 'scroll' || index === currentIndex;

  return {
    displayMode,
    active,
    style: getItemStyle?.(index),
    'aria-label': intl('carouselItemCountLabel', {
      x: index + 1,
      carouselLength: itemCount,
    }),
    ...(displayMode === 'single' && {
      'aria-current': active,
      tabIndex: active ? 0 : -1,
      inert: !active,
    }),
  };
}
