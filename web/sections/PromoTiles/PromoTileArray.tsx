import { twMerge } from 'tailwind-merge'
import Blocks from '@/portableText/Blocks'
import type { PromoTileArrayData, PromoTileData } from '../../types/index'
import { PromoTile } from './PromoTile'

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
        `flex max-w-content flex-col justify-center gap-6 lg:mx-auto`,
        className,
      )}
    >
      <div className='w-full px-layout-sm md:px-layout-md xl:px-layout-lg'>
        {title && (
          <Blocks
            value={title}
            variant='h2'
            className={hideTitle ? 'sr-only' : ''}
          />
        )}
        {ingress && <Blocks variant='ingress' value={ingress} />}
        <ul
          className={` ${
            title && !hideTitle ? 'pt-6' : ''
          } flex w-full flex-col gap-6 md:grid md:auto-rows-fr md:grid-cols-2 lg:content-center lg:items-center lg:justify-center`}
        >
          {group?.map((tile: PromoTileData) => {
            return (
              <li key={tile.id} className='h-full w-full'>
                <PromoTile {...tile} hasSectionTitle={!!title} />
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}

export default PromoTileArray
