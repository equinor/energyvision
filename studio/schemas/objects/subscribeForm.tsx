import { file_description } from '@equinor/eds-icons'
import { EdsIcon } from '../../icons'
import { Rule } from '@sanity/types'

export type SubscribeForm = {
  _type: 'subscribeForm',
  heading?: string
  formType: string
}

export default {
    name: 'subscribeForm',
    type: 'object',
    title: 'Subscribe Form',
    description: 'This component shows subscription form for subscribing to news,magazines, crude oil assays.',
    fields: [
      {
        name: 'heading',
        type: 'string',
        title: 'Heading',
      },
      {
        name: 'formType',
        type: 'string',
        title: 'Type',
        options: {
            list: [
              {title: 'News', value: 'news'},
              {title: 'Magazine Article', value: 'magazine-article'},
              {title: 'Crude oil assays', value: 'crude-oil-assays'},
              // loop article is not listed here for now. 
            ],
          },
          validation: (Rule: Rule) => Rule.required(),
      }
    ],
    preview: {
        prepare() {
          return {
            title: 'Subscribe form component',
            subtitle: 'Component to display forms for subscriptions',
            media: EdsIcon(file_description),
          }
        },
      },
  }