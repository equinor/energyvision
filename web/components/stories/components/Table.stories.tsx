/* eslint-disable */
import { Story, Meta } from '@storybook/react'
import { Table, TableProps, BackgroundContainer, Link } from '@components'
import styled from 'styled-components'

export default {
  title: 'Components/Table',
  component: Table,

  parameters: {
    docs: {
      description: {
        component: `Table component.
        `,
      },
    },
  },
} as Meta

const Grid = styled.div`
  display: grid;
  gap: 1rem;
`
const TableWrapper = styled.div`
  padding: 1rem;
  display: flex;
  place-content: center;
`
export const Default: Story<TableProps> = (args) => (
  <Table {...args}>
    <Table.Caption>Table caption</Table.Caption>
    <Table.Head>
      <Table.Row>
        <Table.Cell>Header one</Table.Cell>
        <Table.Cell>Header two</Table.Cell>
        <Table.Cell>Header three</Table.Cell>
      </Table.Row>
    </Table.Head>
    <Table.Body>
      <Table.Row>
        <Table.Cell>Content one</Table.Cell>
        <Table.Cell>Content two</Table.Cell>
        <Table.Cell>Content three</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>Content one</Table.Cell>
        <Table.Cell>Content two</Table.Cell>
        <Table.Cell>Content three</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>Content one</Table.Cell>
        <Table.Cell>Content two</Table.Cell>
        <Table.Cell>Content three</Table.Cell>
      </Table.Row>
    </Table.Body>
  </Table>
)

Default.storyName = 'Default'

export const WithDifferentInputs: Story<TableProps> = ({}) => (
  <Table>
    <Table.Caption>Table caption</Table.Caption>
    <Table.Head>
      <Table.Row>
        <Table.Cell>Header for numbers</Table.Cell>
        <Table.Cell>Header for links</Table.Cell>
      </Table.Row>
    </Table.Head>
    <Table.Body>
      <Table.Row>
        <Table.Cell variant="numeric">1234</Table.Cell>
        <Table.Cell>
          <Link href="#">A link</Link>
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell variant="numeric">5678</Table.Cell>
        <Table.Cell>
          <Link href="#">Another link</Link>
        </Table.Cell>
      </Table.Row>
    </Table.Body>
  </Table>
)

WithDifferentInputs.storyName = 'With different inputs'
WithDifferentInputs.parameters = {
  docs: {
    description: {
      story: `We need a way to define different variants of input`,
    },
  },
}

export const WithDifferentBackgrounds: Story<TableProps> = ({}) => (
  <Grid>
    <BackgroundContainer background="Moss Green Light">
      <TableWrapper>
        <Table>
          <Table.Caption>Table caption</Table.Caption>
          <Table.Head>
            <Table.Row>
              <Table.Cell>Header one</Table.Cell>
              <Table.Cell>Header two</Table.Cell>
              <Table.Cell>Header three</Table.Cell>
            </Table.Row>
          </Table.Head>
          <Table.Body>
            <Table.Row>
              <Table.Cell>Content one</Table.Cell>
              <Table.Cell>Content two</Table.Cell>
              <Table.Cell>Content three</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Content one</Table.Cell>
              <Table.Cell>Content two</Table.Cell>
              <Table.Cell>Content three</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Content one</Table.Cell>
              <Table.Cell>Content two</Table.Cell>
              <Table.Cell>Content three</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </TableWrapper>
    </BackgroundContainer>
    <BackgroundContainer background="Slate Blue">
      <TableWrapper>
        <Table>
          <Table.Caption>Table caption</Table.Caption>
          <Table.Head>
            <Table.Row>
              <Table.Cell>Header one</Table.Cell>
              <Table.Cell>Header two</Table.Cell>
              <Table.Cell>Header three</Table.Cell>
            </Table.Row>
          </Table.Head>
          <Table.Body>
            <Table.Row>
              <Table.Cell>Content one</Table.Cell>
              <Table.Cell>Content two</Table.Cell>
              <Table.Cell>Content three</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Content one</Table.Cell>
              <Table.Cell>Content two</Table.Cell>
              <Table.Cell>Content three</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Content one</Table.Cell>
              <Table.Cell>Content two</Table.Cell>
              <Table.Cell>Content three</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </TableWrapper>
    </BackgroundContainer>
    <BackgroundContainer background="Moss Green">
      <TableWrapper>
        <Table>
          <Table.Caption>Table caption</Table.Caption>
          <Table.Head>
            <Table.Row>
              <Table.Cell>Header one</Table.Cell>
              <Table.Cell>Header two</Table.Cell>
              <Table.Cell>Header three</Table.Cell>
            </Table.Row>
          </Table.Head>
          <Table.Body>
            <Table.Row>
              <Table.Cell>Content one</Table.Cell>
              <Table.Cell>Content two</Table.Cell>
              <Table.Cell>Content three</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Content one</Table.Cell>
              <Table.Cell>Content two</Table.Cell>
              <Table.Cell>Content three</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Content one</Table.Cell>
              <Table.Cell>Content two</Table.Cell>
              <Table.Cell>Content three</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </TableWrapper>
    </BackgroundContainer>
    <BackgroundContainer background="Spruce Wood">
      <TableWrapper>
        <Table>
          <Table.Caption>Table caption</Table.Caption>
          <Table.Head>
            <Table.Row>
              <Table.Cell>Header one</Table.Cell>
              <Table.Cell>Header two</Table.Cell>
              <Table.Cell>Header three</Table.Cell>
            </Table.Row>
          </Table.Head>
          <Table.Body>
            <Table.Row>
              <Table.Cell>Content one</Table.Cell>
              <Table.Cell>Content two</Table.Cell>
              <Table.Cell>Content three</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Content one</Table.Cell>
              <Table.Cell>Content two</Table.Cell>
              <Table.Cell>Content three</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Content one</Table.Cell>
              <Table.Cell>Content two</Table.Cell>
              <Table.Cell>Content three</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </TableWrapper>
    </BackgroundContainer>
  </Grid>
)

WithDifferentBackgrounds.storyName = 'With different backgrounds'
