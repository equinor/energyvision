import type { Rule, ValidationContext } from 'sanity'
import { CompactBlockEditor } from '../../components/CompactBlockEditor'
import { configureBlockContent } from '../../editors'
import type { IFrame } from '../iframe'
import singleItemArray from '../singleItemArray'

export const title = {
  name: 'title',
  type: 'array',
  title: 'Title',
  description: 'The (optional) title/heading',
  components: { input: CompactBlockEditor },
  of: [configureBlockContent({ variant: 'title' })],
}

export const frameTitle = {
  name: 'frameTitle',
  type: 'string',
  title: 'Frame title',
  fieldset: 'iframe',

  description:
    'The title of the iframe. This value is not visible on the page but is required for accessibility.',
  validation: (Rule: Rule) =>
    Rule.custom((value: string, context: ValidationContext) => {
      const { parent } = context as { parent: IFrame }
      return parent?.url && value === undefined ? 'Required' : true
    }),
}

export const url = {
  name: 'url',
  type: 'url',
  title: 'Frame URL',
  description:
    'Link to the content to be loaded inside the iframe. Any URL must be whitelisted to load. Please make sure to verify that the iframe loads correctly before publishing, otherwise contact dev team for whitelisting.',
  fieldset: 'iframe',
  validation: (Rule: Rule) =>
    Rule.custom((value: any, context: ValidationContext) => {
      const { parent } = context as { parent: IFrame }
      return (parent?.title || parent?.frameTitle) && value === undefined
        ? 'Required'
        : true
    }),
}

export const cookiePolicy = {
  name: 'cookiePolicy',
  type: 'array',
  title: 'Cookie policy',
  description: 'Select which cookie policy applies to this iframe.',
  fieldset: 'iframe',
  of: [{ type: 'string' }],
  options: {
    list: [
      { title: 'None', value: 'none' },
      { title: 'Preferences', value: 'preferences' },
      { title: 'Statistics', value: 'statistics' },
      { title: 'Marketing', value: 'marketing' },
    ],
  },
  initialValue: ['none'],
  validation: (Rule: Rule) =>
    Rule.custom((value: any) => {
      if (value === undefined || value?.length === 0) return 'Required'
      if (value.length > 1 && value.includes('none'))
        return `Cannot select ${value.toString()} together`
      return true
    }),
}

export const aspectRatio = {
  name: 'aspectRatio',
  type: 'string',
  title: 'Aspect ratio',
  options: {
    list: [
      { title: '16:9', value: '16:9' },
      { title: '4:3', value: '4:3' },
      { title: '1:1', value: '1:1' },
    ],
    layout: 'dropdown',
  },
  fieldset: 'iframe',
  initialValue: '16:9',
  validation: (Rule: Rule) => Rule.required(),
}
export const height = {
  name: 'height',
  type: 'number',
  title: 'Height',
  description:
    'Set a fixed height in pixels for the iframe. Note: this will override the aspect ratio setting.',
  fieldset: 'iframe',
  validation: (Rule: Rule) => Rule.positive().greaterThan(0).precision(0),
}

export const description = {
  name: 'description',
  title: 'Description/caption',
  description: `Here you can write a short description of the iframes content.`,
  type: 'array',
  of: [configureBlockContent({ variant: 'simpleBlock' })],
}

export const transcript = {
  name: 'transcript',
  title: 'Enter transcript if this iframe is a youtube video.',
  type: 'transcript',
}
export const action = singleItemArray({
  name: 'action',
  title: 'Link/action',
  description:
    'You can add one separate link if you need. The link will show up at the bottom of the component.',
  type: 'array',
  of: [{ type: 'linkSelector', title: 'Link' }],
})
