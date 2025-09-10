import Blocks from '@/portableText/Blocks'
import type { PromoTileArrayData, PromoTileData } from '../../types/index'
import { PromoTile } from './PromoTile'
import { twMerge } from 'tailwind-merge'

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
        `mx-auto flex max-w-viewport flex-col justify-center gap-6 px-layout-md pb-page-content xl:px-layout-lg`,
        className,
      )}
    >
      {title && <Blocks value={title} variant="h2" className={hideTitle ? 'sr-only' : ''} />}
      {ingress && <Blocks variant="ingress" value={ingress} />}
      <ul
        className={` ${title && !hideTitle ? 'pt-6' : ''} flex w-full flex-col content-center items-center justify-center gap-6 md:grid md:auto-rows-fr md:grid-cols-2`}
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
