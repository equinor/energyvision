/* eslint-disable */
import { Story, Meta } from '@storybook/react'
import { FigureCaption, FigureCaptionProps } from '@components'

export default {
  title: 'Components/FigureCaption',
  component: FigureCaption,
  subcomponents: {
    Caption: FigureCaption.Caption,
    Attribution: FigureCaption.Attribution,
  },
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
  <FigureCaption {...args}>
    <FigureCaption.Caption>Exciting opportunities abroad </FigureCaption.Caption>
    <FigureCaption.Attribution>Photo: Carl Oscar von der Linné</FigureCaption.Attribution>
  </FigureCaption>
)

Default.storyName = 'Default'

export const Medium: Story<FigureCaptionProps> = () => (
  <FigureCaption size="medium">
    <FigureCaption.Caption>Exciting opportunities abroad </FigureCaption.Caption>
    <FigureCaption.Attribution>Photo: Carl Oscar von der Linné</FigureCaption.Attribution>
  </FigureCaption>
)

Medium.storyName = 'With larger font size'
