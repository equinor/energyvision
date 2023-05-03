/* eslint-disable */
import type { StoryFn, Meta } from '@storybook/react'
import { Text, TextProps } from '@components'
import styled from 'styled-components'

const Wrapper = styled.div`
  margin: var(--spacing-xLarge);
  display: grid;
  grid-gap: var(--space-medium);
  grid-template-columns: 1fr;
`

const DarkBackground = styled.div`
  background: hsl(206, 34%, 14%);
  padding: 2rem;
`

export default {
  title: 'Components/Text',
  component: Text,

  parameters: {
    docs: {
      description: {
        component: `A Text component is used for text.
        `,
      },
    },
  },
} as Meta

export const Default: StoryFn<TextProps> = (args) => (
  <Text {...args}>
    Dogger Bank Wind Farm and GE Renewable Energy have today, 22 September, announced contracts confirming the 13MW
    Haliade-X turbine for the Dogger Bank A and Dogger Bank B phases of the world’s largest offshore wind farm.
  </Text>
)

Default.storyName = 'Default'

export const Sizes: StoryFn<TextProps> = () => (
  <Wrapper>
    <Text>This is just an ordinary piece of text.</Text>
    <Text size="md">
      This piece of text is a lead paragraph. Or a preamble. Or an ingress. Or whatever you may call it.
    </Text>
  </Wrapper>
)

Sizes.storyName = 'Sizes'
Sizes.parameters = {
  docs: {
    storyDescription: `A lead paragraph should use a bigger font size`,
  },
}

export const MultipleParagraphs: StoryFn<TextProps> = () => (
  <>
    <Text>
      The Johan Sverdrup field came on stream on 5 October 2019 – more than two months ahead of schedule and with
      investment costs that were NOK 40 billion lower than the original estimate in the plan for development and
      operation (PDO).
    </Text>
    <Text>
      Johan Sverdrup phase 2 includes the construction of a subsea production system, reconstruction of the existing
      riser platform and a new p rocessing platform (P2).
    </Text>
  </>
)

MultipleParagraphs.storyName = 'Multiple paragraphs'
MultipleParagraphs.parameters = {
  docs: {
    storyDescription: `A paragraph followed by another paragraph should have some margins. How should this look?`,
  },
}

export const InvertedText: StoryFn<TextProps> = () => (
  <DarkBackground>
    <Text inverted>
      This text has its color inverted by manually setting the inverted prop to true. Perfect for use on darker
      backgrounds.
    </Text>
    <Text inverted>Note that this is handled automatically when using a BackgroundContainer.</Text>
  </DarkBackground>
)

InvertedText.storyName = 'Inverted text color'
InvertedText.parameters = {
  docs: {
    storyDescription: `You can manually set the text color to be white using the inverted prop.`,
  },
}
