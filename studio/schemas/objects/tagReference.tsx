import React from 'react'

export default {
  title: 'Tags',
  name: 'tagReference',
  type: 'array',
  description: 'Adds tags to news article',
  of: [
    {
      type: 'reference',
      to: [{ type: 'tag' }],
    },
  ],
}
