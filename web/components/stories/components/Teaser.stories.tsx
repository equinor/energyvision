/* eslint-disable */
import { Story, Meta } from '@storybook/react'
import { Teaser, TeaserProps } from '@components'

export default {
  title: 'Components/Teaser',
  component: Teaser,
  /*  subcomponents: {
    Media: Teaser.Media,
  }, */
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
