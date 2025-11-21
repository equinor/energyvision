import type { PortableTextBlock } from '@portabletext/types'
import { forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'
import {
  Promotion,
  type PromotionLayoutDirection,
  type PromotionVariant,
} from '@/core/Promotion/Promotion'
import {
  type GridColumnVariant,
  getGridTemplateColumns,
  getLayoutPx,
  type LayoutPxVariant,
} from '@/lib/helpers/getCommonUtilities'
import Blocks from '@/portableText/Blocks'
import {
  type ColorKeys,
  colorKeyToUtilityMap,
} from '@/styles/colorKeyToUtilityMap'

export type PromotionBlockProps = {
  title: PortableTextBlock[]
  ingress: PortableTextBlock[]
  designOptions: {
    background?: {
      backgroundUtility?: ColorKeys
    }
    foreground?: ColorKeys
    layoutGrid?: LayoutPxVariant
    gridColumns?: GridColumnVariant
    layoutDirection?: PromotionLayoutDirection
  }
  promoteList?: any[]
  id?: string
  type: string
  anchor?: string
  className?: string
}

const getVariantOnType = (type: string): PromotionVariant => {
  switch (type) {
    case 'promoteExternalLinkV2':
      return 'externalLink'
    default:
      return 'default'
  }
}

export const PromotionBlockV2 = forwardRef<HTMLDivElement, PromotionBlockProps>(
  function PromotionBlockV2(
    {
      title,
      ingress,
      promoteList = [],
      id,
      type,
      anchor,
      className = '',
      designOptions,
    },
    ref,
  ) {
    const { background, foreground, layoutGrid, gridColumns, layoutDirection } =
      designOptions

    const { backgroundUtility } = background || {}

    const px = getLayoutPx(layoutGrid ?? 'lg')
    const cols = getGridTemplateColumns(gridColumns ?? '3')
    const bg =
      colorKeyToUtilityMap[backgroundUtility ?? 'white-100']?.background

    return (
      <section
        ref={ref}
        id={anchor}
        className={twMerge(`${id ? 'scroll-mt-topbar' : ''} ${bg}`, className)}
      >
        {title && (
          <Blocks
            variant='h2'
            value={title}
            blockClassName={'px-layout-sm lg:px-layout-lg'}
          />
        )}
        <div className='flex flex-col gap-6 pb-page-content'>
          {ingress && (
            <Blocks
              variant='ingress'
              value={ingress}
              className={'px-layout-sm lg:px-layout-lg'}
            />
          )}
          <ul
            className={`px-layout-sm ${px} grid ${cols} auto-rows-auto gap-4`}
          >
            {promoteList.map((promotion: any) => {
              const variant = getVariantOnType(type)
              const href =
                variant === 'externalLink'
                  ? promotion.link.href
                  : promotion.slug
              return (
                <li key={promotion.id}>
                  <Promotion
                    variant={getVariantOnType(type)}
                    gridColumns={gridColumns}
                    background={foreground}
                    title={promotion.title}
                    image={promotion.image}
                    href={href}
                    layoutDirection={layoutDirection}
                  />
                </li>
              )
            })}
          </ul>
        </div>
      </section>
    )
  },
)
