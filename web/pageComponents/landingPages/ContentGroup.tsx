import styled from 'styled-components'
import { Card, Heading } from '@components'
import type { SubMenuGroupData } from '../../types/types'

const { Title, Header, Action, Arrow, CardLink } = Card

const StyledContentGroup = styled.div`
  margin: var(--space-3xLarge) 0;
`

const TempGroup = styled.div`
  --min: 15ch;
  --row-gap: 2rem;
  --column-gap: 1rem;
  padding: 0 var(--layout-paddingHorizontal-small);
  margin: 0 auto;
  max-width: var(--maxViewportWidth);
  display: grid;
  /* grid-template-columns: repeat(auto-fit, min); */
  grid-template-columns: repeat(auto-fill, minmax(min(100%, var(--min)), 1fr));
  grid-row-gap: var(--row-gap);
  grid-column-gap: var(--column-gap);
`
const ContentGroupHeader = styled.div`
  padding: 0 var(--layout-paddingHorizontal-medium) var(--space-large);
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
    <StyledContentGroup>
      {label && (
        <ContentGroupHeader>
          <Heading size="xl" level="h2">
            {label}
          </Heading>
        </ContentGroupHeader>
      )}
      <TempGroup>
        {links.map((link) => {
          return (
            <CardLink key={link.id}>
              <Card>
                <Header>
                  <Title>{link.label}</Title>
                </Header>
                <Action>
                  <Arrow />
                </Action>
              </Card>
            </CardLink>
          )
        })}
      </TempGroup>
    </StyledContentGroup>
  )
}

export default ContentGroup
