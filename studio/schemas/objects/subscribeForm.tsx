import { file_description } from '@equinor/eds-icons'
import { EdsIcon } from '../../icons'
import { configureTitleBlockContent } from '../editors'
import type { Block } from '@sanity/types'
import CompactBlockEditor from '../components/CompactBlockEditor'

const titleContentType = configureTitleBlockContent()

export type SubscribeForm = {
  _type: 'subscribeForm'
  title?: Block[]
}

export default {
  name: 'subscribeForm',
  type: 'object',
  title: 'Subscribe Form',
  description: 'This component shows subscription form for subscribing to news,magazines, crude oil assays.',
  fields: [
    {
      name: 'title',
      type: 'array',
      title: 'Title',
      description: 'The (optional) title/heading shown above the subscription form.',
      inputComponent: CompactBlockEditor,
      of: [titleContentType],
    },
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
