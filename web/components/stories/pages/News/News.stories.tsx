/* eslint-disable */
import React from 'react'
import { Story, Meta } from '@storybook/react'

import { News } from './News'

export default {
  title: 'Pages/News',
  component: News,
  parameters: {
    viewMode: 'story',
  },
} as Meta

const Template: Story = (args) => <News {...args} />

export const NewsList = Template.bind({})
