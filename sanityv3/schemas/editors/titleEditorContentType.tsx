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
          icon: StrikethroughIcon,
          component: StrikeThroughRenderer,
        },
        {
          title: 'Sub',
          value: 'sub',
          icon: IconSubScript,
          component: SubScriptRenderer,
        },
        {
          title: 'Super',
          value: 'sup',
          icon: IconSuperScript,
          component: SuperScriptRenderer,
        },
      ],
      annotations: [],
    },
  }
}

export default configureTitleBlockContent()
