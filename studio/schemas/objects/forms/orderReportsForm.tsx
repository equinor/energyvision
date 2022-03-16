import { file_description } from '@equinor/eds-icons'
import { EdsIcon } from '../../../icons'
import { Heading, Text, Box } from '@sanity/ui'
import styled from 'styled-components'
import React from 'react'

const StyledText = styled(Text)`
  margin: 1em 0;
`

// eslint-disable-next-line react/display-name
const ApiDescription = () => {
  return (
    <Box>
      <Heading size={2}>How to use</Heading>
      <StyledText>This component displays order reports form. No configuration is required.</StyledText>
    </Box>
  )
}

export default {
  name: 'orderReportsForm',
  type: 'object',
  title: 'Order Reports Form',
  description: 'This component displays form to order reports.',
  fields: [
    {
      name: 'description',
      type: 'string',
      inputComponent: ApiDescription,
      initialValue: 'orderReportsForm',
    },
  ],
  preview: {
    prepare() {
      return {
        title: 'Order reports form component',
        subtitle: 'Component to display forms for ordering reports',
        media: EdsIcon(file_description),
      }
    },
  },
}
