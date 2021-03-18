/* eslint-disable */
import { Story, Meta } from '@storybook/react'
import { Fact, FactProps } from '@components'

export default {
  title: 'Components/Fact',
  component: Fact,
  subcomponents: {
    Title: Fact.Title,
  },
  parameters: {
    docs: {
      description: {
        component: `A <code>Fact</code> box component gives facts about a specific topic, preferably as bullet points.
        `,
      },
    },
  },
} as Meta

export const Default: Story<FactProps> = (args) => (
  <Fact {...args}>
    <Fact.Title>Dolor sit amet</Fact.Title>
  </Fact>
)

Default.storyName = 'Default'
