import { Story, Meta } from '@storybook/react/types-6-0'
import { Accordion, AccordionProps, BackgroundContainer, Text } from '@components'

export default {
  title: 'Components/Accordion',
  component: Accordion,
  subcomponents: {
    Item: Accordion.Item,
  },
} as Meta

export const Default: Story<AccordionProps> = (args) => (
  <Accordion {...args}>
    <Accordion.Item>
      <Accordion.Header>Produced and processed water</Accordion.Header>
      <Accordion.Panel>
        <Text>
          Our efforts to continuously improve our management of discharges of large volumes of produced and processed
          water to the sea continue. The main objective is to minimise the environmental impact from oil and chemicals
          contained in the discharged water. We continuosly monitor discharges from each of our installations and
          onshore plants.
        </Text>
      </Accordion.Panel>
    </Accordion.Item>
  </Accordion>
)

export const WithMultipleItems: Story<AccordionProps> = () => (
  <Accordion>
    <Accordion.Item>
      <Accordion.Header>Produced and processed water</Accordion.Header>
      <Accordion.Panel>
        <Text>
          Our efforts to continuously improve our management of discharges of large volumes of produced and processed
          water to the sea continue. The main objective is to minimise the environmental impact from oil and chemicals
          contained in the discharged water. We continuosly monitor discharges from each of our installations and
          onshore plants.
        </Text>
      </Accordion.Panel>
    </Accordion.Item>
    <Accordion.Item>
      <Accordion.Header>NOx Emissions</Accordion.Header>
      <Accordion.Panel>
        <Text>
          Our efforts to continuously improve our management of discharges of large volumes of produced and processed
          water to the sea continue. The main objective is to minimise the environmental impact from oil and chemicals
          contained in the discharged water. We continuosly monitor discharges from each of our installations and
          onshore plants.
        </Text>
      </Accordion.Panel>
    </Accordion.Item>
    <Accordion.Item>
      <Accordion.Header>
        Waste handling and a loong title over several lines and even more and more and more
      </Accordion.Header>
      <Accordion.Panel>
        <Text>
          Our efforts to continuously improve our management of discharges of large volumes of produced and processed
          water to the sea continue. The main objective is to minimise the environmental impact from oil and chemicals
          contained in the discharged water. We continuosly monitor discharges from each of our installations and
          onshore plants.
        </Text>
      </Accordion.Panel>
    </Accordion.Item>
    <Accordion.Item>
      <Accordion.Header>Fresh water</Accordion.Header>
      <Accordion.Panel>
        <Text>
          Our efforts to continuously improve our management of discharges of large volumes of produced and processed
          water to the sea continue. The main objective is to minimise the environmental impact from oil and chemicals
          contained in the discharged water. We continuosly monitor discharges from each of our installations and
          onshore plants.
        </Text>
      </Accordion.Panel>
    </Accordion.Item>
  </Accordion>
)

WithMultipleItems.storyName = 'With multiple items'

export const WithBackgroundColour: Story<AccordionProps> = () => (
  <BackgroundContainer background="Moss Green">
    <Accordion>
      <Accordion.Item>
        <Accordion.Header>Header 1</Accordion.Header>
        <Accordion.Panel>Content 1</Accordion.Panel>
      </Accordion.Item>
      <Accordion.Item>
        <Accordion.Header>Header 2</Accordion.Header>
        <Accordion.Panel>Content 2</Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  </BackgroundContainer>
)
