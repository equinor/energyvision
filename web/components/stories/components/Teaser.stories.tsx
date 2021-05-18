/* eslint-disable */
import { Story, Meta } from '@storybook/react'
import { Teaser, TeaserProps, Heading, Text, Link } from '@components'
import { ImagePlaceholder } from './helpers/styles'

export default {
  title: 'Components/Teaser',
  component: Teaser,
  viewMode: 'story',
  subcomponents: {
    Media: Teaser.Media,
    Content: Teaser.Content,
    Eyebrow: Teaser.Eyebrow,
  },
  parameters: {
    docs: {
      description: {
        component: `A <code>Teaser</code> component is used to highlight and link to other
        content.
        `,
      },
    },
  },
} as Meta

export const Default: Story<TeaserProps> = (args) => (
  <Teaser {...args}>
    <Teaser.Media>
      <ImagePlaceholder height="150px" />
    </Teaser.Media>
    <Teaser.Content>
      <Teaser.Eyebrow>Some people are still disputing global warming</Teaser.Eyebrow>
      <Heading level="h2" size="xl">
        We’re acting on it. Here are our results.
      </Heading>
      <Text size="md">
        We’re one of the world’s most CO2-efficient producers of oil and gas and we are proactively investing in
        renewables. We report openly on all our sustainability priorities and performance.
      </Text>
      <Link variant="readMore" href="/">
        Read more
      </Link>
    </Teaser.Content>
  </Teaser>
)

Default.storyName = 'Default'

export const WithMedia: Story<TeaserProps> = ({}) => (
  <Teaser>
    <Teaser.Media>
      <ImagePlaceholder height="150px" />
    </Teaser.Media>
    <Teaser.Content>Text content</Teaser.Content>
  </Teaser>
)

WithMedia.storyName = 'With media'
WithMedia.parameters = {
  docs: {
    storyDescription: `A <code>Teaser</code> component with image or video. Select "canvas" mode for this story to see different variations.`,
  },
}

export const WithEyebrow: Story<TeaserProps> = ({}) => (
  <Teaser>
    <Teaser.Media>
      <ImagePlaceholder height="150px" />
    </Teaser.Media>
    <Teaser.Content>
      <Teaser.Eyebrow>Some people are still disputing global warming</Teaser.Eyebrow>
      <Heading level="h2" size="xl">
        We’re acting on it. Here are our results.
      </Heading>
      <Text size="md">
        We’re one of the world’s most CO2-efficient producers of oil and gas and we are proactively investing in
        renewables. We report openly on all our sustainability priorities and performance.
      </Text>
      <Text size="md">
        We’re one of the world’s most CO2-efficient producers of oil and gas and we are proactively investing in
        renewables. We report openly on all our sustainability priorities and performance.
      </Text>
      <Link variant="readMore" href="/">
        Read more
      </Link>
    </Teaser.Content>
  </Teaser>
)

WithEyebrow.storyName = 'With media'
WithEyebrow.parameters = {
  docs: {
    storyDescription: `An eyebrow title can be used to <insert here>`,
  },
}
