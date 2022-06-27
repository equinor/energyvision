import { twitter } from '@equinor/eds-icons'
import { Rule, ValidationContext } from '@sanity/types'
import { EdsIcon } from '../../icons'
import { Colors } from '../../helpers/ColorListValues'
import CompactBlockEditor from '../components/CompactBlockEditor'
import { configureBlockContent, configureTitleBlockContent } from '../editors'
import CharCounterEditor from '../components/CharCounterEditor'

export type TwitterEmbed = {
  _type: 'twitterEmbed'
  embedType: string
  embedValue: string
}

const titleContentType = configureTitleBlockContent()
const ingressContentType = configureBlockContent({
  h1: false,
  h2: false,
  h3: false,
  h4: false,
  attachment: false,
})
export default {
  title: 'Twitter Embed',
  description: 'This component is to be used to display twitter feeds.',
  name: 'twitterEmbed',
  type: 'object',
  fieldsets: [
    {
      title: 'Design options',
      name: 'design',
      description: 'Some options for design',
      options: {
        collapsible: true,
        collapsed: false,
      },
    },
  ],
  fields: [
    {
      name: 'title',
      type: 'array',
      title: 'Title',
      description: 'The (optional) title/heading shown above the iframe.',
      inputComponent: CompactBlockEditor,
      of: [titleContentType],
    },
    {
      name: 'ingress',
      title: 'Ingress',
      type: 'array',
      inputComponent: CharCounterEditor,
      of: [ingressContentType],
    },
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
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'embedValue',
      type: 'string',
      description: 'Enter tweetid for embedding tweet or twitter handle (without @) for embedding timeline.',
      validation: (Rule: Rule) =>
        Rule.custom((embedValue: string, context: ValidationContext) => {
          const { parent } = context as { parent: TwitterEmbed }
          if (parent.embedType === 'tweet') return /^\d+$/.test(embedValue) ? true : 'Invalid tweetid'
          else
            return embedValue?.startsWith('@')
              ? "Enter twitter handle without '@'"
              : embedValue === undefined
              ? 'Twitter handle is required'
              : true
        }).error(),
    },
    {
      title: 'Background',
      description: 'Pick a colour for the background. Default is white.',
      name: 'background',
      type: 'colorlist',
      options: {
        borderradius: {
          outer: '100%',
          inner: '100%',
        },
        tooltip: true,
        list: Colors,
      },
      fieldset: 'design',
      initialValue: Colors[0],
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
