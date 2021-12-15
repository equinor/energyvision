import React from 'react'
import blocksToText from '../../helpers/blocksToText'
import { Colors } from '../../helpers/ColorListValues'
import { configureBlockContent, configureTitleBlockContent } from '../editors'
import CompactBlockEditor from '../components/CompactBlockEditor'
import CharCounterEditor from '../components/CharCounterEditor'

import type { Rule, Block } from '@sanity/types'
import type { ColorListValue } from 'sanity-plugin-color-list'

export type Table = {
  _type: 'promotion'
  title?: Block[]
  ingress?: Block[]
  background?: ColorListValue
}

const titleContentType = configureTitleBlockContent()

const ingressContentType = configureBlockContent({
  h1: false,
  h2: false,
  h3: false,
  h4: false,
  attachment: false,
})
const chosenColors = ['White', 'Moss Green', 'Moss Green Light', 'Spruce Wood', 'Mist Blue']
const backgroundColors = Colors.filter((color) => chosenColors.includes(color.title))
export default {
  title: 'Table',
  name: 'table',
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
      title: 'Title',
      name: 'title',
      type: 'array',
      inputComponent: CompactBlockEditor,
      of: [titleContentType],
      validation: (Rule: Rule) => Rule.required().warning('In most cases you should add a title'),
    },
    {
      name: 'ingress',
      title: 'Ingress',
      type: 'array',
      inputComponent: CharCounterEditor,
      of: [ingressContentType],
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
        list: backgroundColors,
      },
      fieldset: 'design',
      initialValue: backgroundColors[0],
    },
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title = [] }: { title: Block[] }) {
      const plainTitle = title ? blocksToText(title) : undefined

      return {
        title: plainTitle,
        subtitle: 'Table component',
      }
    },
  },
}
