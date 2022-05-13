import React from 'react'
import { SuperScriptRenderer, SubScriptRenderer } from '../components'
import { IconSuperScript, IconSubScript } from '../../icons'
import type { BlockFieldType } from '../../types/schemaTypes'

// TODO: Add relevant styles for titles (i.e. highlighted text)
export const configureTitleBlockContent = (): BlockFieldType => {
  return {
    type: 'block',
    styles: [],
    lists: [],
    marks: {
      decorators: [
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
