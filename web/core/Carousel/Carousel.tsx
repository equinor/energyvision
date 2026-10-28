'use client';

import { Children } from 'react';
import { LoopCarousel } from './LoopCarousel';
import { ScrollCarousel } from './ScrollCarousel';
import type { CarouselProps } from './types';

export type { CarouselProps, DisplayModes, Layouts } from './types';

export function Carousel({ displayMode = 'scroll', ...props }: CarouselProps) {
  const children = Children.toArray(props.children);
  const contentKey = JSON.stringify(
    children.map((child) =>
      typeof child === 'object' && 'key' in child ? child.key : child,
    ),
  );
  const Component = displayMode === 'single' ? LoopCarousel : ScrollCarousel;

  return (
    <Component key={contentKey} {...props} itemCount={children.length}>
      {children}
    </Component>
  );
}
