import styled from 'styled-components'
import { Card } from '@components'
import type { SubMenuGroupData } from '../../types/types'

const { Title, Header, Action, Arrow, CardLink } = Card

const StyledContentGroup = styled.div``

const TempGroup = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, 15rem);
  grid-row-gap: 4rem;
  grid-column-gap: 2rem;
`

type ContentGroupType = {
  group: SubMenuGroupData
}

const ContentGroup = ({ group }: ContentGroupType) => {
  const { label, links } = group
  return (
    <StyledContentGroup>
      {label && <h2>{label}</h2>}
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
