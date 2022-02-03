import { useState } from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import { Accordion, AccordionProps, BackgroundContainer, Text } from '@components'

export default {
  title: 'Components/Accordion',
  component: Accordion,
  subcomponents: {
    Item: Accordion.Item,
    Panel: Accordion.Panel,
    Header: Accordion.Header,
  },
} as Meta

export const Default: Story<AccordionProps> = (args) => (
  <Accordion {...args} multiple collapsible>
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
  <Accordion multiple collapsible>
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
export const WithAnotherHeaderLevel: Story<AccordionProps> = () => (
  <Accordion multiple collapsible>
    <Accordion.Item>
      <Accordion.Header headingLevel="h2">Produced and processed water</Accordion.Header>
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

WithAnotherHeaderLevel.storyName = 'With another header level (h2)'

export const ControlledAccordion: Story<AccordionProps> = () => {
  const [indices, setIndices] = useState([0, 2])

  function toggleItem(toggledIndex: number) {
    if (indices.includes(toggledIndex)) {
      setIndices(indices.filter((currentIndex) => currentIndex !== toggledIndex))
    } else {
      setIndices([...indices, toggledIndex].sort())
    }
  }

  return (
    <Accordion index={indices} onChange={toggleItem}>
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
}

ControlledAccordion.storyName = 'Controlled accordion'
ControlledAccordion.parameters = {
  docs: {
    storyDescription: `An accordion could be controlled and have items open by default`,
  },
}

export const WithBackgroundColours: Story<AccordionProps> = () => (
  <>
    <BackgroundContainer background="Moss Green">
      <Accordion multiple collapsible>
        <Accordion.Item>
          <Accordion.Header>Header 1</Accordion.Header>
          <Accordion.Panel>
            <Text>Content 1</Text>
          </Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item>
          <Accordion.Header>Header 2</Accordion.Header>
          <Accordion.Panel>
            <Text>Content 2</Text>
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </BackgroundContainer>
    <BackgroundContainer background="Slate Blue" style={{ marginTop: '1rem' }}>
      <Accordion multiple collapsible>
        <Accordion.Item>
          <Accordion.Header>Header 1</Accordion.Header>
          <Accordion.Panel>
            <Text>Content 1</Text>
          </Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item>
          <Accordion.Header>Header 2</Accordion.Header>
          <Accordion.Panel>
            <Text>Content 2</Text>
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </BackgroundContainer>
  </>
)
