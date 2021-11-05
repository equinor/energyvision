import React from 'react'
import { library_pdf, microsoft_excel, file } from '@equinor/eds-icons'
import { EdsIcon } from '../../icons'
import type { Rule, File } from '@sanity/types'

export type DownloadableFile = {
  _type: 'downloadableFile'
  filename: string
  file: File
}

export default {
  type: 'object',
  name: 'downloadableFile',
  title: 'File',
  fields: [
    {
      name: 'filename',
      type: 'string',
      title: 'Name',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'file',
      type: 'file',
      title: 'File',
      options: {
        accept: '.pdf,.xls,.xlsx',
      },
      validation: (Rule: Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: `filename`,
      extension: 'file.asset.extension',
    },
    prepare({ title = '', extension }: { title: string; extension: string }) {
      let Icon
      switch (extension) {
        case 'pdf': {
          Icon = EdsIcon(library_pdf)
          break
        }
        case 'xlsx': {
          Icon = EdsIcon(microsoft_excel)
          break
        }
        case 'xls': {
          Icon = EdsIcon(microsoft_excel)
          break
        }
        default:
          Icon = EdsIcon(file)
          break
      }

      return {
        title,
        media: Icon,
        subtitle: 'File',
      }
    },
  },
}
