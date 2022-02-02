/* eslint-disable */
import { Story, Meta } from '@storybook/react'
import { FigureCaption, FigureCaptionProps } from '@components'

export default {
  title: 'Components/FigureCaption',
  component: FigureCaption,

  parameters: {
    docs: {
      description: {
        component: `A FigureCaption component is used to display caption and credit in a figure.
        `,
      },
    },
  },
} as Meta

export const Default: Story<FigureCaptionProps> = (args) => (
  <FigureCaption {...args}>Exciting opportunities abroad Photo: Carl Oscar von der Linné</FigureCaption>
)

Default.storyName = 'Default'

export const Medium: Story<FigureCaptionProps> = () => (
  <FigureCaption size="medium">Exciting opportunities abroad Photo: Carl Oscar von der Linné</FigureCaption>
)

Medium.storyName = 'With larger font size'
