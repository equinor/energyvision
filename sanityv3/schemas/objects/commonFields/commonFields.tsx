import { configureBlockContent } from '../../editors'
import CompactBlockEditor from '../../components/CompactBlockEditor'
import { Rule } from 'sanity'
import routes from '../../routes'
import { filterByRoute } from '../../../helpers/referenceFilters'

export const title = {
  title: 'Title',
  name: 'title',
  type: 'array',
  components: {
    input: CompactBlockEditor,
  },
  of: [configureBlockContent({ variant: 'title' })],
  validation: (Rule: Rule) => Rule.required().warning('In most cases you should add a title'),
}

export const ingress = {
  name: 'ingress',
  title: 'Ingress',
  type: 'array',
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
