import { Heading, Link, List } from '@components'
import type { RelatedLinksData } from '../../types/types'

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
          data.links.map((item) => {
            const isExternal = item.type === 'externalUrl'
            // @TODO: a generic way to resolve internal links?
            // @TODO: Both external and internal links are wrapped in next/link
            const href = item.type === 'externalUrl' ? item.href : `/news/${item.link?.slug}`
            return (
              <Item key={item.id}>
                {/*  @TODO: What if href is undefined?  */}
                <Link variant="contentLink" href={href || '/'} external={isExternal}>
                  {item.label}
                </Link>
              </Item>
            )
          })}
      </List>
    </aside>
  )
}

export default RelatedContent
