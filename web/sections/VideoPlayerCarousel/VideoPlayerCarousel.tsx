'use client';
import dynamic from 'next/dynamic';
import type { PortableTextBlock } from 'next-sanity';
import { forwardRef, useId } from 'react';
import { twMerge } from 'tailwind-merge';
import { Carousel } from '@/core/Carousel/Carousel';
import { CarouselItem } from '@/core/Carousel/CarouselItem';
import type { AspectRatioVariants } from '@/core/VideoJsPlayer/Video';
import type { VideoType } from '@/core/VideoJsPlayer/VideoPlayer';
import Blocks from '@/portableText/Blocks';
import { getBgAndDarkFromBackground } from '@/styles/colorKeyToUtilityMap';
import type { DesignOptions } from '../../types/index';

export type VideoPlayerCarouselItem = {
  id: string;
  video: VideoType;
  title?: PortableTextBlock[];
  hideVideoTitle?: boolean;
  aspectRatio?: AspectRatioVariants;
};

export type VideoPlayerCarouselData = {
  id: string;
  type: string;
  items: VideoPlayerCarouselItem[];
  designOptions: DesignOptions & {
    aspectRatio: AspectRatioVariants;
  };
  title?: PortableTextBlock[];
  hideTitle?: boolean;
  ingress?: PortableTextBlock[];
};

type VideoPlayerCarouselProps = {
  data: VideoPlayerCarouselData;
  anchor?: string;
  className?: string;
};

const VideoPlayer = dynamic(() => import('@/core/VideoJsPlayer/VideoPlayer'));

const VideoPlayerCarousel = forwardRef<
  HTMLUListElement,
  VideoPlayerCarouselProps
>(function VideoPlayerCarousel({ anchor, data, className }, ref) {
  const { title, hideTitle, ingress, items, designOptions } = data;
  const headingId = useId();
  const { bg, dark } = getBgAndDarkFromBackground(designOptions);
  const scrollMode = designOptions?.aspectRatio === '9:16';

  return (
    <section
      id={anchor}
      className={twMerge(`${bg} ${dark ? 'dark' : ''}`, className)}
    >
      <div className="mx-auto flex w-full max-w-content flex-col px-layout-sm pb-8 lg:px-layout-lg">
        {title && (
          <Blocks
            id={headingId}
            variant="h2"
            value={title}
            className={hideTitle ? 'sr-only' : `${ingress ? 'pb-6' : ''}`}
          />
        )}
        {ingress && <Blocks variant="ingress" value={ingress} />}
      </div>
      <Carousel
        ref={ref}
        displayMode={scrollMode ? 'scroll' : 'single'}
        hasSectionTitle={!!title}
        labelledbyId={title ? headingId : undefined}
        autoRotation={false}
        containerClassName={`${scrollMode ? 'px-layout-sm lg:px-layout-md max-w-content mx-auto' : ''}`}
      >
        {items.map((item, index) => (
          <CarouselItem key={item.id} index={index}>
            <VideoPlayer
              title={item.video?.title}
              poster={item.video?.poster}
              src={item.video?.src}
              aspectRatio={scrollMode ? '9:16' : '16:9'}
              figureCaption={item.title}
              className="h-full min-w-[24rem] overflow-hidden rounded-card"
            />
          </CarouselItem>
        ))}
      </Carousel>
    </section>
  );
});

export default VideoPlayerCarousel;
