import React from 'react'
import blocksToText from '../../../helpers/blocksToText'
import { Colors } from '../../../helpers/ColorListValues'
import { configureBlockContent, configureTitleBlockContent } from '../../editors'
import CompactBlockEditor from '../../components/CompactBlockEditor'
import CharCounterEditor from '../../components/CharCounterEditor'

import type { Rule, Block } from '@sanity/types'
import type { ColorListValue } from 'sanity-plugin-color-list'
import { Flags } from '../../../src/lib/datasetHelpers'
import { calendar_event, contacts, library_books } from '@equinor/eds-icons'
import { EdsIcon } from '../../../icons'

export type Promotion = {
  _type: 'promotion'
  type: 'news' | 'topic' | 'people'
  title?: Block[]
  ingress?: Block[]
  background?: ColorListValue
}

type PromotionType = 'promoteTopics' | 'promoteNews' | 'promotePeople' | 'promoteEvents' | 'promoteMagazine'

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
  title: 'Promotion',
  name: 'promotion',
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
      type: 'array',
      name: 'promotion',
      description: 'Select what type of content you want to promote',
      title: 'Type of promotion',
      of: [
        Flags.HAS_NEWS && { type: 'promoteNews', title: 'Promote news' },
        { type: 'promoteTopics', title: 'Promote topic' },
        { type: 'promotePeople', title: 'Promote people' },
        Flags.HAS_EVENT && { type: 'promoteEvents', title: 'Promote events' },
        Flags.IS_DEV && { type: 'promoteMagazine', title: 'Promote magazine' },
      ].filter((e) => e),
      options: { sortable: false },
      validation: (Rule: Rule) => Rule.required().min(1).max(1),
    },
    {
      name: 'useHorizontalScroll',
      title: 'Use horizontal scroll',
      description:
        'When this is enabled, the promotion will use horizontal scroll if the amount of content is greater than the screen size allows. This feature is enabled by default for smaller screen sizes.',
      type: 'boolean',
      initialValue: false,
      readOnly: !Flags.IS_DEV,
      hidden: !Flags.IS_DEV,
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
      type: 'promotion[0]._type',
    },
    prepare({ title = [], type }: { title: Block[]; type: PromotionType }) {
      const plainTitle = title ? blocksToText(title) : undefined

      const getPromotionType = (type: PromotionType) => {
        if (type === 'promoteTopics') {
          return 'Topic page promotion'
        } else if (type == 'promotePeople') {
          return 'People promotion'
        } else if (type == 'promoteEvents') {
          return 'Events promotion'
        } else if (type == 'promoteMagazine') {
          return 'Magazine promotion'
        }
        return 'News promotions'
      }

      const getPromotionIcon = (type: PromotionType) => {
        if (type == 'promotePeople') {
          return EdsIcon(contacts)
        } else if (type == 'promoteEvents') {
          return EdsIcon(calendar_event)
        } else if (type == 'promoteMagazine') {
          return EdsIcon(library_books)
        }
        return
      }

      return {
        title: plainTitle,
        subtitle: getPromotionType(type),
        media: getPromotionIcon(type),
      }
    },
  },
}
