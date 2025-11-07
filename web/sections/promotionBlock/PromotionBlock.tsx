import { Promotion, PromotionLayoutDirection, PromotionVariant } from '@core/Promotion/Promotion'
import { Heading } from '@core/Typography'
import { PortableTextBlock } from '@portabletext/types'
import {
  getGridTemplateColumns,
  getLayoutPx,
  GridColumnVariant,
  LayoutPxVariant,
} from '../../common/helpers/getCommonUtillities'
import IngressText from '../../pageComponents/shared/portableText/IngressText'
import { forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'
import { ColorKeys, colorKeyToUtilityMap } from '../../styles/colorKeyToUtilityMap'

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
    case 'promoteTopicsV2':
    default:
      return 'default'
  }
}

const PromotionBlock = forwardRef<HTMLDivElement, PromotionBlockProps>(function PromotionBlock(
  { title, ingress, promoteList = [], id, type, anchor, className = '', designOptions },
  ref,
) {
  const { background, foreground, layoutGrid, gridColumns, layoutDirection } = designOptions

  const { backgroundUtility } = background || {}

  const px = getLayoutPx(layoutGrid ?? 'lg')
  const cols = getGridTemplateColumns(gridColumns ?? '3')
  const bg = colorKeyToUtilityMap[backgroundUtility ?? 'white-100']?.background

  return (
    <section ref={ref} id={anchor} className={twMerge(`${id ? 'scroll-mt-topbar' : ''} ${bg}`, className)}>
      {title && <Heading as="h2" variant="xl" value={title} className={'pb-lg px-layout-sm lg:px-layout-lg'} />}
      <div className="flex flex-col gap-6 pb-page-content mx-auto max-w-viewport">
        {ingress && <IngressText value={ingress} className={'pb-md px-layout-sm lg:px-layout-lg'} />}
        <ul className={`px-layout-sm ${px} grid ${cols} auto-rows-auto gap-4`}>
          {promoteList.map((promotion: any) => {
            const variant = getVariantOnType(type)
            const href = variant === 'externalLink' ? promotion.link.href : promotion.slug
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
})

export default PromotionBlock
