/* eslint-disable */
import { Story, Meta } from '@storybook/react'
import { Table, TableProps } from '@components'
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

export const Default: Story<TableProps> = (args) => <Table {...args}></Table>

Default.storyName = 'Default'
