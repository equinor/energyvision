import { Fragment, HTMLAttributes } from 'react'
import { Heading, List } from '@components'
import type { RelatedLinksData, LinkData } from '../../types/index'
import { ResourceLink } from '@core/Link'
import { getUrlFromAction } from '../../common/helpers'
import { getLocaleFromName } from '../../lib/localization'

const { Item } = List

type RelatedContentProps = {
  data: RelatedLinksData
} & HTMLAttributes<HTMLDivElement>

const RelatedContent = ({ data, ...rest }: RelatedContentProps) => {
  return (
    <aside {...rest}>
      <Heading className="pb-4 text-left" size="xl" level="h2">
        {data.title}
      </Heading>
      <List unstyled>
        {data.links.length > 0 &&
          data.links.map((item: LinkData) => {
            const url = getUrlFromAction(item)
            return (
              <Fragment key={item.id}>
                <Item>
                  <ResourceLink
                    href={url as string}
                    {...(item.link?.lang && { locale: getLocaleFromName(item.link?.lang) })}
                    type={item.type}
                  >
                    {`${item.label} ${item.extension ? `(${item.extension.toUpperCase()})` : ''}`}
                  </ResourceLink>
                </Item>
              </Fragment>
            )
          })}
      </List>
    </aside>
  )
}

export default RelatedContent
