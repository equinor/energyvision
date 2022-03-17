import { configureBlockContent, configureTitleBlockContent } from '../../editors'
import CompactBlockEditor from '../../components/CompactBlockEditor'
import CharCounterEditor from '../../components/CharCounterEditor'
import type { Rule, Block } from '@sanity/types'
import blocksToText from '../../../helpers/blocksToText'

const titleContentType = configureTitleBlockContent()

type FormType =
  | 'subscribeForm'
  | 'contactEquinorForm'
  | 'careersContactForm'
  | 'orderReportsForm'
  | 'careerFairAndVisitsForm'

const ingressContentType = configureBlockContent({
  h1: false,
  h2: false,
  h3: false,
  h4: false,
  attachment: false,
})

export default {
  name: 'form',
  type: 'object',
  title: 'Form',
  description: 'This component shows choosen form',
  fields: [
    {
      name: 'title',
      type: 'array',
      title: 'Title',
      description: 'The (optional) title/heading shown above the form.',
      inputComponent: CompactBlockEditor,
      of: [titleContentType],
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
      name: 'form',
      description: 'Select the type of form to show',
      title: 'Type of form',
      of: [
        { type: 'subscribeForm', title: 'Subscribe Form' },
        { type: 'contactEquinorForm', title: 'Contact Equinor form' },
        { type: 'careersContactForm', title: 'Careers contact form' },
        { type: 'orderReportsForm', title: 'Order reports' },
        { type: 'careerFairAndVisitsForm', title: 'Career fairs and visits' },
      ],
      options: { sortable: false },
      validation: (Rule: Rule) => Rule.required().min(1).max(1),
    },
  ],
  preview: {
    select: {
      title: 'title',
      type: 'form[0]._type',
    },
    prepare({ title = [], type }: { title: Block[]; type: FormType }) {
      const plainTitle = title ? blocksToText(title) : undefined

      const getFormType = (type: FormType) => {
        if (type === 'subscribeForm') {
          return 'Subscribe Form'
        } else if (type == 'contactEquinorForm') {
          return 'Contact Equinor form'
        } else if (type == 'careersContactForm') {
          return 'Careers contact form'
        } else if (type == 'orderReportsForm') {
          return 'Order reports'
        }
        return 'Career fairs and visits'
      }

      return {
        title: plainTitle,
        subtitle: getFormType(type),
      }
    },
  },
}
