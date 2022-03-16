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
      <StyledText>This component displays careers contact form. No configuration is required.</StyledText>
    </Box>
  )
}

export default {
  name: 'careersContactForm',
  type: 'object',
  title: 'Careers Contact Form',
  description: 'This component shows subscription form for subscribing to news,magazines, crude oil assays.',
  fields: [
    {
      name: 'description',
      type: 'string',
      inputComponent: ApiDescription,
      initialValue: 'careersContactForm',
    },
  ],
  preview: {
    prepare() {
      return {
        title: 'Careers contact form component',
        subtitle: 'Component to display forms for Career contact',
        media: EdsIcon(file_description),
      }
    },
  },
}
