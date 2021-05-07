/* import { i18n } from '../documentTranslation' */
import React from 'react'
// import type { Topics } from '../../helpers/topics'

// export default ({ topicPrefix, title }: { topicPrefix: Topics; title: string }) => {
export default (topicPrefix, title) => {
  return {
    type: 'document',
    name: `${topicPrefix}_page`,
    title: `${title} Page`,
    fields: [
      {
        name: 'title',
        type: 'string',
        title: 'Title',
        validation: (Rule) => Rule.required(),
      },
    ],
  }
}
