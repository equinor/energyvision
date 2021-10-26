import React from 'react'
import { Colors } from '../../helpers/ColorListValues'
import { table_chart } from '@equinor/eds-icons'
import { EdsIcon } from '../../icons'
import { Heading, Text, Box } from '@sanity/ui'
import styled from 'styled-components'

const StyledText = styled(Text)`
  margin: 1em 0;
`

// eslint-disable-next-line react/display-name
const ApiDescription = () => {
  return (
    <Box>
      <Heading size={2}>How to use</Heading>
      <StyledText>
        This component will automatically display up to date REMIT values as a table. No
        configuration is required.
      </StyledText>
    </Box>
  )
}

export default {
  title: 'REMIT Table',
  description: 'This component will automatically display up to date REMIT values as a table.',
  name: 'remitTable',
  type: 'object',
  fields: [
    {
      name: 'description',
      type: 'string',
      inputComponent: ApiDescription,
    }],
  preview: {
    prepare() {
      return {
        title: 'REMIT table component',
        subtitle: 'Displays REMIT values in a table automatically',
        media: EdsIcon(table_chart),
      }
    },
  },
}
