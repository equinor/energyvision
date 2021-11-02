import { Fragment } from 'react'
import { Heading, Link, List } from '@components'
import type { RelatedLinksData, LinkData } from '../../types/types'
import { default as NextLink } from 'next/link'
import { getUrlFromAction } from '../../common/helpers/getUrlFromAction'

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
            const { id, label, type, isStatic, extension, ariaLabel } = item

            const url = getUrlFromAction(item)
            if (!url) {
              console.warn(`Missing URL on 'RelatedContent' link with type: '${type}' and label: '${label}'`)
              return null
            }

            return (
              <Fragment key={id}>
                {type === 'internalUrl' || isStatic ? (
                  <Item>
                    <NextLink href={url} passHref>
                      <Link variant="contentLink" type={type} aria-label={ariaLabel}>
                        {label}
                      </Link>
                    </NextLink>
                  </Item>
                ) : (
                  <Item>
                    <Link variant="contentLink" type={type} href={url} aria-label={ariaLabel}>
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
