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
  const cardColor = item.backgroundColor?.backgroundUtility
    ? colorKeyToUtilityMap[item.backgroundColor.backgroundUtility]
    : undefined;
  const backgroundVideoSrc = item.backgroundVideo?.src;
  const cardHasImage =
    !backgroundVideoSrc && Boolean(item.backgroundImage?.asset);
  const icon = item.icon?.asset && (
    <div className="flex min-w-[130px] flex-1 items-center justify-center px-20 py-10">
      <div className={twMerge('relative aspect-square w-full')}>
        <Image
          image={item.icon}
          fill
          grid="xs"
          aspectRatio="original"
          className="absolute inset-0 text-slate-80 dark:text-white-100"
          imageClassName={`h-full w-full object-cover ${
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
          'relative aspect-[8/11] overflow-hidden rounded-card',
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
            aspectRatio="8:11"
            className="absolute inset-0"
            imageClassName="object-cover"
          />
        )}
        <div className="absolute inset-0 flex flex-col px-6 py-8">
          {alignment === 'justify-end' && icon}
          <div
            className={twMerge(`flex flex-col ${alignment}`, !icon && 'flex-1')}
          >
            {item.title && (
              <Blocks
                value={item.title}
                group="paragraph"
                variant="simple"
                blockClassName="text-center text-md"
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
