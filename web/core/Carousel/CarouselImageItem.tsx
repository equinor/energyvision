'use client';
import type { PortableTextBlock } from '@portabletext/types';
import { forwardRef, type HTMLAttributes } from 'react';
import { ImageWithOverlay } from '@/core/ImageWithOverlay/ImageWithOverlay';
import { getUrlFromAction } from '@/lib/helpers/getUrlFromAction';
import { twMerge } from '@/lib/twMerge/twMerge';
import type { LinkData } from '@/types/index';
import { ArrowRight } from '../../icons';
import Blocks from '../../portableText/Blocks';
import { getIsoFromName } from '../../sanity/helpers/localization';
import { Image } from '../Image/Image';
import type { Image as ImageType } from '../Image/imageUtilities';
import BaseLink from '../Link/BaseLink';
import ResourceLink from '../Link/ResourceLink';
import { useCarouselItem } from './CarouselContext';

export type ImageCarouselItem = {
  id: string;
  _key?: string;
  type?: CarouselImageItemProps['type'];
  image?: ImageType;
  caption?: PortableTextBlock[] | string;
  attribution?: string;
  captionTeaserTitle?: string;
  captionTitle?: PortableTextBlock[];
  captionText?: PortableTextBlock[];
  action?: LinkData;
};

type CarouselImageItemProps = {
  index: number;
  type:
    | 'imageWithAltAndCaption'
    | 'imageWithRichTextBelow'
    | 'imageWithLinkAndOrOverlay';
  image?: ImageType;
  className?: string;
  caption?: PortableTextBlock[] | string;
  attribution?: string;
  captionTeaserTitle?: string;
  captionTitle?: PortableTextBlock[];
  captionText?: PortableTextBlock[];
  action?: LinkData;
} & HTMLAttributes<HTMLLIElement>;

export const CarouselImageItem = forwardRef<
  HTMLLIElement,
  CarouselImageItemProps
>(function CarouselImageItem(
  {
    type,
    index,
    image,
    caption,
    attribution,
    captionTitle,
    captionText,
    captionTeaserTitle,
    className = '',
    action,
    'aria-label': ariaLabel,
    style,
    onFocus,
  },
  ref,
) {
  const {
    displayMode,
    active,
    style: itemStyle,
    ...itemProps
  } = useCarouselItem(index);
  const isJustImage =
    type === 'imageWithAltAndCaption' && !caption && !attribution;
  const isImageWithSimpleCaption =
    type === 'imageWithAltAndCaption' && (!!caption || !!attribution);
  const isImageWithJustLink =
    type === 'imageWithLinkAndOrOverlay' &&
    action &&
    (!captionTitle || !captionText);
  const isImageWithOverlay =
    type === 'imageWithLinkAndOrOverlay' && (!!captionTitle || !!captionText);

  const url = action && getUrlFromAction(action);

  const getBody = () => {
    if (isJustImage && image) {
      return (
        <Image
          grid="sm"
          image={image}
          fill
          className={`relative aspect-4/3 h-full w-full rounded-card md:aspect-video`}
          imageClassName="rounded-card"
        />
      );
    }
    if (isImageWithSimpleCaption && image) {
      return (
        <figure className="flex aspect-4/3 h-full w-full items-end rounded-card md:aspect-video">
          <Image
            grid="sm"
            image={image}
            fill
            className="absolute"
            imageClassName={`rounded-card`}
          />
          <figcaption
            className={`fade-in-black-gradient z-1 w-full rounded-b-card ${
              displayMode === 'single'
                ? active
                  ? 'opacity-100'
                  : 'opacity-50'
                : ''
            }`}
          >
            <div className={`h-fit w-full px-4 pt-20 pb-6 lg:px-8`}>
              <div className="flex w-full flex-col gap-1">
                {caption && (
                  <div
                    className={`text-left text-md text-white-100 lg:text-lg`}
                  >
                    {typeof caption === 'string' ? (
                      caption
                    ) : (
                      <Blocks value={caption} />
                    )}
                  </div>
                )}
                {attribution && (
                  <span className={`text-base text-white-100`}>
                    {attribution}
                  </span>
                )}
              </div>
            </div>
          </figcaption>
        </figure>
      );
    }
    if (isImageWithJustLink && image && url) {
      return (
        <figure className="h-full w-full">
          <Image
            grid="sm"
            image={image}
            fill
            className="absolute"
            imageClassName={`aspect-4/3 rounded-card md:aspect-video`}
          />
          <div className="fade-in-black-gradient flex h-full w-full items-end rounded-b-card pt-10 lg:pt-20">
            <BaseLink
              href={url}
              {...(action.link?.lang && {
                hrefLang: getIsoFromName(action.link?.lang),
              })}
              type={action.type}
              className="group flex gap-2"
            >
              <span className="text-left text-md text-white-100 lg:text-lg">
                {action.label}
              </span>
              <ArrowRight className={`size-10 group-hover:translate-y-2`} />
            </BaseLink>
          </div>
        </figure>
      );
    }
    if (isImageWithOverlay) {
      return (
        <ImageWithOverlay
          className={`aspect-4/3 rounded-card md:aspect-video`}
          teaserTitle={captionTeaserTitle}
          title={captionTitle}
          text={captionText}
          image={image}
          action={action}
          captionClassname={`${active ? 'opacity-100' : 'opacity-0'}`}
        />
      );
    }
    if (type === 'imageWithRichTextBelow' && image) {
      return (
        <figure className="flex h-full w-full flex-col">
          <div className="relative aspect-video w-full shrink-0">
            <Image
              grid="sm"
              image={image}
              fill
              className="absolute inset-0"
              imageClassName="rounded-t-card object-cover"
            />
          </div>
          <figcaption
            className={twMerge(
              'h-fit max-w-text p-4 lg:px-8 lg:py-6',
              displayMode === 'single' && active ? 'opacity-100' : 'opacity-50',
            )}
          >
            {caption &&
              (typeof caption === 'string' ? (
                caption
              ) : (
                <Blocks value={caption} />
              ))}
            {action && url && (
              <ResourceLink
                href={url}
                file={{
                  ...action?.file,
                  label: action?.label,
                }}
                showExtensionIcon={true}
                {...(action?.link?.lang && {
                  hrefLang: getIsoFromName(action?.link?.lang),
                })}
                type={action?.type}
                variant="fit"
                className="mt-4"
              >
                {action?.label}
              </ResourceLink>
            )}
          </figcaption>
        </figure>
      );
    }
  };

  return (
    <li
      {...itemProps}
      ref={ref}
      aria-label={ariaLabel ?? itemProps['aria-label']}
      {...(displayMode === 'scroll' && {
        tabIndex: 0,
      })}
      style={{ ...style, ...itemStyle }}
      onFocus={onFocus}
      className={twMerge(
        `relative mt-1 focus:outline-hidden focus-visible:outline-dashed focus-visible:outline-2 focus-visible:outline-grey-50 focus-visible:outline-offset-2 dark:focus-visible:outline-white-100`,
        displayMode === 'single' &&
          `col-start-1 col-end-1 row-start-1 row-end-1 ms-2 me-2 w-single-carousel-card-w-sm transition-opacity duration-1000 ease-ease md:w-single-carousel-card-w-md lg:w-single-carousel-card-w-lg`,
        displayMode === 'single' && active ? 'opacity-100' : 'opacity-30',
        displayMode === 'scroll' &&
          `w-[75vw] max-w-257.5 shrink-0 snap-mandatory snap-center md:w-[70vw] lg:w-[62vw]`,
        className,
      )}
    >
      {getBody()}
    </li>
  );
});
