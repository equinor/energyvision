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
      <StyledText>This component displays contact Equinor form. No configuration is required.</StyledText>
    </Box>
  )
}

export default {
  name: 'contactEquinorForm',
  type: 'object',
  title: 'Contact Equinor Form',
  description: 'This component shows subscription form for subscribing to news,magazines, crude oil assays.',
  fields: [
    {
      name: 'description',
      type: 'string',
      inputComponent: ApiDescription,
      initialValue: 'contactEquinorForm',
    },
  ],
  preview: {
    prepare() {
      return {
        title: 'Contact Equinor form component',
        subtitle: 'Component to display forms for contacting Equinor',
        media: EdsIcon(file_description),
      }
    },
  },
}
