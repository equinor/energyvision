import React from 'react'
import { SuperScriptRenderer, SubScriptRenderer, StrikeThroughRenderer } from '../components'
import { IconSuperScript, IconSubScript, EdsIcon } from '../../icons'
import type { BlockFieldType } from '../../types/schemaTypes'
import { format_strikethrough } from '@equinor/eds-icons'

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
            icon: EdsIcon(format_strikethrough),
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
