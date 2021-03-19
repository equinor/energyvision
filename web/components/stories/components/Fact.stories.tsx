/* eslint-disable */
import { Story, Meta } from '@storybook/react'
import { Fact, FactProps } from '@components'
import { Typography, List } from '@equinor/eds-core-react'

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

/* EDS Lists I suppose? But we'll need to wrap them somehow and use them in a list serializer */
export const WithBulletPoints: Story<FactProps> = () => (
  <Fact>
    <Fact.Title>Dolor sit amet</Fact.Title>
    <Fact.Text>
      <List>
        <List.ListItem>
          One barrel of oil produced at Johan Sverdrup during the first year has emitted 0.17kg CO₂ – almost 100 times
          lower than the global average (measured in kilogrammes of CO₂ per barrel produced). This is mainly due to the
          power supply from shore.
        </List.ListItem>
        <List.ListItem>
          The Johan Sverdrup field came on stream on 5 October 2019 – more than two months ahead of schedule and with
          investment costs that were NOK 40 billion lower than the original estimate in the plan for development and
          operation (PDO).
        </List.ListItem>
        <List.ListItem>
          Johan Sverdrup phase 2 includes the construction of a subsea production system, reconstruction of the existing
          riser platform and a new p rocessing platform (P2).
        </List.ListItem>
        <List.ListItem>
          Phase 2 will also accommodate a converter plant for shore-based power supply. The plant will distribute power
          to other fields on the Utsira High: Edvard Grieg, Ivar Aasen, Gina Krog and Sleipner.
        </List.ListItem>
        <List.ListItem>
          The four existing platforms on the Johan Sverdrup field are already receiving power from shore. Production
          start is expected in the fourth quarter of 2022.
        </List.ListItem>
      </List>
    </Fact.Text>
  </Fact>
)

WithBulletPoints.storyName = 'With bullet points'
WithBulletPoints.parameters = {
  docs: {
    storyDescription: `We need to theme the EDS list items or typography somehow.`,
  },
}

export const WithDifferentBackgrounds: Story<FactProps> = () => (
  <>
    <Fact background="cold">
      <Fact.Title>Dolor sit amet</Fact.Title>
      <Fact.Text>
        <Typography>
          Panasonic Corporation is a worldwide leader in the development of diverse electronics technologies and
          solutions for customers in the consumer electronics, housing, automotive, and B2B businesses. The company,
          which celebrated its 100th anniversary in 2018, has expanded globally and now operates 528 subsidiaries and 72
          associated companies worldwide. The mission at Panasonic is to make the world’s safest, highest quality, and
          lowest cost batteries. Through this effort, Panasonic will create a clean energy society, and our products
          will change society’s use of and perceptions of electric power. Committed to pursuing new value through
          innovation across divisional lines, the company uses its technologies to create a better life and a better
          world for its customers.
        </Typography>
      </Fact.Text>
    </Fact>
    <Fact background="warm" style={{ marginTop: 'var(--spacer-vertical-medium)' }}>
      <Fact.Title>Dolor sit amet</Fact.Title>
      <Fact.Text>
        <Typography>
          Panasonic Corporation is a worldwide leader in the development of diverse electronics technologies and
          solutions for customers in the consumer electronics, housing, automotive, and B2B businesses. The company,
          which celebrated its 100th anniversary in 2018, has expanded globally and now operates 528 subsidiaries and 72
          associated companies worldwide. The mission at Panasonic is to make the world’s safest, highest quality, and
          lowest cost batteries. Through this effort, Panasonic will create a clean energy society, and our products
          will change society’s use of and perceptions of electric power. Committed to pursuing new value through
          innovation across divisional lines, the company uses its technologies to create a better life and a better
          world for its customers.
        </Typography>
      </Fact.Text>
    </Fact>
  </>
)

WithDifferentBackgrounds.storyName = 'With different backgrounds'
WithDifferentBackgrounds.parameters = {
  docs: {
    storyDescription: `This is just an example. We need to specify this along with a proper naming`,
  },
}

export const AlignTitle: Story<FactProps> = () => (
  <>
    <Fact background="cold">
      <Fact.Title>Dolor sit amet</Fact.Title>
      <Fact.Text>
        <Typography>
          Panasonic Corporation is a worldwide leader in the development of diverse electronics technologies and
          solutions for customers in the consumer electronics, housing, automotive, and B2B businesses. The company,
          which celebrated its 100th anniversary in 2018, has expanded globally and now operates 528 subsidiaries and 72
          associated companies worldwide. The mission at Panasonic is to make the world’s safest, highest quality, and
          lowest cost batteries. Through this effort, Panasonic will create a clean energy society, and our products
          will change society’s use of and perceptions of electric power. Committed to pursuing new value through
          innovation across divisional lines, the company uses its technologies to create a better life and a better
          world for its customers.
        </Typography>
      </Fact.Text>
    </Fact>
    <Fact background="cold" style={{ marginTop: 'var(--spacer-vertical-medium)' }}>
      <Fact.Title alignment="left">Dolor sit amet</Fact.Title>
      <Fact.Text>
        <Typography>
          Panasonic Corporation is a worldwide leader in the development of diverse electronics technologies and
          solutions for customers in the consumer electronics, housing, automotive, and B2B businesses. The company,
          which celebrated its 100th anniversary in 2018, has expanded globally and now operates 528 subsidiaries and 72
          associated companies worldwide. The mission at Panasonic is to make the world’s safest, highest quality, and
          lowest cost batteries. Through this effort, Panasonic will create a clean energy society, and our products
          will change society’s use of and perceptions of electric power. Committed to pursuing new value through
          innovation across divisional lines, the company uses its technologies to create a better life and a better
          world for its customers.
        </Typography>
      </Fact.Text>
    </Fact>
  </>
)

AlignTitle.storyName = 'Title alignment'
AlignTitle.parameters = {
  docs: {
    storyDescription: `The title can be positioned to the left or centered. Is there a pattern here Birte? What should be the default? `,
  },
}
