import { Fragment, HTMLAttributes } from 'react'
import { Heading, List } from '@components'
import type { RelatedLinksData, LinkData } from '../../types/types'
import ReadMoreLink from '../shared/ReadMoreLink'

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
