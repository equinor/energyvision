import type { PortableTextBlock, Rule, ValidationContext } from 'sanity'
import blocksToText from '../../helpers/blocksToText'
import { Flags } from '../../src/lib/datasetHelpers'
import { CompactBlockEditor } from '../components/CompactBlockEditor'
import { configureBlockContent } from '../editors'
import { validateRequiredIfVisible } from '../validations/validateRequiredIfVisible'
import type { DownloadableFile } from './files'

const titleContentType = configureBlockContent({ variant: 'title' })

export type Form = {
  _type: 'form'
  form: FormType
  title?: PortableTextBlock[]
  ingress?: PortableTextBlock[]
  downloads: DownloadableFile[]
}

type FormType =
  | 'subscribeForm'
  | 'contactEquinorForm'
  | 'careersContactForm'
  | 'orderReportsForm'
  | 'careerFairAndVisitsForm'
  | 'pensionForm'

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
      components: {
        input: CompactBlockEditor,
      },
      of: [titleContentType],
    },
    {
      name: 'ingress',
      title: 'Ingress',
      type: 'array',
      of: [configureBlockContent({ variant: 'ingress' })],
    },
    {
      type: 'string',
      name: 'form',
      description: 'Select the type of form to show',
      title: 'Type of form',
      options: {
        list: [
          Flags.HAS_SUBSCRIBE_FORM && {
            title: 'Subscribe Form',
            value: 'subscribeForm',
          },
          Flags.HAS_CONTACT_EQUINOR_FORM && {
            title: 'Contact Equinor form',
            value: 'contactEquinorForm',
          },
          Flags.HAS_CAREERS_CONTACT_FORM && {
            title: 'Careers contact form',
            value: 'careersContactForm',
          },
          Flags.HAS_ORDER_REPORT_FORM && {
            title: 'Order reports',
            value: 'orderReportsForm',
          },
          Flags.HAS_CAREER_FAIR_AND_VISITS_FORM && {
            title: 'Career fairs and visits',
            value: 'careerFairAndVisitsForm',
          },
          Flags.HAS_PENSION_FORM && {
            title: 'Pension form',
            value: 'pensionForm',
          },
        ].filter(e => e),
        layout: 'dropdown',
      },
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      type: 'array',
      name: 'downloads',
      description: 'Downloadable reports to show in the Order reports form',
      title: 'Downloadable files',
      of: [{ type: 'downloadableFile', title: 'Downloadable file' }],
      validation: (Rule: Rule) =>
        Rule.custom((value: string, context: ValidationContext) => {
          const { parent } = context as { parent: Form }
          return validateRequiredIfVisible(
            parent?.form === 'orderReportsForm',
            value,
            'You must add reports',
          )
        }).unique(),
      hidden: ({ parent }: { parent: Form }) =>
        parent?.form !== 'orderReportsForm',
    },
  ],
  preview: {
    select: {
      title: 'title',
      type: 'form',
    },
    prepare({
      title = [],
      type,
    }: {
      title: PortableTextBlock[]
      type: FormType
    }) {
      const plainTitle = title ? blocksToText(title) : undefined

      const getFormType = (type: FormType) => {
        if (type === 'subscribeForm') {
          return 'Subscribe Form'
        }
        if (type === 'contactEquinorForm') {
          return 'Contact Equinor form'
        }
        if (type === 'careersContactForm') {
          return 'Careers contact form'
        }
        if (type === 'orderReportsForm') {
          return 'Order reports'
        }
        if (type === 'pensionForm') {
          return 'Pension form'
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
