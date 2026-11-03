import type { PortableTextBlock } from '@portabletext/types';
import { Image } from '@/core/Image/Image';
import type { Image as ImageType } from '@/core/Image/imageUtilities';
import { twMerge } from '@/lib/twMerge/twMerge';
import Blocks from '@/portableText/Blocks';
import {
  type ColorKeys,
  colorKeyToUtilityMap,
} from '@/styles/colorKeyToUtilityMap';
import { StatCalloutBackgroundVideo } from './StatCalloutBackgroundVideo';

export type StatCalloutItemData = {
  id: string;
  aspectRatio?: '16:9' | '1:1' | '8:11';
  title?: PortableTextBlock[];
  caption?: PortableTextBlock[];
  titleVerticalAlignment?: 'top' | 'center' | 'bottom';
  backgroundImage?: ImageType;
  backgroundVideo?: { src?: string; title?: string };
  backgroundColor?: { backgroundUtility?: ColorKeys; dark?: boolean };
  icon?: ImageType;
  useWhite?: boolean;
};

const titleAlignment = {
  top: 'justify-start',
  center: 'justify-center',
  bottom: 'justify-end',
} as const;

export const StatCalloutItem = ({ item }: { item: StatCalloutItemData }) => {
  const alignment = titleAlignment[item.titleVerticalAlignment ?? 'center'];
  const aspectRatio = item.aspectRatio ?? '8:11';
  const aspectClassName =
    aspectRatio === '16:9'
      ? 'aspect-video'
      : aspectRatio === '1:1'
        ? 'aspect-square'
        : 'aspect-8/11';
  const cardColor = item.backgroundColor?.backgroundUtility
    ? colorKeyToUtilityMap[item.backgroundColor.backgroundUtility]
    : undefined;
  const backgroundVideoSrc = item.backgroundVideo?.src;
  const cardHasImage =
    !backgroundVideoSrc && Boolean(item.backgroundImage?.asset);
  const icon = item.icon?.asset && (
    <div className="flex min-h-0 min-w-0 flex-1 items-center justify-center px-20">
      <div className="relative h-full w-full">
        <Image
          image={item.icon}
          fill
          grid="xs"
          aspectRatio="original"
          className="absolute inset-0 text-slate-80 dark:text-white-100"
          imageClassName={`h-full w-full object-contain ${
            item.useWhite ? 'brightness-0 invert' : ''
          }`}
        />
      </div>
    </div>
  );

  return (
    <figure>
      <div
        className={twMerge(
          `relative ${aspectClassName} overflow-hidden rounded-card`,
          cardColor?.background ?? 'bg-gray-20',
          (item.useWhite || cardColor?.dark) && 'dark',
        )}
      >
        {backgroundVideoSrc && (
          <StatCalloutBackgroundVideo src={backgroundVideoSrc} />
        )}
        {cardHasImage && (
          <Image
            image={item.backgroundImage}
            fill
            grid="xs"
            aspectRatio={aspectRatio}
            className="absolute inset-0"
            imageClassName="object-cover"
          />
        )}
        <div className="absolute inset-0 flex flex-col gap-6 px-6 py-8">
          {alignment === 'justify-end' && icon}
          <div
            className={twMerge(
              `flex flex-col ${alignment}`,
              icon ? 'shrink-0' : 'flex-1',
            )}
          >
            {item.title && (
              <Blocks
                value={item.title}
                group="paragraph"
                variant="simple"
                blockClassName={twMerge(
                  'text-center text-md',
                  icon && !item.useWhite && 'text-slate-80 dark:text-slate-80',
                )}
              />
            )}
          </div>
          {alignment !== 'justify-end' && icon}
        </div>
      </div>
      {item.caption && item.caption.length > 0 && (
        <figcaption className="pt-3 text-body-md">
          <Blocks
            value={item.caption}
            group="paragraph"
            variant="small"
            blockClassName="text-start"
          />
        </figcaption>
      )}
    </figure>
  );
};
