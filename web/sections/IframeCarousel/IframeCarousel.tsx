'use client';
import dynamic from 'next/dynamic';
import { useId } from 'react';
import { twMerge } from 'tailwind-merge';
import { Carousel } from '@/core/Carousel/Carousel';
import { CarouselItem } from '@/core/Carousel/CarouselItem';
import Blocks from '@/portableText/Blocks';
import { getBgAndDarkFromBackground } from '@/styles/colorKeyToUtilityMap';
import type { IframeCarouselData } from '../../types/index';

type IframeCarouselProps = {
  data: IframeCarouselData;
  anchor?: string;
  className?: string;
};

const IFrame = dynamic(() => import('@/core/IFrame/IFrame'));

const IframeCarousel = ({
  data,
  anchor,
  className = '',
}: IframeCarouselProps) => {
  const { title, hideTitle, items, designOptions } = data;
  const headingId = useId();
  const { bg, dark } = getBgAndDarkFromBackground(designOptions);

  return (
    <section
      className={twMerge(`${bg} ${dark ? 'dark' : ''}`, className)}
      id={anchor}
    >
      {title && (
        <div className="mx-auto max-w-content px-layout-lg">
          <Blocks
            value={title}
            variant="h2"
            id={headingId}
            blockClassName={` ${hideTitle ? 'sr-only' : ''}`}
          />
        </div>
      )}
      <Carousel
        displayMode="single"
        autoRotation={false}
        hasSectionTitle={!!title && !hideTitle}
        labelledbyId={title && !hideTitle ? headingId : undefined}
      >
        {items.map((item, index) => (
          <CarouselItem
            key={item.id ?? item._key}
            index={index}
            title={item.title}
            content={item.description}
            action={item.action}
          >
            <IFrame
              frameTitle={item.frameTitle}
              url={item.url}
              cookiePolicy={item.cookiePolicy}
              aspectRatio="16:9"
              height={item.height}
              hasSectionTitle={!!item.title}
              className="my-20"
            />
          </CarouselItem>
        ))}
      </Carousel>
    </section>
  );
};

export default IframeCarousel;
