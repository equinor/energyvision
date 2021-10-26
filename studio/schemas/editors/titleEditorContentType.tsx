import React from 'react'

// TODO: write proper types if none become available from @sanity
export type BlockFieldType = {
  type: string
  styles: { title: string; value: string }[]
  lists: { title: string; value: string }[] | []
  marks: {
    decorators: any[]
    annotations: any[]
  }
}

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
