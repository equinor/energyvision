'use client';
import type { PortableTextBlock } from '@portabletext/types';
import { forwardRef, useId } from 'react';
import { twMerge } from 'tailwind-merge';
import { Carousel } from '@/core/Carousel/Carousel';
import {
  CarouselImageItem,
  type ImageCarouselItem,
} from '@/core/Carousel/CarouselImageItem';
import Blocks from '@/portableText/Blocks';
import { getBgAndDarkFromBackground } from '@/styles/colorKeyToUtilityMap';
import type { DesignOptions } from '@/types/designOptionsTypes';

type ImageCarouselProps = {
  data: {
    title?: PortableTextBlock[];
    hideTitle?: boolean;
    ingress?: PortableTextBlock[];
    items: ImageCarouselItem[];
    designOptions?: DesignOptions;
    options?: { autoplay?: boolean };
  };
  anchor?: string;
  className?: string;
};

const ImageCarousel = forwardRef<HTMLUListElement, ImageCarouselProps>(
  function ImageCarousel({ anchor, data, className }, ref) {
    const { title, hideTitle, ingress, items, designOptions, options } = data;
    const { bg, dark } = getBgAndDarkFromBackground(designOptions);
    const headingId = useId();

    return (
      <section
        id={anchor}
        className={twMerge(`${bg} ${dark ? 'dark' : ''}`, className)}
      >
        {((title && !hideTitle) || ingress) && (
          <div className="mx-auto flex w-full max-w-content flex-col px-layout-sm pb-8 lg:px-layout-lg">
            {title && !hideTitle && (
              <Blocks variant="h2" id={headingId} value={title} />
            )}
            {ingress && <Blocks variant="ingress" value={ingress} />}
          </div>
        )}
        <Carousel
          ref={ref}
          displayMode="single"
          hasSectionTitle={!!title && !hideTitle}
          labelledbyId={title && !hideTitle ? headingId : undefined}
          title={title}
          autoRotation={options?.autoplay}
          sectionTitle={title}
        >
          {items.map((item, index) => (
            <CarouselImageItem
              key={item.id}
              {...item}
              index={index}
              type={item.type ?? 'imageWithAltAndCaption'}
            />
          ))}
        </Carousel>
      </section>
    );
  },
);

export default ImageCarousel;
