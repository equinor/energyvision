import { Story, Meta } from '@storybook/react/types-6-0'
import { Accordion, AccordionProps, BackgroundContainer } from '@components'

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
      <Accordion.Header>Header 1</Accordion.Header>
      <Accordion.Panel>Content 1</Accordion.Panel>
    </Accordion.Item>
  </Accordion>
)

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
