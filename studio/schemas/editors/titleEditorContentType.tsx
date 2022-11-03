import React from 'react'
import { SuperScriptRenderer, SubScriptRenderer, StrikeThroughRenderer } from '../components'
import { IconSuperScript, IconSubScript, EdsIcon } from '../../icons'
import type { BlockFieldType } from '../../types/schemaTypes'
import { format_strikethrough } from '@equinor/eds-icons'
import { Flags } from '../../src/lib/datasetHelpers'

// TODO: Add relevant styles for titles (i.e. highlighted text)
export const configureTitleBlockContent = (): BlockFieldType => {
  // const { strong, emphasis, strikethrough } = options
  return {
    type: 'block',
    styles: [],
    lists: [],
    marks: {
      decorators: [
        Flags.IS_DEV ? { title: 'Strong', value: 'strong' } : undefined,
        Flags.IS_DEV ? { title: 'Emphasis', value: 'em' } : undefined,
        Flags.IS_DEV
          ? {
              title: 'Strikethrough',
              value: 's',
              blockEditor: {
                icon: EdsIcon(format_strikethrough),
                render: StrikeThroughRenderer,
              },
            }
          : undefined,
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
      ].filter((e) => e),
      annotations: [],
    },
  }
}

export default configureTitleBlockContent()
