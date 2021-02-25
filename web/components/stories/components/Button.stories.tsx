import { Story, Meta } from '@storybook/react/types-6-0'
import styled from 'styled-components'
import { Button, ButtonProps } from '@components'
import { Icon } from '@equinor/eds-core-react'
import { arrow_forward, help_outline } from '@equinor/eds-icons'

const Wrapper = styled.div`
  margin: 32px;
  display: grid;
  grid-gap: 32px;
  grid-template-columns: repeat(4, fit-content(100%));
`

export default {
  title: 'Components/Button',
  component: Button,
} as Meta

export const Default: Story<ButtonProps> = (args) => <Button {...args}>This is a button</Button>

export const Contained: Story = () => (
  <Wrapper>
    <Button variant="contained">Contained</Button>
  </Wrapper>
)

Contained.parameters = {
  docs: {
    storyDescription: `Used as primary buttons.`,
  },
}

export const Outlined: Story = () => (
  <Wrapper>
    <Button variant="outlined">Outlined</Button>
  </Wrapper>
)

Outlined.parameters = {
  docs: {
    storyDescription: `Used as secondary buttons.`,
  },
}

export const Ghost: Story = () => (
  <Wrapper>
    <Button variant="ghost">
      Read the story
      <Icon data={arrow_forward} />
    </Button>
  </Wrapper>
)

Ghost.parameters = {
  docs: {
    storyDescription: `Used for 'read more' links.`,
  },
}

export const GhostIcon: Story = () => (
  <Wrapper>
    <Button variant="ghost_icon">
      <Icon data={arrow_forward} />
    </Button>
    <Button variant="ghost_icon">
      <Icon data={help_outline} />
    </Button>
  </Wrapper>
)

GhostIcon.parameters = {
  docs: {
    storyDescription: `Used for icon links and actions.`,
  },
}
