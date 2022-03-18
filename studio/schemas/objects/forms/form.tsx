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
      type: 'string',
      name: 'form',
      description: 'Select the type of form to show',
      title: 'Type of form',
      options: {
        list: [
          { title: 'Subscribe Form', value: 'subscribeForm' },
          { title: 'Contact Equinor form', value: 'contactEquinorForm' },
          { title: 'Careers contact form', value: 'careersContactForm' },
          { title: 'Order reports', value: 'orderReportsForm' },
          { title: 'Career fairs and visits', value: 'careerFairAndVisitsForm' },
        ],
        layout: 'dropdown',
      },
      validation: (Rule: Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: 'title',
      type: 'form',
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
