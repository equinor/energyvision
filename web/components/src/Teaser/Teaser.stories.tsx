/* eslint-disable */
import { Story, Meta } from '@storybook/react'
import { Teaser, TeaserProps, Heading, Text, Link, Eyebrow, BackgroundContainer } from '@components'
import { ImagePlaceholder, RatioBox, AspectImagePlaceholder } from '@stories'
import styled from 'styled-components'

const SmallImageContainer = styled.div`
  @media (min-width: 650px) {
    width: 55%;
    height: 40%;
  }
`

export default {
  title: 'Components/Teaser',
  component: Teaser,
  viewMode: 'story',
  subcomponents: {
    Media: Teaser.Media,
    Content: Teaser.Content,
  },
  parameters: {
    docs: {
      description: {
        component: `A Teaser component is used to highlight and link to other
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
      <Eyebrow>Some people are still disputing global warming</Eyebrow>
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
    storyDescription: `A Teaser component with image or video. Select "canvas" mode for this story to see different variations.`,
  },
}

export const WithEyebrow: Story<TeaserProps> = ({}) => (
  <Teaser>
    <Teaser.Media>
      <ImagePlaceholder height="150px" />
    </Teaser.Media>
    <Teaser.Content>
      <Eyebrow>Some people are still disputing global warming</Eyebrow>
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

WithEyebrow.storyName = 'With eyebrow title'
WithEyebrow.parameters = {
  docs: {
    storyDescription: `An eyebrow title can be used to ...`,
  },
}

export const WithLongContent: Story<TeaserProps> = ({}) => (
  <Teaser>
    <Teaser.Media>
      <ImagePlaceholder height="150px" />
    </Teaser.Media>
    <Teaser.Content>
      <Eyebrow>Some people are still disputing global warming</Eyebrow>
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

WithLongContent.storyName = 'With too long content'
WithLongContent.parameters = {
  docs: {
    storyDescription: `The height of the teaser can be a maximum of 800px with no scroll for content overflow.`,
  },
}

export const WithTheme: Story<TeaserProps> = (args) => (
  <>
    <BackgroundContainer background="Moss Green Light">
      <Teaser {...args}>
        <Teaser.Media>
          <ImagePlaceholder height="150px" />
        </Teaser.Media>
        <Teaser.Content>
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
    </BackgroundContainer>
    <BackgroundContainer background="Spruce Wood">
      <Teaser style={{ marginTop: 'var(--space-medium)' }}>
        <Teaser.Media>
          <ImagePlaceholder height="150px" />
        </Teaser.Media>
        <Teaser.Content>
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
    </BackgroundContainer>
  </>
)

WithTheme.storyName = 'With different styles'
WithTheme.parameters = {
  docs: {
    storyDescription: ``,
  },
}

export const WithRightPositionedImage: Story<TeaserProps> = (args) => (
  <Teaser imagePosition="right" {...args}>
    <Teaser.Media>
      <ImagePlaceholder height="150px" />
    </Teaser.Media>
    <Teaser.Content>
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

WithRightPositionedImage.storyName = 'With right aligned image'
WithRightPositionedImage.parameters = {
  docs: {
    storyDescription: `The image can be positioned to the right`,
  },
}

export const WithConstrainedMediaWidth: Story<TeaserProps> = (args) => (
  <Teaser {...args}>
    <Teaser.Media size="small" center={true}>
      <RatioBox>
        <AspectImagePlaceholder />
      </RatioBox>
    </Teaser.Media>
    <Teaser.Content>
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

WithConstrainedMediaWidth.storyName = 'With constrained image width'
WithConstrainedMediaWidth.parameters = {
  docs: {
    storyDescription: `Work in progress. We will probably need to add the width constraint to the actual image. This is just a dummy showcase.`,
  },
}
