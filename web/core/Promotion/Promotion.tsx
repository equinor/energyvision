import type { PortableTextBlock } from '@portabletext/types';
import { useLocale, useTranslations } from 'next-intl';
import { forwardRef, type ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';
import FormattedDateTime from '@/core/FormattedDateTime/FormattedDateTime';
import { Image } from '@/core/Image/Image';
import type { Image as ImageType } from '@/core/Image/imageUtilities';
import {
  getArrowAnimation,
  getArrowElement,
  iconRotation,
} from '@/core/Link/linkCommon';
import { Typography } from '@/core/Typography';
import { formatDateTimeInNorwegianTime } from '@/lib/helpers/dateUtilities';
import type { GridColumnVariant } from '@/lib/helpers/getCommonUtilities';
import {
  type ColorKeys,
  colorKeyToUtilityMap,
} from '@/styles/colorKeyToUtilityMap';
import BaseLink, { type BaseLinkProps } from '../Link/BaseLink';
import { LogoPrimary } from '../Logo/Logo';

export type PromotionType = 'compact' | 'extended';
export type PromotionVariant = 'externalLink' | 'default';
export type PromotionLayoutDirection = 'col' | 'row';

export type PromotionProps = {
  /**
   * compact - only title with v2 promo options in studio
   * extended - title, ingress and date eyebrow, stacked layout. E.g. News promotion
   * @default compact
   */
  type?: PromotionType;
  /** Internal(default) links or external
   * @defaul default
   */
  variant?: PromotionVariant;
  /** Background on promotion card
   * @default gray-20
   */
  background?: ColorKeys;
  image?: ImageType;
  /** Rendered as plain but accepts portable */
  title: string | PortableTextBlock[];
  /** Rendered as plain but accepts portable.
   * Combined type hides ingress on mobile
   */
  ingress?: PortableTextBlock[];
  /** about title element */
  eyebrow?: ReactNode;
  /** ISO publish date shown above the title */
  publishDateTime?: string;
  /** Side by side or stacked layout
   * @default col
   */
  layoutDirection?: PromotionLayoutDirection;
  /** Helper from parent grid columns to decide image aspect */
  gridColumns?: GridColumnVariant;
  /** h2 or h3 if section title in parent block component */
  hasSectionTitle?: boolean;
  /** Shows an "Updated" tag in the top end corner of the image
   * @default false
   */
  showUpdatedTag?: boolean;
  /** ISO date and time shown after the ingress when the updated tag is shown */
  updatedTimestamp?: string;
  /** Last-modified timestamp used when updatedTimestamp is empty */
  updatedAt?: string;
} & Omit<BaseLinkProps, 'type'>;

const getPlainText = (text: string | PortableTextBlock[] | undefined) => {
  if (typeof text === 'undefined') return text;

  return Array.isArray(text)
    ? text
        .map((block) => block.children.map((span) => span.text).join(''))
        .join('\n')
        .replace(/\n/g, ' ')
    : text;
};

export const Promotion = forwardRef<HTMLAnchorElement, PromotionProps>(
  function Promotion(
    {
      type = 'compact',
      background,
      title,
      ingress,
      image,
      href,
      className = '',
      hrefLang,
      variant = 'default',
      gridColumns,
      layoutDirection = 'col',
      hasSectionTitle = false,
      eyebrow,
      publishDateTime,
      showUpdatedTag = false,
      updatedTimestamp,
      updatedAt,
    },
    ref,
  ) {
    const intl = useTranslations();
    const locale = useLocale();
    const updatedLabel = intl.has('updated') ? intl('updated') : 'Updated';
    const displayedUpdatedTimestamp = updatedTimestamp || updatedAt;
    const updatedDateTime =
      showUpdatedTag && displayedUpdatedTimestamp
        ? formatDateTimeInNorwegianTime(displayedUpdatedTimestamp, locale)
        : undefined;
    const plainText = getPlainText(title);

    const plainIngress = getPlainText(ingress);

    const showArrow = true; //type !== 'extended'
    const _layoutDirection = type === 'extended' ? 'col' : layoutDirection;

    return href ? (
      <BaseLink
        ref={ref}
        type={variant === 'externalLink' ? 'externalUrl' : 'internalUrl'}
        href={href}
        {...(hrefLang && { hrefLang })}
        className={twMerge(
          `group/link relative grid h-full w-full max-w-full overflow-hidden rounded-card`,
          colorKeyToUtilityMap[background ?? 'gray-20'].background,
          type === 'compact' &&
            _layoutDirection === 'col' &&
            'grid-cols-1 grid-rows-[65%_auto]',
          type === 'compact' &&
            _layoutDirection === 'row' &&
            'min-h-30 grid-cols-[31%_auto] grid-rows-1',
          type === 'extended' &&
            'grid-cols-1 grid-rows-[minmax(31%,200px)_1fr]',
          className,
        )}
      >
        {image ? (
          <Image
            grid="xs"
            image={image}
            fill
            className={twMerge(
              'aspect-4/3',
              _layoutDirection === 'col' && `aspect-video h-full w-full`,
              _layoutDirection === 'row' && `h-full w-full`,
              _layoutDirection === 'row' && gridColumns && gridColumns === '2'
                ? '2xl:aspect-[1.08]'
                : '2xl:aspect-video',
            )}
            aspectRatio={_layoutDirection === 'col' ? '16:9' : '4:3'}
            imageClassName={`${
              _layoutDirection !== 'col' ? 'rounded-s-card' : 'rounded-t-card'
            }`}
          />
        ) : (
          <div
            className={twMerge(
              `flex h-full w-full items-center justify-center bg-autumn-storm-60`,
              _layoutDirection === 'col'
                ? 'aspect-video rounded-t-card'
                : 'aspect-4/3 rounded-s-card',
            )}
          >
            <LogoPrimary className="h-auto w-[20%] text-white-100" />
          </div>
        )}
        {showUpdatedTag && (
          // Absolutely positioned in the image's grid cell, so it follows the image in both layouts.
          // Same glass layers as useGlass in ImageBackground: border, backdrop, then content on top.
          <span className="glass-border absolute inset-e-3 top-3 z-1 col-start-1 col-end-2 row-start-1 row-end-2 rounded-full before:rounded-full">
            <span className="backdrop-glass rounded-full" aria-hidden="true" />
            {/* Equinor's capitals sit high in the line box in Chromium and level in Safari, so where
                supported the text box is trimmed to the cap height and padded evenly. The uneven
                padding is the fallback for browsers without text-box. */}
            <span className="relative z-1 block px-3 pt-1.5 pb-1 font-medium text-slate-80 text-sm uppercase supports-[text-box:trim-both_cap_alphabetic]:py-2.25 supports-[text-box:trim-both_cap_alphabetic]:[text-box:trim-both_cap_alphabetic]">
              {updatedLabel}
            </span>
          </span>
        )}
        <div
          className={twMerge(
            `relative flex h-full w-full flex-col`,
            type === 'extended' && 'items-start',
            type === 'compact' && 'min-h-25 items-center',
          )}
        >
          <div
            className={twMerge(
              'flex h-full w-full grow flex-col items-start justify-center ps-10 pt-6',
              type === 'extended' && 'justify-start pe-10 pb-12',
              type === 'compact' && 'pe-13 pb-8',
              type === 'compact' &&
                _layoutDirection === 'row' &&
                'ps-6 pe-13 pb-6',
            )}
          >
            {eyebrow && eyebrow}
            {publishDateTime && (
              <FormattedDateTime
                datetime={publishDateTime}
                uppercase
                className="pb-2 font-medium text-xs"
              />
            )}
            <div className="flex h-fit flex-col justify-start">
              {plainText && (
                <Typography
                  as={hasSectionTitle ? 'h3' : 'h2'}
                  variant={ingress ? 'h5' : 'h6'}
                  className={`leading-tight group-hover/link:underline`}
                >
                  {plainText}
                </Typography>
              )}
              {plainIngress && (
                <Typography
                  group="card"
                  variant="ingress"
                  className={twMerge(
                    type === 'compact' &&
                      _layoutDirection === 'col' &&
                      'lg:line-clamp-2',
                    type === 'compact' &&
                      _layoutDirection === 'row' &&
                      'lg:line-clamp-3',
                    type === 'extended' && 'lg:line-clamp-5',
                  )}
                >
                  {plainIngress}
                </Typography>
              )}
              {updatedDateTime && (
                // Padding for the gap: the variant resets margin-top directly after a heading
                <Typography className="my-0 pt-1.5 font-medium text-xs">
                  <strong className="font-semibold">
                    <span
                      aria-hidden="true"
                      className="-ms-4 me-2 inline-block size-2 rounded-full bg-energy-red-100 align-middle"
                    />
                    {`${updatedLabel}: ${updatedDateTime}`}
                  </strong>
                </Typography>
              )}
            </div>
          </div>

          {showArrow && (
            <div
              className={twMerge(
                `absolute inset-e-6.5 bottom-5 p-1`,
                /*                 type === 'extended' && 'inset-e-6 bottom-6',
                type === 'compact' &&
                  _layoutDirection === 'col' &&
                  'inset-e-6 bottom-8',
                type === 'compact' &&
                  _layoutDirection === 'row' &&
                  'inset-e-3 bottom-4', */
              )}
            >
              {getArrowElement(
                variant === 'externalLink' ? 'externalUrl' : 'internalUrl',
                `${
                  variant === 'externalLink' ? iconRotation.externalUrl : ''
                } ${getArrowAnimation(
                  variant === 'externalLink' ? 'externalUrl' : 'internalUrl',
                )}`,
              )}
            </div>
          )}
        </div>
      </BaseLink>
    ) : null;
  },
);
