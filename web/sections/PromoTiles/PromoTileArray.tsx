import type { PromoTileArrayData, PromoTileData } from '../../types/types'
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
  if (!data.group) return null

  return (
    <section id={anchor} className={twMerge(`pb-page-content px-4 lg:px-layout-lg max-w-viewport mx-auto`, className)}>
      <ul
        className={`
        flex
        flex-col
        gap-6
        justify-center
        content-center
        md:grid
        md:grid-cols-2
        md:auto-rows-fr`}
      >
        {data.group.map((tile: PromoTileData) => {
          return (
            <li key={tile.id}>
              <PromoTile {...tile} />
            </li>
          )
        })}
      </ul>
    </section>
  )
}

export default PromoTileArray
