import type { Image, PortableTextBlock, Reference, Rule } from 'sanity'
import blocksToText from '../../../helpers/blocksToText'
import { topicPromotionFilter } from '../../../helpers/referenceFilters'
import { Flags } from '../../../src/lib/datasetHelpers'
import { configureBlockContent } from '../../editors/blockContentType'
import routes from '../../routes'
import { validateCharCounterEditor } from '../../validations/validateCharCounterEditor'
import {
  ingress,
  theme,
  title,
  viewAllLink,
  viewAllLinkLabel,
} from '../commonFields/commonFields'

type PromotedTopicPage = {
  _key: string
  _type: 'topics'
  ingress: PortableTextBlock[]
  reference: Reference
}

export type TopicPromotion = {
  _type: 'promoteTopics'
  references: PromotedTopicPage[]
}

export default {
  title: 'Topic/magazine promotion',
  name: 'promoteTopics',
  type: 'object',
  fieldsets: [
    {
      name: 'design',
      title: 'Design options',
    },
  ],
  fields: [
    title,
    ingress,
    {
      name: 'references',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'topics',
          title: 'Pages',
          fields: [
            {
              title: 'Page to be promoted',
              name: 'reference',
              description: 'Select the page you want to promote',
              type: 'reference',
              to: [
                ...routes,
                Flags.HAS_MAGAZINE && { type: 'magazine' },
              ].filter(e => e),
              options: {
                filter: topicPromotionFilter,
                disableNew: true,
              },
            },
            {
              name: 'ingress',
              title: 'Ingress',
              description:
                'A short and catchy introduction text for this topic content card (max. 215 chars)',
              type: 'array',
              of: [configureBlockContent({ variant: 'ingress' })],
              validation: (Rule: Rule) =>
                Rule.custom((value: any) =>
                  validateCharCounterEditor(value, 215, true),
                ),
            },
          ],
          preview: {
            select: {
              topicTitle: 'reference.content.title',
              magazineTitle: 'reference.title',
              topicMedia: 'reference.content.heroFigure.image',
              magazineMedia: 'reference.heroFigure.image',
            },
            prepare({
              topicTitle,
              magazineTitle,
              topicMedia,
              magazineMedia,
            }: {
              topicTitle: PortableTextBlock[]
              magazineTitle: PortableTextBlock[]
              topicMedia: Image
              magazineMedia: Image
            }) {
              const title = topicTitle || magazineTitle || ''
              const plainTitle = title ? blocksToText(title) : ''

              return {
                title: plainTitle,
                media: topicMedia || magazineMedia,
              }
            },
          },
        },
      ],
      validation: (Rule: Rule) => Rule.unique(),
    },
    viewAllLink,
    viewAllLinkLabel,
    theme,
    {
      title: 'Background (Deprecated)',
      description: 'Please select a theme instead',
      name: 'background',
      type: 'colorlist',
      fieldset: 'design',
      readonly: true,
      hidden: ({ value }: any) => {
        return !value || value.title === 'White'
      },
    },
  ],
  preview: {
    select: {
      references: 'references',
      // Annoyingly, the select lines below are needed to resolve the references in the references object above
      reference1: 'references.0.reference.content.title',
      reference2: 'references.1.reference.content.title',
      reference3: 'references.2.reference.content.title',
      magazineRef1: 'references.0.reference.title',
      magazineRef2: 'references.1.reference.title',
      magazineRef3: 'references.2.reference.title',
    },
    prepare({ references }: { references: any[] }) {
      const titles = Object.entries(references)
        .map(reference => {
          if (reference[1]?.reference) {
            const ref = reference[1].reference
            if (ref?.title) {
              return blocksToText(ref.title)
            }

            if (ref?.content?.title) {
              return blocksToText(ref.content.title)
            }
          }
          return ''
        })
        .filter(Boolean)
      return {
        title: titles.join(', '),
        subtitle: `Topic promotions.`,
      }
    },
  },
}
