import { EdsIcon } from '../../icons'
import { microsoft_excel, library_pdf, file, library_books } from '@equinor/eds-icons'
import type { Rule } from '@sanity/types'

const fileIcon = (extension: string) => {
  switch (extension) {
    case 'pdf':
      return EdsIcon(library_pdf)
    case 'xls':
    case 'xlsx':
      return EdsIcon(microsoft_excel)
    default:
      return EdsIcon(file)
  }
}

export default {
  title: 'File',
  type: 'document',
  name: 'assetFile',
  icon: EdsIcon(library_books),
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string',
      description: 'For internal use',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      title: 'File attachment',
      name: 'asset',
      type: 'file',
      description:
        'Add the file attachment here. You can replace this file at a later point and all references to this file document will be updated automatically.',
      options: {
        accept: '.pdf,.xls,.xlsx,.csv',
      },
    },
    {
      title: 'Tags',
      name: 'tagReference',
      type: 'array',
      description: 'Adds tags to asset file',
      of: [
        {
          type: 'reference',
          to: [{ type: 'assetTag' }],
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'title',
      extension: 'asset.asset.extension',
      filename: 'asset.asset.originalFilename',
    },
    prepare(selection: { title: string; extension: string; filename: any }) {
      const { title, extension, filename } = selection
      const subtitle = extension ? `${extension} | ${filename}` : 'File attachment missing'

      return {
        title: title,
        subtitle: subtitle,
        media: fileIcon(extension),
      }
    },
  },
}
