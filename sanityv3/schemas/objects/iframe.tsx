// This version of the iframe is used by Topic Pages
// It features description, ingress and c2a in addition to the basic iframe fields

import { code } from '@equinor/eds-icons'
import type { PortableTextBlock, Rule, ValidationContext } from 'sanity'
import type { ColorListValue } from 'sanity-plugin-color-list'
import blocksToText from '../../helpers/blocksToText'
import { EdsIcon } from '../../icons'
import CharCounterEditor from '../components/CharCounterEditor'
import CompactBlockEditor from '../components/CompactBlockEditor'
import { configureBlockContent, configureTitleBlockContent } from '../editors'

const titleContentType = configureTitleBlockContent()

const descriptionContentType = configureBlockContent({
  h1: false,
  h2: false,
  h3: false,
  h4: false,
  attachment: false,
  internalLink: false,
  externalLink: false,
  lists: false,
})

const ingressContentType = configureBlockContent({
  h1: false,
  h2: false,
  h3: false,
  h4: false,
  attachment: false,
})

export type IFrame = {
  _type: 'iframe'
  title?: PortableTextBlock[]
  frameTitle: string
  url: string
  aspectRatio: string
  height?: number
  background?: ColorListValue
  cookiePolicy: 'none' | 'marketing' | 'statistics'
}

export default {
  title: 'Iframe',
  name: 'iframe',
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
    {
      title: 'IFrame settings',
      name: 'iframe',
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
      name: 'frameTitle',
      type: 'string',
      title: 'Frame title',
      fieldset: 'iframe',

      description: 'The title of the iframe. This value is not visible on the page but is required for accessibility.',
      validation: (Rule: Rule) =>
        Rule.custom((value: string, context: ValidationContext) => {
          const { parent } = context as { parent: IFrame }
          return parent?.url && value === undefined ? 'Required' : true
        }),
    },
    {
      name: 'url',
      type: 'url',
      title: 'Frame URL',
      description:
        'Link to the content to be loaded inside the iframe. Any URL must be whitelisted to load. Please make sure to verify that the iframe loads correctly before publishing, otherwise contact dev team for whitelisting.',
      fieldset: 'iframe',
      validation: (Rule: Rule) =>
        Rule.custom((value: any, context: ValidationContext) => {
          const { parent } = context as { parent: IFrame }
          return (parent?.title || parent?.frameTitle) && value === undefined ? 'Required' : true
        }),
    },
    {
      name: 'cookiePolicy',
      type: 'string',
      title: 'Cookie policy',
      description: 'Select which cookie policy applies to this iframe.',
      fieldset: 'iframe',

      options: {
        list: [
          { title: 'None', value: 'none' },
          { title: 'Marketing', value: 'marketing' },
          { title: 'Statistics', value: 'statistics' },
        ],
        layout: 'dropdown',
      },
      initialValue: 'none',
      validation: (Rule: Rule) => Rule.required(),
    },

    {
      name: 'aspectRatio',
      type: 'string',
      title: 'Aspect ratio',
      options: {
        list: [
          { title: '16:9', value: '16:9' },
          { title: '4:3', value: '4:3' },
          { title: '1:1', value: '1:1' },
        ],
        layout: 'dropdown',
      },
      fieldset: 'iframe',
      initialValue: '16:9',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'height',
      type: 'number',
      title: 'Height',
      description: 'Set a fixed height in pixels for the iframe. Note: this will override the aspect ratio setting.',
      fieldset: 'iframe',
      validation: (Rule: Rule) => Rule.positive().greaterThan(0).precision(0),
    },

    {
      name: 'description',
      title: 'Description/caption',
      description: `Here you can write a short description of the iframes content. This text will show up as a caption text right below the iframe.`,
      type: 'array',
      inputComponent: CharCounterEditor,
      of: [descriptionContentType],
    },
    {
      name: 'action',
      title: 'Link/action',
      description: 'You can add one separate link if you need. The link will show up at the bottom of the component.',
      type: 'array',
      of: [{ type: 'linkSelector', title: 'Link' }],
      validation: (Rule: Rule) => Rule.max(1),
    },

    /*     {
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
    }, */
  ],
  preview: {
    select: {
      title: 'title',
      frameTitle: 'frameTitle',
    },
    prepare({ title, frameTitle }: { title: PortableTextBlock[]; frameTitle: string }) {
      const plainTitle = title ? blocksToText(title) : undefined

      return {
        title: plainTitle || frameTitle,
        subtitle: `IFrame component`,
        media: EdsIcon(code),
      }
    },
  },
}
