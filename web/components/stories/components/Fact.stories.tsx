/* eslint-disable */
import { Story, Meta } from '@storybook/react'
import { Fact, FactProps } from '@components'
import { Typography } from '@equinor/eds-core-react'

export default {
  title: 'Components/Fact',
  component: Fact,
  subcomponents: {
    Title: Fact.Title,
    Text: Fact.Text,
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
    <Fact.Text>
      <Typography>
        Panasonic Corporation is a worldwide leader in the development of diverse electronics technologies and solutions
        for customers in the consumer electronics, housing, automotive, and B2B businesses. The company, which
        celebrated its 100th anniversary in 2018, has expanded globally and now operates 528 subsidiaries and 72
        associated companies worldwide. The mission at Panasonic is to make the world’s safest, highest quality, and
        lowest cost batteries. Through this effort, Panasonic will create a clean energy society, and our products will
        change society’s use of and perceptions of electric power. Committed to pursuing new value through innovation
        across divisional lines, the company uses its technologies to create a better life and a better world for its
        customers.
      </Typography>
    </Fact.Text>
  </Fact>
)

Default.storyName = 'Default'
