import { Fragment } from 'react'
import { Heading, Link, List } from '@components'
import type { RelatedLinksData, LinkData } from '../../types/types'
import { default as NextLink } from 'next/link'

const { Item } = List

type RelatedContentProps = {
  data: RelatedLinksData
}

const RelatedContent = ({ data }: RelatedContentProps) => {
  return (
    <aside>
      <Heading size="lg" level="h2">
        {data.title}
      </Heading>
      <List unstyled>
        {data.links.length > 0 &&
          data.links.map((item: LinkData) => {
            const { id, label, type, link, href, extension } = item
            if (type === 'internalUrl' && link?.slug === undefined) {
              console.warn('An internal link is missing slug', label)
            }
            // @TODO Internal link beyond news articles
            const url = type === 'internalUrl' ? `/news/${link?.slug}` : href
            if (!url) {
              console.warn('Something weird happened. A link is missing href', label)
              return
            }

            return (
              <Fragment key={id}>
                {type === 'internalUrl' ? (
                  <Item>
                    <NextLink href={url} passHref>
                      <Link variant="contentLink" type={type}>
                        {label}
                      </Link>
                    </NextLink>
                  </Item>
                ) : (
                  <Item>
                    <Link variant="contentLink" type={type} href={url}>
                      {label} {extension && `(${extension.toUpperCase()})`}
                    </Link>
                  </Item>
                )}
              </Fragment>
            )
          })}
      </List>
    </aside>
  )
}

export default RelatedContent
