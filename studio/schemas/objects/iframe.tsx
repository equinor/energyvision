// This version of the iframe is used by Topic Pages
// It features description, ingress and c2a in addition to the basic iframe fields

import React from 'react'
import { code } from '@equinor/eds-icons'
import { EdsIcon } from '../../icons'
import { Colors } from '../../helpers/ColorListValues'
import { configureBlockContent } from '../editors'
import CharCounterEditor from '../components/CharCounterEditor'
import blocksToText from '../../helpers/blocksToText'
import type { Rule, Block } from '@sanity/types'
import type { ColorListValue } from 'sanity-plugin-color-list'
import {
  title,
  frameTitle,
  description,
  cookiePolicy,
  aspectRatio,
  url,
  height,
  action,
} from './iframe/sharedIframeFields'

const ingressContentType = configureBlockContent({
  h1: false,
  h2: false,
  h3: false,
  h4: false,
  attachment: false,
})

export type IFrame = {
  _type: 'iframe'
  title?: Block[]
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
    title,
    {
      name: 'ingress',
      title: 'Ingress',
      type: 'array',
      inputComponent: CharCounterEditor,
      of: [ingressContentType],
    },
    frameTitle,
    url,
    cookiePolicy,
    aspectRatio,
    height,
    description,
    action,
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
      title: 'title',
      frameTitle: 'frameTitle',
    },
    prepare({ title, frameTitle }: { title: Block[]; frameTitle: string }) {
      const plainTitle = title ? blocksToText(title) : undefined

      return {
        title: plainTitle || frameTitle,
        subtitle: `IFrame component`,
        media: EdsIcon(code),
      }
    },
  },
}
