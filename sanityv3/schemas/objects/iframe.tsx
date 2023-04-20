// This version of the iframe is used by Topic Pages
// It features description, ingress and c2a in addition to the basic iframe fields

import { code } from '@equinor/eds-icons'
import type { PortableTextBlock, Rule } from 'sanity'
import type { ColorSelectorValue } from '../components/ColorSelector'
import blocksToText from '../../helpers/blocksToText'
import { EdsIcon } from '../../icons'
import CharCounterEditor from '../components/CharCounterEditor'
import { configureBlockContent, configureTitleBlockContent } from '../editors'
import { title, frameTitle, description, cookiePolicy, aspectRatio, url, height } from './iframe/sharedIframeFields'

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
  background?: ColorSelectorValue
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
    title,
    {
      name: 'ingress',
      title: 'Ingress',
      type: 'array',
      components: {
        input: CharCounterEditor,
      },
      of: [ingressContentType],
    },
    frameTitle,
    url,
    cookiePolicy,
    aspectRatio,
    height,
    description,
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
