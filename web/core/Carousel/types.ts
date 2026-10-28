import type { PortableTextBlock } from '@portabletext/types';
import type { CSSProperties, HTMLAttributes, ReactNode, Ref } from 'react';

export type DisplayModes = 'single' | 'scroll';
export type Layouts = 'full' | 'default';

export type CarouselProps = Omit<
  HTMLAttributes<HTMLElement>,
  'title' | 'children'
> & {
  children: ReactNode;
  ref?: Ref<HTMLElement>;
  displayMode?: DisplayModes;
  labelledbyId?: string;
  containerClassName?: string;
  listClassName?: string;
  controlsClassName?: string;
  autoRotation?: boolean;
  hasSectionTitle?: boolean;
  title?: PortableTextBlock[];
  sectionTitle?: PortableTextBlock[];
};

export type CarouselModeProps = Omit<CarouselProps, 'displayMode'> & {
  itemCount: number;
};

export type CarouselState = {
  displayMode: DisplayModes;
  itemCount: number;
  currentIndex: number;
  getItemStyle?: (index: number) => CSSProperties;
};
