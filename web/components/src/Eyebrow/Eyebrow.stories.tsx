/* eslint-disable */
import type { StoryFn, Meta } from '@storybook/react'
import { Eyebrow, EyebrowProps } from '@components'
import styled from 'styled-components'

export default {
  title: 'Components/Eyebrow',
  component: Eyebrow,

  parameters: {
    docs: {
      description: {
        component: `An Eyebrow component is used for text overline.
        `,
      },
    },
  },
} as Meta

export const Default: StoryFn<EyebrowProps> = (args) => (
  <Eyebrow {...args}>Some people are still disputing global warming</Eyebrow>
)

Default.storyName = 'Default'
