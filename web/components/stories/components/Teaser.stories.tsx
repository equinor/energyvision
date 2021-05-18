/* eslint-disable */
import { Story, Meta } from '@storybook/react'
import { Teaser, TeaserProps } from '@components'
import { ImagePlaceholder } from './helpers/styles'

export default {
  title: 'Components/Teaser',
  component: Teaser,
  subcomponents: {
    Media: Teaser.Media,
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

export const Default: Story<TeaserProps> = (args) => <Teaser {...args}></Teaser>

Default.storyName = 'Default'

export const WithMedia: Story<TeaserProps> = ({}) => (
  <Teaser>
    <Teaser.Media>
      <ImagePlaceholder style={{ borderRadius: 0 }} />
    </Teaser.Media>
  </Teaser>
)

WithMedia.storyName = 'With media'
WithMedia.parameters = {
  docs: {
    storyDescription: `A <code>Teaser</code> component with image or video. Select "canvas" mode for this story to see different variations.`,
  },
}
