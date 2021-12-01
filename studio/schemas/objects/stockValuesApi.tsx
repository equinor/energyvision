import React from 'react'
import { Colors } from '../../helpers/ColorListValues'
import { dollar } from '@equinor/eds-icons'
import { EdsIcon } from '../../icons'
import { Heading, Text, Box } from '@sanity/ui'
import styled from 'styled-components'
import type { ColorListValue } from 'sanity-plugin-color-list'

const StyledText = styled(Text)`
  margin: 1em 0;
`

// eslint-disable-next-line react/display-name
const ApiDescription = () => {
  return (
    <Box>
      <Heading size={2}>How to use</Heading>
      <StyledText>
        This component will automatically display up to date Equinor stock values from the OSE and NYSE. No
        configuration is required.
      </StyledText>
    </Box>
  )
}

export type StockValues = {
  _type: 'stockValuesApi'
  description: string
  background?: ColorListValue
}

export default {
  title: 'Stock values',
  description: 'This component will automatically display up to date Equinor stock values from the OSE and NYSE.',
  name: 'stockValuesApi',
  type: 'object',
  fieldsets: [
    {
      title: 'Design options',
      name: 'design',
    },
  ],
  fields: [
    {
      name: 'description',
      type: 'string',
      inputComponent: ApiDescription,
    },
    {
      title: 'Background',
      description: 'Pick a colour for the background. Default is white.',
      name: 'background',
      type: 'colorlist',
      options: {
        borderradius: {
          outer: '100%',
          inner: '100%',
        },
        tooltip: true,
        list: Colors,
      },
      fieldset: 'design',
      initialValue: Colors[0],
    },
  ],
  preview: {
    prepare() {
      return {
        title: 'Stock values component',
        subtitle: 'Automatic Equinor stock values from the OSE and NYSE',
        media: EdsIcon(dollar),
      }
    },
  },
}
