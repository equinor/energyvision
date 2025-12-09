import { HTMLAttributes } from 'react'
import type { RelatedLinksData, LinkData } from '../../types/index'
import { ResourceLink } from '@core/Link'
import { Typography } from '@core/Typography'
import { getUrlFromAction } from '../../common/helpers'
import { getLocaleFromName } from '../../lib/localization'

type RelatedContentProps = {
  data: RelatedLinksData
} & HTMLAttributes<HTMLDivElement>

const RelatedContent = ({ data, ...rest }: RelatedContentProps) => {
  return (
    <aside {...rest}>
      <Typography className="pb-4 text-left" variant="xl" as="h2">
        {data.title}
      </Typography>
      <ul>
        {data.links.length > 0 &&
          data.links.map((item: LinkData) => {
            const url = getUrlFromAction(item)
            return (
              <li key={item.id}>
                <ResourceLink
                  {...item}
                  href={url as string}
                  {...(item.link?.lang && { locale: getLocaleFromName(item.link?.lang) })}
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
