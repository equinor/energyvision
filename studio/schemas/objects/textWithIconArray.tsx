import { view_module } from '@equinor/eds-icons'
import blocksToText from '../../helpers/blocksToText'
import { EdsIcon } from '../../icons'
import CompactBlockEditor from '../components/CompactBlockEditor'
import { SchemaType } from '../../types'
import { configureBlockContent } from '../editors'

export default {
  type: 'object',
  name: 'textWithIconArray',
  title: 'Icon & Text',
  fieldsets: [
    {
      name: 'design',
      title: 'Design options',
    },
  ],
  fields: [
    {
      name: 'title',
      type: 'array',
      inputComponent: CompactBlockEditor,
      of: [configureBlockContent({ variant: 'title' })],
      title: 'Title',
      description: 'The list of icon/text should have a heading, can be hidden below',
    },
    {
      name: 'hideTitle',
      type: 'boolean',
      title: 'Hide title',
      description: 'Hides title, but is available for screen readers and gives an meaningful heading for the list',
    },
    {
      type: 'array',
      name: 'group',
      title: 'Icon & Text',
      of: [{ type: 'textWithIcon' }],
      validation: (Rule: SchemaType.ValidationRule) => Rule.required(),
    },
    {
      title: 'Background',
      description: 'Pick a colour for the background. Default is white.',
      name: 'background',
      type: 'colorlist',
      fieldset: 'design',
    },
  ],
  preview: {
    select: {
      title: 'title',
      group: 'group',
    },
    prepare({ group, title }: any) {
      const plainText = blocksToText(title)
      const previewTitle = plainText ? plainText : group ? generatePreviewTitle(group) : 'Missing content'
      return {
        title: previewTitle,
        subtitle: `${group ? group.length : 0} Text with Icon component(s)`,
        media: <div>{EdsIcon(view_module)}</div>,
      }
    },
  },
}

const generatePreviewTitle = (group: any) => {
  return group.reduce((sum: string, current: any, index: number): string => {
    const cutOff = 20

    let string = ''

    if (current.title) {
      string = current.title.substr(0, cutOff).trim()
    } else if (current.text) {
      const plainText = blocksToText(current.text)
      string = plainText ? plainText.slice(0, cutOff).trim() : `Missing title and text`
    } else {
      string = `Missing title and text`
    }

    return sum + `${index + 1}: ${string.length < cutOff ? string : string + '...'} `
  }, '')
}
