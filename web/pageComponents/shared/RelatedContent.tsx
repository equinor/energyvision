import { HTMLAttributes } from 'react'
import type { RelatedLinksData, LinkData } from '../../types/index'
import { ResourceLink } from '@/core/Link'
import { Typography } from '@/core/Typography'
import { getUrlFromAction } from '../../common/helpers'
import { getLocaleFromName } from '../../lib/localization'
import { twMerge } from 'tailwind-merge'

type RelatedContentProps = {
  data: RelatedLinksData
} & HTMLAttributes<HTMLDivElement>

const RelatedContent = ({ data, className = '', ...rest }: RelatedContentProps) => {
  return (
    <aside className={twMerge(`w-full px-layout-lg py-20`, className)} {...rest}>
      <Typography className="pb-4 text-left" variant="xl" as="h2">
        {data.title}
      </Typography>
      <ul className="max-w-text">
        {data.links.length > 0 &&
          data.links.map((item: LinkData) => {
            const url = getUrlFromAction(item)
            return (
              <li key={item.id}>
                <ResourceLink
                  href={url as string}
                  {...(item.link?.lang && { hrefLang: getLocaleFromName(item.link?.lang) })}
                  type={item.type}
                  extension={item.extension}
                  showExtensionIcon={true}
                >
                  {`${item.label}`}
                </ResourceLink>
              </li>
            )
          })}
      </ul>
    </aside>
  )
}

export default RelatedContent
