import { useState } from 'react'
import type { StoryFn, Meta } from '@storybook/react'
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

export const Default: StoryFn<AccordionProps> = (args) => (
  <Accordion {...args}>
    <Accordion.Item id={2}>
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

export const WithMultipleItems: StoryFn<AccordionProps> = () => (
  <Accordion id="accordion">
    <Accordion.Item id={1}>
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
    <Accordion.Item id={2}>
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
    <Accordion.Item id={3}>
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
    <Accordion.Item id={4}>
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
export const WithAnotherHeaderLevel: StoryFn<AccordionProps> = () => (
  <Accordion id="header">
    <Accordion.Item id={2}>
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

export const ControlledAccordion: StoryFn<AccordionProps> = () => {
  const [indices, setIndices] = useState([0, 2])

  function toggleItem(toggledIndex: number) {
    if (indices.includes(toggledIndex)) {
      setIndices(indices.filter((currentIndex) => currentIndex !== toggledIndex))
    } else {
      setIndices([...indices, toggledIndex].sort())
    }
  }

  return (
    <Accordion index={indices} onChange={toggleItem} id="controlled">
      <Accordion.Item id={1}>
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
      <Accordion.Item id={2}>
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
      <Accordion.Item id={3}>
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
      <Accordion.Item id={4}>
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

export const WithBackgroundColours: StoryFn<AccordionProps> = () => (
  <>
    <BackgroundContainer background="Moss Green">
      <Accordion id="bg">
        <Accordion.Item id={1}>
          <Accordion.Header>Header 1</Accordion.Header>
          <Accordion.Panel>
            <Text>Content 1</Text>
          </Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item id={2}>
          <Accordion.Header>Header 2</Accordion.Header>
          <Accordion.Panel>
            <Text>Content 2</Text>
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </BackgroundContainer>
    <BackgroundContainer background="Slate Blue" style={{ marginTop: 'var(--space-medium)' }}>
      <Accordion id="blue">
        <Accordion.Item id={1}>
          <Accordion.Header>Header 1</Accordion.Header>
          <Accordion.Panel>
            <Text>Content 1</Text>
          </Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item id={2}>
          <Accordion.Header>Header 2</Accordion.Header>
          <Accordion.Panel>
            <Text>Content 2</Text>
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </BackgroundContainer>
  </>
)
