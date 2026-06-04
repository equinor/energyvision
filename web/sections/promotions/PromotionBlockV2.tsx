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
} from '@/lib/helpers/getCommonUtilities'
import { getUrlFromAction } from '@/lib/helpers/getUrlFromAction'
import Blocks from '@/portableText/Blocks'
import {
  type ColorKeys,
  colorKeyToUtilityMap,
} from '@/styles/colorKeyToUtilityMap'
import type { LayoutGrid } from '@/types/designOptionsTypes'

export type PromotionBlockProps = {
  title: PortableTextBlock[]
  ingress: PortableTextBlock[]
  designOptions: {
    background?: {
      backgroundUtility?: ColorKeys
    }
    foreground?: ColorKeys
    layoutGrid?: LayoutGrid
    gridColumns?: GridColumnVariant
    layoutDirection?: PromotionLayoutDirection
  }
  promoteList?: any[]
  id?: string
  anchor?: string
  className?: string
}

const getVariantOnType = (type: string): PromotionVariant => {
  switch (type) {
    case 'promoteExternalLinkV2':
    case 'externalLinkItem':
    case 'externalUrl':
    case 'link':
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
    let templateColumns =
      promoteList?.length < 3 ? promoteList?.length.toString() : gridColumns

    if (layoutGrid === 'lg') {
      if (layoutDirection === 'row') {
        templateColumns = '2'
      } else {
        templateColumns =
          promoteList?.length < 3 ? promoteList?.length.toString() : '3'
      }
    }

    const cols = getGridTemplateColumns(templateColumns as GridColumnVariant)
    const bg =
      colorKeyToUtilityMap[backgroundUtility ?? 'white-100']?.background

    return (
      <section
        ref={ref}
        id={anchor}
        className={twMerge(`${id ? 'scroll-mt-topbar' : ''} ${bg}`, className)}
      >
        <div className='mx-auto max-w-content'>
          {title && (
            <Blocks
              variant='h2'
              value={title}
              className='px-layout-sm lg:px-layout-lg'
            />
          )}
          <div className='flex flex-col gap-6'>
            {ingress && (
              <Blocks
                variant='ingress'
                value={ingress}
                className={'px-layout-sm lg:px-layout-lg'}
              />
            )}
            <ul className={`${px} grid ${cols} auto-rows-fr gap-4`}>
              {promoteList.map((promotion: any) => {
                const variant = getVariantOnType(promotion?.type)
                const href = getUrlFromAction({
                  ...promotion,
                  type: variant === 'default' ? 'internalUrl' : variant,
                })

                return (
                  <li key={promotion.id}>
                    <Promotion
                      variant={variant}
                      gridColumns={gridColumns}
                      background={foreground}
                      title={promotion.label}
                      image={promotion.image}
                      href={href || ''}
                      layoutDirection={layoutDirection}
                      hasSectionTitle={!!title}
                    />
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </section>
    )
  },
)
