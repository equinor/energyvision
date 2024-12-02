/* eslint-disable @typescript-eslint/ban-ts-comment */
import { forwardRef, HTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'
import Img from 'next/image'
import { GridTeaserData } from '../../types/index'
import { urlFor } from '../../common/helpers'
import { RowType } from './mapGridContent'
import GridLinkArrow from './GridLinkArrow'
import { getColorForTheme } from '../../pageComponents/shared/textTeaser/theme'
import Blocks from '../../pageComponents/shared/portableText/Blocks'
import { PortableTextBlock } from '@portabletext/types'
import isEmpty from '../../pageComponents/shared/portableText/helpers/isEmpty'
import { PortableTextReactComponents } from '@portabletext/react'

export type GridTeaserProps = {
  data: GridTeaserData
  rowType?: RowType
  className?: string
} & HTMLAttributes<HTMLDivElement>

export const GridTeaser = forwardRef<HTMLDivElement, GridTeaserProps>(function GridTeaser({ data, rowType }, ref) {
  const {
    image,
    action,
    content,
    themedContent,
    quote,
    author,
    authorTitle,
    useExtendedThemes,
    themeFromLarger,
    theme,
  } = data

  const imageSrc = urlFor(image).size(1200, 800).auto('format').toString()
  const altTag = image?.isDecorative ? '' : image?.alt || ''

  let contentTextColor = 'text-slate-80'
  let bgColor = 'bg-white-100'
  if (useExtendedThemes && themeFromLarger) {
    const { backgroundUtility: extendedBg, textUtility: extendedTxt } = getColorForTheme(themeFromLarger)
    if (extendedTxt) {
      contentTextColor = extendedTxt
    }
    if (extendedBg) {
      bgColor = extendedBg
    }
  }
  if (!useExtendedThemes && theme) {
    const { backgroundUtility: themeBg, textUtility: themeTxt } = getColorForTheme(theme)
    if (themeTxt) {
      contentTextColor = themeTxt
    }
    if (themeBg) {
      bgColor = themeBg
    }
  }

  return (
    <div
      ref={ref}
      className={twMerge(`
      h-full
      grid
      grid-rows-2
      lg:grid-rows-[250px_1fr]
      ${String(rowType) === 'span3' ? 'lg:grid-cols-[40%_60%] lg:grid-rows-1' : ''}
      ${bgColor}
      `)}
    >
      {image && (
        <div className="relative">
          <Img
            src={imageSrc}
            alt={altTag}
            style={{ objectFit: 'cover' }}
            fill
            sizes="(max-width: 800px) 100vw, 800px"
            role={image?.isDecorative ? 'presentation' : undefined}
          />
        </div>
      )}

      <div className={`relative h-full ${contentTextColor}`}>
        <div
          className={`h-full px-10 flex flex-col justify-center items-center gap-6 py-6 ${
            rowType !== 'span3' ? 'lg:py-8' : 'lg:py-12'
          } `}
        >
          {(content || (useExtendedThemes && themedContent)) && (
            <Blocks
              value={(useExtendedThemes ? themedContent : content) as PortableTextBlock[]}
              proseClassName="prose-campaign"
              className={`text-md ${contentTextColor}`}
              {...(useExtendedThemes && {
                blocksComponents: {
                  normal: ({ children }: PortableTextBlock) => {
                    if (isEmpty(children)) return null
                    return (
                      <p className="text-2xl leading-snug">
                        <>{children}</>
                      </p>
                    )
                  },
                } as Partial<PortableTextReactComponents>,
              })}
            />
          )}
          {quote && (
            <figure className="px-1 flex flex-col">
              <div className="h-full">
                <svg
                  fill="currentColor"
                  width="36px"
                  height="36px"
                  viewBox="0 0 48 48"
                  aria-hidden={true}
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>Quote symbol</title>
                  <path d="M24.3178 27.4196C24.3178 20.9682 29.485 14.2193 37.5942 12.7059L40.9409 15.5294C38.0002 16.5773 33.3736 20.0696 33.0856 22.5845C36.3927 23.0764 38.9218 25.7807 38.9218 29.046C38.9218 33.0391 35.4912 35.2941 32.0195 35.2941C28.0166 35.2941 24.3178 32.4016 24.3178 27.4196ZM7.05859 27.4196C7.05859 20.9682 12.2257 14.2193 20.3349 12.7059L23.3221 15.5294C20.3814 16.5773 16.1144 20.0696 15.8263 22.5845C19.1334 23.0764 21.6626 25.7807 21.6626 29.046C21.6626 33.0391 18.232 35.2941 14.7602 35.2941C10.7574 35.2941 7.05859 32.4016 7.05859 27.4196Z" />
                </svg>
                {quote && <p className="text-md leading-normal text-ellipsis line-clamp-4">{quote}</p>}
              </div>
              <figcaption className="pt-6 w-full flex justify-end">
                <div className="w-fit flex flex-col items-start">
                  {author && <strong className="text-base">{author}</strong>}
                  {authorTitle && <div className="text-sm">{authorTitle}</div>}
                </div>
              </figcaption>
            </figure>
          )}
        </div>
        {action && <GridLinkArrow bgColor={bgColor} action={action} />}
      </div>
    </div>
  )
})
