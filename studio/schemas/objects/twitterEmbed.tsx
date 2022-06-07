import { twitter } from '@equinor/eds-icons'
import { EdsIcon } from '../../icons'

export type TwitterEmbed = {
  _type: 'twitterEmbed'
  embedType: string
  embedValue: string
}

export default {
  title: 'Twitter Embed',
  description: 'This component is to be used to display twitter feeds.',
  name: 'twitterEmbed',
  type: 'object',
  fields: [
    {
      name: 'embedType',
      type: 'string',
      options: {
        list: [
          { title: 'Timeline', value: 'timeline' },
          { title: 'Tweet', value: 'tweet' },
        ],
        layout: 'dropdown',
      },
    },
    {
      name: 'embedValue',
      type: 'string',
      description: 'Enter tweetid for embedding tweet or username of twitter profile for embedding timeline.',
    },
  ],
  preview: {
    select: {
      embedType: 'embedType',
    },
    prepare({ embedType }: any) {
      return {
        title: 'Twitter Embed component',
        subtitle: embedType,
        media: EdsIcon(twitter),
      }
    },
  },
}
