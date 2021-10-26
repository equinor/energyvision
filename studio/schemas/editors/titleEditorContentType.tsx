import React from 'react'
import type { BlockFieldType } from '../../types/schemaTypes'

// TODO: Add relevant styles for titles (i.e. highlighted text)
export const configureTitleBlockContent = (): BlockFieldType => {
  return {
    type: 'block',
    styles: [],
    lists: [],
    marks: {
      decorators: [],
      annotations: [],
    },
  }
}

export default configureTitleBlockContent()
