import { Heading, Link, List } from '@components'
import type { RelatedLinksData, LinkData } from '../../types/types'

const { Item } = List

type RelatedContentProps = {
  data: RelatedLinksData
}

const RelatedContent = ({ data }: RelatedContentProps) => {
  return (
    <aside>
      <Heading size="lg" level="h2" center>
        {data.title}
      </Heading>
      <List unstyled>
        {data.links.length > 0 &&
          data.links.map((item: LinkData) => {
            const { id, label, type, link, href, extension = null } = item
            if (type === 'internalUrl' && link?.slug === undefined) {
              console.warn('An internal link is missing slug', label)
            }
            // @TODO Internal link beyond news articles
            const url = type === 'internalUrl' ? `/news/${link?.slug}` : href
            return (
              <Item key={id}>
                <Link variant="contentLink" type={type} href={url || '/'}>
                  {label} {extension && `(${extension.toUpperCase()})`}
                </Link>
              </Item>
            )
          })}
      </List>
    </aside>
  )
}

export default RelatedContent
