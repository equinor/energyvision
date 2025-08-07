import { PromoTile, PromoTileProps } from './PromoTile'
import { twMerge } from 'tailwind-merge'
import { Heading, Paragraph } from '@core/Typography'
import { PortableTextBlock } from '@portabletext/types'

export type PromoTileArrayProps = {
  type: string
  id: string
  group: PromoTileProps[]
  useHorizontalScroll: boolean
  title?: PortableTextBlock[]
  ingress?: PortableTextBlock[]
  hideTitle?: boolean
  anchor?: string
  className?: string
  promoTileVariant?: 'leftRight' | 'topBottom'
}

const PromoTileArray = ({
  promoTileVariant = 'leftRight',
  title,
  hideTitle = false,
  ingress,
  group,
  anchor,
  className,
}: PromoTileArrayProps) => {
  if (!group) return null

  let gridCols = `${
    group.length % 2 === 0 && group.length < 5
      ? 'md:grid-cols-2'
      : `md:grid-cols-2 ${promoTileVariant === 'topBottom' ? 'xl:grid-cols-3' : ''}`
  }`
  if (group.length === 4 && promoTileVariant === 'topBottom') {
    gridCols = `grid md:grid-cols-2 xl:grid-cols-4`
  }
  return (
    <section
      id={anchor}
      className={twMerge(
        `pb-page-content px-layout-sm lg:px-layout-md max-w-viewport mx-auto flex flex-col gap-6 justify-center`,
        className,
      )}
    >
      {title && <Heading value={title} variant="h3" as="h2" className={hideTitle ? 'sr-only' : ''} />}
      {ingress && <Paragraph value={ingress} className="max-w-text text-pretty pb-xl" />}
      <ul
        className={`
          ${title && !hideTitle ? 'pt-6' : ''}
          w-full
          flex
          flex-col
          md:grid 
          ${gridCols}
          md:auto-rows-fr
          gap-x-4
          gap-y-6
          justify-center
          items-center
          content-center`}
      >
        {group?.map((tile: PromoTileProps) => {
          return (
            <li key={tile.id} className="h-full w-full">
              <PromoTile variant={promoTileVariant} {...tile} hasSectionTitle={!!title} />
            </li>
          )
        })}
      </ul>
    </section>
  )
}

export default PromoTileArray
