import React from 'react'
import { configureBlockContent } from '../editors/blockContentType'
import blocksToText from '../../helpers/blocksToText'
import { puzzle_filled } from '@equinor/eds-icons'
import { EdsIcon } from '../../icons'
import type { ImageWithAlt } from './imageWithAlt'
import { Rule } from '@sanity/types/dist/dts'
// eslint-disable-next-line import/no-unresolved
import sanityClient from 'part:@sanity/base/client'
import { Flags } from '../../src/lib/datasetHelpers'

const client = sanityClient.withConfig({
  apiVersion: '2021-05-19',
  projectId: process.env.SANITY_STUDIO_API_PROJECT_ID || 'h61q9gi9',
  token: process.env.SANITY_STUDIO_MUTATION_TOKEN,
})

const blockContentType = configureBlockContent({
  h1: false,
  h2: false,
  h3: false,
  h4: false,
  internalLink: false,
  externalLink: false,
  attachment: false,
  lists: false,
})

export default {
  title: 'Short text with icon',
  name: 'textWithIcon',
  type: 'object',
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string',
    },
    {
      name: 'text',
      title: 'Text',
      type: 'array',
      of: [blockContentType],
    },
    Flags.IS_DEV && {
      title: 'Icon',
      name: 'icon',
      type: 'imageWithAlt',
      options: {
        accept: 'image/svg+xml',
        hotspot: false,
      },
      validation: (Rule: Rule) =>
        Rule.custom((imageWithAlt: ImageWithAlt) => {
          const referencedId = imageWithAlt?.asset?._ref
          if (referencedId) {
            return client
              .fetch(`*[_id == $id][0]{extension}`, {
                id: referencedId,
              })
              .then((res: any) => {
                return res.extension === 'svg' ? true : 'Only svg files are allowed'
              })
          } else return true
        }),
    },
    !Flags.IS_DEV && {
      title: 'Icon',
      name: 'icon',
      type: 'imageWithAlt',
      options: {
        accept: 'image/svg+xml',
        hotspot: false,
      },
    },
  ].filter((e) => e),
  preview: {
    select: {
      title: `title`,
      text: `text`,
      icon: 'icon',
    },
    prepare({ title = '', text = null, icon }: { title: string; text: any; icon: any }) {
      return {
        title: text ? blocksToText(text) : title || 'Missing content',
        subtitle: 'Text with icon component',
        media: icon?.asset || <div>{EdsIcon(puzzle_filled)}</div>,
      }
    },
  },
}
