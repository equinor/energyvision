import React from 'react'
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
        This component will automatically display cookies identified in the website. No configuration is required. This
        component is to be used on Cookie Policy page.
      </StyledText>
    </Box>
  )
}

export type cookieDeclaration = {
  _type: 'cookieDeclaration'
  description: string
}

export default {
  title: 'Cookie Declaration',
  description:
    'This component is to be used in Cookie Policy page to automatically display table of cookies identified in the site with their purpose.',
  name: 'cookieDeclaration',
  type: 'object',
  fields: [
    {
      name: 'description',
      type: 'string',
      inputComponent: ApiDescription,
      initialValue: 'Cookie Declaration',
    },
  ],
  preview: {
    prepare() {
      return {
        title: 'Cookie Declaration component',
        subtitle: 'Displays cookies identified in the site automatically',
        media: EdsIcon(table_chart),
      }
    },
  },
}
