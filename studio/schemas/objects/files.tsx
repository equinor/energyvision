import { file, library_pdf, microsoft_excel } from '@equinor/eds-icons'
import type { JSX } from 'react'
import type { File, Rule, ValidationContext } from 'sanity'
import { apiVersion } from '@/sanity.client'
import { EdsIcon } from '../../icons'

export type DownloadableFile = {
  _type: 'downloadableFile'
  filename: string
  file: File
}

const validation = () => (Rule: Rule) =>
  Rule.custom(async (value: any, context: ValidationContext) => {
    if (value?._ref) {
      const assetRef = await context
        .getClient({ apiVersion: apiVersion })
        .fetch(/* groq */ `*[_id == $id][0]{"asset": asset.asset}.asset`, {
          id: value._ref,
        })

      if (!assetRef?._ref) return 'Reference must have file attachment'
      return true
    }
    return 'Required'
  })

export default {
  type: 'object',
  name: 'downloadableFile',
  title: 'File',
  fields: [
    {
      name: 'filename',
      type: 'string',
      title: 'Name',
      description: 'The label used for the link',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'fileReference',
      type: 'reference',
      title: 'File asset',
      description:
        'Select the asset you want to link to. These can be managed/created in the asset library.',
      to: [{ type: 'assetFile' }],
      validation: validation(),
    },
  ],
  preview: {
    select: {
      title: `filename`,
      extension: 'fileReference.asset.asset.extension',
    },
    prepare({ title = '', extension }: { title: string; extension: string }) {
      let Icon: JSX.Element
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
