import React from 'react'
import { ExternalLinkRenderer, SuperScriptRenderer, SubScriptRenderer } from '../components'
import { SchemaType } from '../../types'
import { link, attach_file, external_link } from '@equinor/eds-icons'
import { IconSuperScript, IconSubScript, EdsIcon } from '../../icons'

// TODO: write proper types if none become available from @sanity
export type BlockFieldType = {
  type: string
  styles: { title: string; value: string }[]
  lists: { title: string; value: string }[] | []
  marks: {
    decorators: any[]
    annotations: any[]
  }
}

export type BlockContentProps = {
  h1?: boolean
  h2?: boolean
  h3?: boolean
  h4?: boolean
  internalLink?: boolean
  externalLink?: boolean
  attachment?: boolean
  lists?: boolean
}

export const configureBlockContent = (options: BlockContentProps = {}): BlockFieldType => {
  const {
    h1 = false,
    h2 = true,
    h3 = true,
    h4 = false,
    internalLink = true,
    externalLink = true,
    attachment = false,
    lists = true,
  } = options

  const config: BlockFieldType = {
    type: 'block',
    styles: [{ title: 'Normal', value: 'normal' }],
    lists: lists
      ? [
          { title: 'Numbered', value: 'number' },
          { title: 'Bullet', value: 'bullet' },
        ]
      : [],
    marks: {
      decorators: [
        { title: 'Strong', value: 'strong' },
        { title: 'Emphasis', value: 'em' },
        {
          title: 'Sub',
          value: 'sub',
          blockEditor: {
            icon: IconSubScript,
            render: SubScriptRenderer,
          },
        },
        {
          title: 'Super',
          value: 'sup',
          blockEditor: {
            icon: IconSuperScript,
            render: SuperScriptRenderer,
          },
        },
      ],
      annotations: [],
    },
  }

  const h1Config = { title: 'Title (h1)', value: 'h1' }
  const h2Config = { title: 'Title (h2)', value: 'h2' }
  const h3Config = { title: 'Subtitle (h3)', value: 'h3' }
  const h4Config = { title: 'Subsubtitle (h4)', value: 'h4' }

  const externalLinkConfig = {
    name: 'link',
    type: 'object',
    title: 'External link',
    blockEditor: {
      render: ExternalLinkRenderer,
      icon: () => EdsIcon(external_link),
    },
    fields: [
      {
        name: 'href',
        type: 'url',
        validation: (Rule: any) => Rule.uri({ scheme: ['http', 'https', 'tel', 'mailto'] }),
      },
    ],
  }

  const internalLinkConfig = {
    name: 'internalLink',
    type: 'object',
    title: 'Internal link',
    blockEditor: {
      icon: () => EdsIcon(link),
    },
    fields: [
      {
        name: 'reference',
        type: 'reference',
        to: [
          {
            type: 'news',
          },
          { type: 'route_en_GB' },
          { type: 'route_nb_NO' },
        ],
        options: {
          filter: ({ document }: { document: any }) => ({
            // @TODO: Fix _lang for English version. Atm we can't link to
            // English topic pages and can't filter for news articles in the same language
            filter: `_type == $routeLang || _type == 'news'`,
            params: { routeLang: `route_${document._lang}` },
          }),
        },
        validation: (Rule: SchemaType.ValidationRule): SchemaType.ValidationRule => Rule.required(),
      },
    ],
  }

  const attachmentConfig = {
    name: 'attachment',
    type: 'object',
    title: 'Attachment',
    blockEditor: {
      icon: () => EdsIcon(attach_file),
    },
    fields: [
      {
        name: 'reference',
        type: 'reference',
        to: [{ type: 'fileUpload' }],
      },
    ],
  }

  if (h1) {
    config.styles.push(h1Config)
  }

  if (h2) {
    config.styles.push(h2Config)
  }

  if (h3) {
    config.styles.push(h3Config)
  }

  if (h4) {
    config.styles.push(h4Config)
  }

  if (externalLink) {
    config.marks.annotations.push(externalLinkConfig)
  }

  if (internalLink) {
    config.marks.annotations.push(internalLinkConfig)
  }

  if (attachment) {
    config.marks.annotations.push(attachmentConfig)
  }

  return config
}

export default configureBlockContent()
