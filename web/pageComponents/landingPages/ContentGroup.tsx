import type { SubMenuGroupData, PromoTileData } from '../../types/index'
import { Typography } from '@core/Typography'
import { PromoTile } from '@sections/PromoTiles/PromoTile'

type ContentGroupType = {
  group: SubMenuGroupData
}

const ContentGroup = ({ group }: ContentGroupType) => {
  const { label, id, links } = group

  const transformedLinks: PromoTileData[] = links
    .filter((link) => link.id)
    .map((link) => ({
      id: link.id!,
      title: [],
      image: link.image,
      linkLabelAsTitle: true,
      action: {
        label: link.label,
        href: link.href ?? undefined,
        type: link.link ? 'internalUrl' : 'externalUrl',
        link: link.link
          ? {
              ...link.link,
              lang: 'en',
            }
          : undefined,
        anchorReference: undefined,
        ariaLabel: undefined,
      },
      designOptions: {
        background: { value: 'white-100', dark: false },
      },
    }))

  return (
    <section className="mx-0 my-16 md:my-32">
      {label && (
        <div className="mx-auto max-w-viewport pt-0 pb-xl px-layout-md">
          <Typography variant="xl" as="h2">
            {label}
          </Typography>
        </div>
      )}

      <ul
        className={`
                px-layout-sm
                mx-auto
                max-w-viewport
                grid
                grid-cols-3
                gap-x-6
                list-none`}
      >
        {transformedLinks.map((tile) => (
          <li key={tile.id} className="h-full w-full">
            <PromoTile {...tile} hasSectionTitle={!!label} variant="primary" />
          </li>
        ))}
      </ul>
    </section>
  )
}

export default ContentGroup
