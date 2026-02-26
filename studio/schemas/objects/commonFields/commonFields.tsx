import { defineField, type Rule } from 'sanity'
import { filterByRoute } from '../../../helpers/referenceFilters'
import { CompactBlockEditor } from '../../components/CompactBlockEditor'
import { configureBlockContent } from '../../editors'
import routes from '../../routes'

export const title = {
  title: 'Title',
  name: 'title',
  type: 'array',
  components: {
    input: CompactBlockEditor,
  },
  of: [configureBlockContent({ variant: 'title' })],
  validation: (Rule: Rule) =>
    Rule.required().warning('In most cases you should add a title'),
}
export const hideTitle = {
  type: 'boolean',
  name: 'hideTitle',
  title: 'Hide title',
  description: 'Hides the title, but screen readers will read title',
}

export const ingress = {
  name: 'ingress',
  title: 'Ingress',
  type: 'array',
  components: {
    input: CompactBlockEditor,
  },
  of: [configureBlockContent({ variant: 'ingress' })],
}

export const viewAllLink = {
  name: 'viewAllLink',
  title: 'View all internal link',
  description: 'Use this if you want a "View all ..." link to e.g. all news',
  type: 'reference',
  to: routes,
  options: {
    filter: filterByRoute,
  },
}

export const viewAllLinkLabel = {
  name: 'viewAllLinkLabel',
  title: 'Label for the View all link',
  type: 'string',
}

export const background = {
  title: 'Background',
  description: 'Pick a colour for the background. Default is white.',
  name: 'background',
  type: 'colorlist',
  fieldset: 'design',
}

export const backgroundPosition = (hiddenCallBack?: any, fieldset?: string) => {
  return defineField({
    title: 'Select positioning of the image',
    description:
      'Optional - select focus origin in the image. Useful if the image gets cropped when not contained within its container. Use together with hotspot option in Sanity studio to make sure focal point is kept',
    name: 'backgroundPosition',
    type: 'string',
    options: {
      list: [
        { title: 'Center Left', value: 'center_left' },
        { title: 'Center Center', value: 'center_center' },
        { title: 'Center Right', value: 'center_right' },
        { title: 'Top Left', value: 'top_left' },
        { title: 'Top Center', value: 'top_center' },
        { title: 'Top Right', value: 'top_right' },
        { title: 'Bottom Left', value: 'bottom_left' },
        { title: 'Bottom Center', value: 'bottom_center' },
        { title: 'Bottom Right', value: 'bottom_right' },
      ],
      layout: 'dropdown',
    },
    initialValue: 'center_center',
    ...(fieldset && { fieldset }),
    ...(hiddenCallBack && { hidden: hiddenCallBack }),
  })
}

export const theme = {
  title: 'Theme',
  description:
    'Theme consisting of an background color and a foreground color for cards or similar',
  name: 'theme',
  type: 'themeSelector',
  fieldset: 'design',
}
export const layoutGrid = {
  title: 'Layout grid',
  name: 'layoutGrid',
  type: 'string',
  description: 'Select content grid column',
  options: {
    list: [
      { title: 'Third outer', value: 'sm' },
      { title: 'Second outer', value: 'md' },
      { title: 'Innermost', value: 'lg' },
    ],
  },
  initialValue: 'lg',
  fieldset: 'design',
}
export const gridColumns = {
  title: 'Number of grid columns',
  name: 'gridColumns',
  type: 'string',
  description: 'Select number of grid column. Mobile it will only be 1 column.',
  options: {
    list: [
      { title: '2', value: '2' },
      { title: '3', value: '3' },
      { title: '4', value: '4' },
    ],
  },
  initialValue: '3',
  hidden: ({ parent }: any) => {
    return parent?.layoutGrid === 'lg'
  },
  fieldset: 'design',
}
export const layoutDirection = {
  title: 'Layout direction',
  name: 'layoutDirection',
  type: 'string',
  description: 'Select layout direction. ',
  options: {
    list: [
      { title: 'Stack in column', value: 'col' },
      { title: 'Stack in row', value: 'row' },
    ],
    layout: 'radio',
  },
  fieldset: 'design',
  initialValue: 'col',
}

export const backdropStyle = (hiddenCallBack?: any, fieldset?: string) => {
  return {
    title: 'Backdrop glass effect',
    name: 'backdropStyle',
    type: 'boolean',
    description:
      'Applies a glass blur backdrop style behind text with padding and rounded corners',
    initialValue: false,
    ...(fieldset && { fieldset }),
    ...(hiddenCallBack && { hidden: hiddenCallBack }),
  }
}
