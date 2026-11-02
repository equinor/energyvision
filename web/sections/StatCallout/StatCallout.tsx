'use client';

import type { PortableTextBlock } from '@portabletext/types';
import { Carousel } from '@/core/Carousel/Carousel';
import { CarouselItem } from '@/core/Carousel/CarouselItem';
import { useMediaQuery } from '@/lib/hooks/useMediaQuery';
import { twMerge } from '@/lib/twMerge/twMerge';
import Blocks from '@/portableText/Blocks';
import { getBgAndDarkFromBackground } from '@/styles/colorKeyToUtilityMap';
import type { DesignOptions } from '@/types/designOptionsTypes';
import { StatCalloutItem, type StatCalloutItemData } from './StatCalloutItem';

export type StatCalloutData = {
  type: 'statCallout';
  id: string;
  title?: PortableTextBlock[];
  hideTitle?: boolean;
  useHorizontalScroll?: boolean;
  items?: StatCalloutItemData[];
  designOptions?: DesignOptions;
};

type StatCalloutProps = {
  data: StatCalloutData;
  anchor?: string;
  className?: string;
};

export const StatCallout = ({
  data,
  anchor,
  className = '',
}: StatCalloutProps) => {
  const {
    title,
    hideTitle = false,
    useHorizontalScroll = false,
    items = [],
    designOptions,
  } = data;
  const { bg, dark } = getBgAndDarkFromBackground(designOptions);
  const hasMoreThanTwoItems = items.length > 2;
  const aspectRatio: NonNullable<StatCalloutItemData['aspectRatio']> =
    items.length === 1 ? '16:9' : items.length === 2 ? '1:1' : '8:11';
  const itemsWithAspectRatio = items.map((item) => ({
    ...item,
    aspectRatio,
  }));
  const isMedium = useMediaQuery('(min-width: 768px)');
  const shouldUseHorizontalScroll = useHorizontalScroll || isMedium === false;

  if (items.length === 0) return null;

  const cards = itemsWithAspectRatio.map((item) => (
    <li
      key={item.id}
      className={twMerge(
        'w-full',
        hasMoreThanTwoItems
          ? 'max-w-[25rem]'
          : items.length === 1
            ? 'max-w-[50%]'
            : '',
      )}
    >
      <StatCalloutItem item={item} />
    </li>
  ));

  return (
    <section
      id={anchor}
      className={twMerge(
        `${bg} ${dark ? 'dark' : ''} flex flex-col gap-6`,
        className,
      )}
    >
      <div className="mx-auto w-full max-w-content">
        {title && (
          <div className="px-layout-sm lg:px-layout-lg">
            <Blocks
              value={title}
              variant="h2"
              blockClassName={hideTitle ? 'sr-only' : ''}
            />
          </div>
        )}
        {shouldUseHorizontalScroll ? (
          <Carousel
            items={itemsWithAspectRatio}
            variant="statCallout"
            displayMode="scroll"
            hasSectionTitle
            title={title}
            containerClassName={twMerge(
              'ps-layout-sm',
              title && !hideTitle && 'mt-6',
            )}
            listClassName="auto-cols-max gap-x-[34px] lg:gap-x-[34px]"
            controlsClassName="px-layout-sm"
          >
            {items.map((item, index) => (
              <CarouselItem
                key={item.id}
                index={index}
                className="w-[min(25rem,calc(100vw-3rem))] max-w-[25rem] grow-0 first:pl-0 last:pr-0"
              >
                <StatCalloutItem item={item} />
              </CarouselItem>
            ))}
          </Carousel>
        ) : (
          <ul
            className={twMerge(
              'grid w-full grid-cols-1 gap-x-[34px] gap-y-6 px-layout-sm sm:grid-cols-2',
              hasMoreThanTwoItems && 'lg:grid-cols-3',
              items.length === 2 && 'lg:px-layout-md',
              title && !hideTitle && 'mt-6',
            )}
          >
            {cards}
          </ul>
        )}
      </div>
    </section>
  );
};

export default StatCallout;
