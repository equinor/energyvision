import styled from 'styled-components'
import { Heading } from '@components'
import SimpleCard from '../cards/SimpleCard'

import type { SubMenuGroupData } from '../../types/types'

const GroupWrapper = styled.div`
  margin: var(--space-3xLarge) 0;
  @media (min-width: 750px) {
    margin: var(--space-4xLarge) 0;
  }
`

const LinkGroup = styled.div`
  --min: 220px;
  --row-gap: var(--space-xLarge);
  --column-gap: var(--space-medium);

  padding: 0 var(--layout-paddingHorizontal-small);
  margin: 0 auto;
  max-width: var(--maxViewportWidth);
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, var(--min)), 1fr));
  grid-row-gap: var(--row-gap);
  grid-column-gap: var(--column-gap);
`
const ContentGroupHeader = styled.div`
  padding: 0 var(--layout-paddingHorizontal-medium) var(--space-xLarge);
  max-width: var(--maxViewportWidth);
  margin-left: auto;
  margin-right: auto;
`

type ContentGroupType = {
  group: SubMenuGroupData
}

const ContentGroup = ({ group }: ContentGroupType) => {
  const { label, links } = group
  return (
    <GroupWrapper>
      {label && (
        <ContentGroupHeader>
          <Heading size="xl" level="h2">
            {label}
          </Heading>
        </ContentGroupHeader>
      )}
      <LinkGroup>
        {links.map((link) => {
          const { id } = link
          return <SimpleCard data={link} key={id} />
        })}
      </LinkGroup>
    </GroupWrapper>
  )
}

export default ContentGroup
