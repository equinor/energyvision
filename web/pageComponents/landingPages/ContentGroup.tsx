import { Typography } from '@/core/Typography'
import { PromoTile } from '@/sections/PromoTiles/PromoTile'

export type ContentGroupData = {
  id: string
  label?: string
  links: Array<{
    id: string
    label: string
    image: any
    href?: string | null
    link?: {
      type: string
      slug: string
      lang?: string
    }
  }>
}

type ContentGroupProps = {
  group: {
    id: string
    label?: string
    links: any[]
  }
}

const ContentGroup = ({ group }: ContentGroupProps) => {
  const { links, label, id } = group

  const promoTiles = Array.isArray(links)
    ? links.map((tile) => ({
        ...tile,
        action: {
          label: tile.label,
          href: tile.href ?? tile.link?.slug ?? '/',
          type: tile.link ? 'internalUrl' : 'externalUrl',
          link: tile.link ?? null,
          anchorReference: null,
          ariaLabel: null,
        },
        title: [],
        designOptions: {
          background: {
            value: 'white-100',
            dark: false,
          },
        },
        linkLabelAsTitle: true,
      }))
    : []

  return (
    <section className="mx-0 my-16 md:my-32" id={id}>
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
          gap-6
          list-none`}
      >
        {promoTiles.map((tile) => {
          return (
            <li key={tile.id} className="h-full w-full">
              <PromoTile {...tile} hasSectionTitle={!!label} variant="primary" />
            </li>
          )
        })}
      </ul>
    </section>
  )
}

export default ContentGroup
