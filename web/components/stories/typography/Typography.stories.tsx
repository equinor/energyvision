import type { StoryFn, Meta } from '@storybook/react'

import { Typography, TypographyProps } from './Typography'

export default {
  title: 'Typography/Scale',
  component: Typography,
  parameters: {
    viewMode: 'story',
    docs: {
      description: {
        component: 'Testing out alternative implementations of the typographic scale',
      },
    },
  },
} as Meta

const Template: Story<TypographyProps> = (args) => <Typography {...args} />

export const Alt1 = Template.bind({})
Alt1.args = {
  alternative: 1,
}
