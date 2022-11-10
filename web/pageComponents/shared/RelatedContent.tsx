import { Fragment } from 'react'
import { Heading, Link, List } from '@components'
import type { RelatedLinksData, LinkData } from '../../types/types'
import { default as NextLink } from 'next/link'
import { getUrlFromAction } from '../../common/helpers/getUrlFromAction'
import styled from 'styled-components'

const StyledHeading = styled(Heading)`
  margin: var(--related-titleMargin, 0 0 var(--space-xLarge) 0);
  text-align: var(--related-titleAlign, left);
`

const { Item } = List

type RelatedContentProps = {
  data: RelatedLinksData
}

const RelatedContent = ({ data, ...rest }: RelatedContentProps) => {
  return (
    <aside {...rest}>
      <StyledHeading size="xl" level="h2">
        {data.title}
      </StyledHeading>
      <List unstyled>
        {data.links.length > 0 &&
          data.links.map((item: LinkData) => {
            const { id, label, type, extension, ariaLabel } = item

            const url = getUrlFromAction(item)
            if (!url) {
              console.warn(`Missing URL on 'RelatedContent' link with type: '${type}' and label: '${label}'`)
              return null
            }

            return (
              <Fragment key={id}>
                {type === 'internalUrl' ? (
                  <Item>
                    <NextLink href={url} passHref legacyBehavior>
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
