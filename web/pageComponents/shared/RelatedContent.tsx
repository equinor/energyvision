import { HTMLAttributes } from 'react'
import { Heading } from '@components'
import type { RelatedLinksData, LinkData } from '../../types/index'
import { ResourceLink } from '@core/Link'
import { getUrlFromAction } from '../../common/helpers'
import { getLocaleFromName } from '../../lib/localization'

type RelatedContentProps = {
  data: RelatedLinksData
} & HTMLAttributes<HTMLDivElement>

const RelatedContent = ({ data, ...rest }: RelatedContentProps) => {
  return (
    <aside {...rest}>
      <Heading className="pb-4 text-left" size="xl" level="h2">
        {data.title}
      </Heading>
      <ul>
        {data.links.length > 0 &&
          data.links.map((item: LinkData) => {
            const url = getUrlFromAction(item)
            return (
              <li key={item.id}>
                <ResourceLink
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
