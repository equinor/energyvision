/* eslint-disable */
import type { StoryFn, Meta } from '@storybook/react'
import { List, ListProps } from '@components'
import styled from 'styled-components'

export default {
  title: 'Components/List',
  component: List,
  subcomponents: {
    Item: List.Item,
  },
  parameters: {
    docs: {
      description: {
        component: `A List component is used for lists, both bullet lists and numbered.
        `,
      },
    },
  },
} as Meta

export const Default: StoryFn<ListProps> = (args) => (
  <List {...args}>
    <List.Item>
      One barrel of oil produced at Johan Sverdrup during the first year has emitted 0.17kg CO₂ – almost 100 times lower
      than the global average (measured in kilogrammes of CO₂ per barrel produced). This is mainly due to the power
      supply from shore.
    </List.Item>
    <List.Item>
      The Johan Sverdrup field came on stream on 5 October 2019 – more than two months ahead of schedule and with
      investment costs that were NOK 40 billion lower than the original estimate in the plan for development and
      operation (PDO).
    </List.Item>
    <List.Item>
      Johan Sverdrup phase 2 includes the construction of a subsea production system, reconstruction of the existing
      riser platform and a new p rocessing platform (P2).
    </List.Item>
    <List.Item>
      Phase 2 will also accommodate a converter plant for shore-based power supply. The plant will distribute power to
      other fields on the Utsira High: Edvard Grieg, Ivar Aasen, Gina Krog and Sleipner.
    </List.Item>
    <List.Item>
      The four existing platforms on the Johan Sverdrup field are already receiving power from shore. Production start
      is expected in the fourth quarter of 2022.
    </List.Item>
  </List>
)

Default.storyName = 'Default'

export const Numbered: StoryFn<ListProps> = () => (
  <List variant="numbered">
    <List.Item>
      One barrel of oil produced at Johan Sverdrup during the first year has emitted 0.17kg CO₂ – almost 100 times lower
      than the global average (measured in kilogrammes of CO₂ per barrel produced). This is mainly due to the power
      supply from shore.
    </List.Item>
    <List.Item>
      The Johan Sverdrup field came on stream on 5 October 2019 – more than two months ahead of schedule and with
      investment costs that were NOK 40 billion lower than the original estimate in the plan for development and
      operation (PDO).
    </List.Item>
    <List.Item>
      Johan Sverdrup phase 2 includes the construction of a subsea production system, reconstruction of the existing
      riser platform and a new p rocessing platform (P2).
    </List.Item>
    <List.Item>
      Phase 2 will also accommodate a converter plant for shore-based power supply. The plant will distribute power to
      other fields on the Utsira High: Edvard Grieg, Ivar Aasen, Gina Krog and Sleipner.
    </List.Item>
    <List.Item>
      The four existing platforms on the Johan Sverdrup field are already receiving power from shore. Production start
      is expected in the fourth quarter of 2022.
    </List.Item>
  </List>
)

export const Unstyled: StoryFn<ListProps> = () => {
  const Box = styled.li`
    border: 1px solid grey;
    padding: var(--space-medium);
  `
  const StyledList = styled(List)`
    display: grid;
    grid-gap: var(--space-xLarge);
    grid-template-columns: repeat(4, fit-content(100%));
  `

  return (
    <StyledList unstyled>
      <Box>1</Box>
      <Box>2</Box>
      <Box>3</Box>
      <Box>4</Box>
    </StyledList>
  )
}

Unstyled.parameters = {
  docs: {
    storyDescription: `Sometimes a list is more of a semantically correct thing to use rather than visually.
    The attribute unstyled makes that easy.`,
  },
}
