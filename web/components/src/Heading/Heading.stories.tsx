/* eslint-disable */
import { Story, Meta } from '@storybook/react'
import { Heading, HeadingProps } from '@components'
import styled from 'styled-components'
export default {
  title: 'Components/Heading',
  component: Heading,

  parameters: {
    docs: {
      description: {
        component: `A Heading component is used for headings.
        `,
      },
    },
  },
} as Meta

const Wrapper = styled.div`
  margin: var(--space-xLarge);
  display: grid;
  grid-template-columns: 1fr;
`

export const Default: Story<HeadingProps> = (args) => <Heading {...args}>Have a nice day</Heading>

Default.storyName = 'Default'

export const HeaderLevels: Story<HeadingProps> = () => (
  <Wrapper>
    <Heading level="h1" size="2xl">
      Renewables and low-carbon{' '}
    </Heading>
    <Heading level="h2" size="xl">
      Renewables and low-carbon{' '}
    </Heading>
    <Heading level="h3" size="lg">
      Renewables and low-carbon{' '}
    </Heading>
    <Heading level="h4" size="md">
      Renewables and low-carbon{' '}
    </Heading>
    <Heading level="h5" size="sm">
      Renewables and low-carbon{' '}
    </Heading>
    <Heading level="h6" size="xs">
      Renewables and low-carbon{' '}
    </Heading>
  </Wrapper>
)

HeaderLevels.storyName = 'Header levels'

export const FontWeight: Story<HeadingProps> = () => (
  <Wrapper>
    <Heading level="h1" size="2xl">
      I'm bold
    </Heading>
    <Heading level="h1" size="2xl" regular>
      I'm regular
    </Heading>
  </Wrapper>
)
FontWeight.storyName = 'Font weight'

FontWeight.parameters = {
  docs: {
    storyDescription: `The largest font size, 2xl, can be either bold or regular`,
  },
}

export const Sizes: Story<HeadingProps> = () => (
  <Wrapper>
    <Heading level="h1" size="xs">
      We are all h1 headers
    </Heading>
    <Heading level="h1" size="sm">
      We are all h1 headers
    </Heading>
    <Heading level="h1" size="md">
      We are all h1 headers
    </Heading>
    <Heading level="h1" size="lg">
      We are all h1 headers
    </Heading>
    <Heading level="h1" size="xl">
      We are all h1 headers
    </Heading>
    <Heading level="h1" size="2xl">
      We are all h1 headers
    </Heading>
  </Wrapper>
)

Sizes.parameters = {
  docs: {
    storyDescription: `You are free to adjust the size according to what you need`,
  },
}

export const Long: Story<HeadingProps> = () => (
  <Wrapper>
    <Heading level="h6" size="xs">
      Equinor is in a unique position to make a difference in the global energy future. We will seize this opportunity.
    </Heading>
    <Heading level="h5" size="sm">
      Equinor is in a unique position to make a difference in the global energy future. We will seize this opportunity.
    </Heading>
    <Heading level="h4" size="md">
      Equinor is in a unique position to make a difference in the global energy future. We will seize this opportunity.
    </Heading>
    <Heading level="h3" size="lg">
      Equinor is in a unique position to make a difference in the global energy future. We will seize this opportunity.
    </Heading>
    <Heading level="h2" size="xl">
      Equinor is in a unique position to make a difference in the global energy future. We will seize this opportunity.
    </Heading>
    <Heading level="h1" size="2xl">
      Equinor is in a unique position to make a difference in the global energy future. We will seize this opportunity.
    </Heading>
  </Wrapper>
)

Long.storyName = 'With a long text'

export const Uppercase: Story<HeadingProps> = () => (
  <Heading uppercase level="h1" size="xs">
    I'm uppercase
  </Heading>
)
