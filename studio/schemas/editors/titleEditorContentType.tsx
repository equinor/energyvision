import React from 'react'
import { SuperScriptRenderer, SubScriptRenderer, StrikeThroughRenderer } from '../components'
import { IconSuperScript, IconSubScript } from '../../icons'
import { StrikethroughIcon } from '@sanity/icons'
import type { BlockFieldType } from '../../types/schemaTypes'

// TODO: Add relevant styles for titles (i.e. highlighted text)
export const configureTitleBlockContent = (): BlockFieldType => {
  // const { strong, emphasis, strikethrough } = options
  return {
    type: 'block',
    styles: [],
    lists: [],
    marks: {
      decorators: [
        { title: 'Strong', value: 'strong' },
        { title: 'Emphasis', value: 'em' },
        {
          title: 'Strikethrough',
          value: 's',
          blockEditor: {
            icon: StrikethroughIcon,
            render: StrikeThroughRenderer,
          },
        },
        {
          title: 'Sub',
          value: 'sub',
          blockEditor: {
            icon: IconSubScript,
            render: SubScriptRenderer,
          },
        },
        {
          title: 'Super',
          value: 'sup',
          blockEditor: {
            icon: IconSuperScript,
            render: SuperScriptRenderer,
          },
        },
      ],
      annotations: [],
    },
  }
}

export default configureTitleBlockContent()
