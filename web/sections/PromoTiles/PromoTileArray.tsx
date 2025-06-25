import type { PromoTileArrayData, PromoTileData } from '../../types/index'
import { PromoTile } from './PromoTile'
import { twMerge } from 'tailwind-merge'
import { Heading, Paragraph } from '@/core/Typography'

const PromoTileArray = ({
  data,
  anchor,
  className,
}: {
  data: PromoTileArrayData
  anchor?: string
  className?: string
}) => {
  const { title, hideTitle = false, ingress, group } = data

  if (!group) return null

  return (
    <section
      id={anchor}
      className={twMerge(
        `pb-page-content px-layout-md xl:px-layout-lg max-w-viewport mx-auto flex flex-col gap-6 justify-center`,
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
          gap-6
          justify-center
          items-center
          content-center
          md:grid
          md:grid-cols-2
          md:auto-rows-fr`}
      >
        {group?.map((tile: PromoTileData) => {
          return (
            <li key={tile.id} className="h-full w-full">
              <PromoTile {...tile} hasSectionTitle={!!title} />
            </li>
          )
        })}
      </ul>
    </section>
  )
}

export default PromoTileArray
