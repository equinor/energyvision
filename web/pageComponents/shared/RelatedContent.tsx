import { Fragment, HTMLAttributes } from 'react'
import { Heading, List } from '@components'
import type { RelatedLinksData, LinkData } from '../../types/types'
import styled from 'styled-components'
import ReadMoreLink from '../shared/ReadMoreLink'

const StyledHeading = styled(Heading)`
  margin: var(--related-titleMargin, 0 0 var(--space-xLarge) 0);
  text-align: var(--related-titleAlign, left);
`

const { Item } = List

type RelatedContentProps = {
  data: RelatedLinksData
} & HTMLAttributes<HTMLDivElement>

const RelatedContent = ({ data, ...rest }: RelatedContentProps) => {
  return (
    <aside {...rest}>
      <StyledHeading size="xl" level="h2">
        {data.title}
      </StyledHeading>
      <List unstyled>
        {data.links.length > 0 &&
          data.links.map((item: LinkData) => {
            return (
              <Fragment key={item.id}>
                <Item>
                  <ReadMoreLink action={item} variant="contentLink" />
                </Item>
              </Fragment>
            )
          })}
      </List>
    </aside>
  )
}

export default RelatedContent
