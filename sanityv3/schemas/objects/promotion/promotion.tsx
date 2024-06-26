/* eslint-disable @typescript-eslint/ban-ts-comment */
import blocksToText from '../../../helpers/blocksToText'
import CompactBlockEditor from '../../components/CompactBlockEditor'
import { configureBlockContent, configureTitleBlockContent } from '../../editors'
import type { MagazinePromotion } from './promoteMagazine'
import type { TopicPromotion } from './promoteTopic'
import { calendar_event, contacts, library_books } from '@equinor/eds-icons'
import type { CustomValidatorResult, PortableTextBlock, Rule, ValidationError } from 'sanity'
import type { ColorSelectorValue } from '../../components/ColorSelector'
import { EdsIcon } from '../../../icons'
import { Flags } from '../../../src/lib/datasetHelpers'

import routes from '../../routes'
import { filterByRoute } from '../../../helpers/referenceFilters'

const promotionLengthValidation = (context: Promotion): true | ValidationError => {
  const { promotion } = context
  const promo = promotion[0]
  const numberOfItems = promo._type === 'promoteTopics' ? promo.references?.length : promo.promotedArticles?.length
  const MIN = 3
  const MAX = 3

  const validateNumber = (length: number): true | ValidationError => {
    if (length < MIN)
      // @ts-ignore
      return { message: `Must have ${MIN} items`, paths: ['promotion'] }
    if (length > MAX)
      // @ts-ignore
      return { message: `Must have ${MIN} items`, paths: ['promotion'] }

    return true
  }

  if (promo._type === 'promoteMagazine' && !promo.manuallySelectArticles) return true

  return validateNumber(numberOfItems)
}

export type Promotion = {
  _type: 'promotion'
  title?: PortableTextBlock[]
  ingress?: PortableTextBlock[]
  promotion: TopicPromotion | MagazinePromotion | any // @TODO: add other types
  useHorizontalScroll: boolean
  background?: ColorSelectorValue
}

type PromotionType = 'promoteTopics' | 'promoteNews' | 'promotePeople' | 'promoteEvents' | 'promoteMagazine'

const titleContentType = configureTitleBlockContent()

const ingressContentType = configureBlockContent({
  h2: false,
  h3: false,
  h4: false,
  attachment: false,
})

export default {
  title: 'Promotion',
  name: 'promotion',
  type: 'object',
  fieldsets: [
    {
      title: 'Design options',
      name: 'design',
      description: 'Some options for design',
      options: {
        collapsible: true,
        collapsed: false,
      },
    },
  ],
  validation: (Rule: Rule) =>
    Rule.custom((value: Promotion): CustomValidatorResult => {
      const typesToValidate = ['promoteTopics', 'promoteMagazine', 'promoteNews']

      if (typesToValidate.includes(value.promotion[0]._type)) {
        return promotionLengthValidation(value)
      }

      return true
    }),
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'array',
      components: {
        input: CompactBlockEditor,
      },
      of: [titleContentType],
      validation: (Rule: Rule) => Rule.required().warning('In most cases you should add a title'),
    },
    {
      name: 'ingress',
      title: 'Ingress',
      type: 'array',
      of: [ingressContentType],
    },
    {
      type: 'array',
      name: 'promotion',
      description: 'Select what type of content you want to promote',
      title: 'Type of promotion',
      of: [
        Flags.HAS_NEWS && { type: 'promoteNews', title: 'Promote news' },
        { type: 'promoteTopics', title: 'Promote topic' },
        { type: 'promotePeople', title: 'Promote people' },
        Flags.HAS_EVENT && { type: 'promoteEvents', title: 'Promote events' },
        Flags.HAS_MAGAZINE && { type: 'promoteMagazine', title: 'Promote magazine' },
      ].filter((e) => e),
      options: { sortable: false },
      validation: (Rule: Rule) => Rule.required().min(1).max(1),
    },
    {
      name: 'viewAllLink',
      title: 'View all internal link',
      description: 'Use this if you want a "View all ..." link to e.g. all news',
      type: 'reference',
      to: routes,
      options: {
        filter: filterByRoute,
      },
    },
    {
      name: 'viewAllLinkLabel',
      title: 'Label for the View all link',
      type: 'string',
    },
    {
      name: 'useHorizontalScroll',
      title: 'Use horizontal scroll',
      description: '(Deprecated) Not used anymore. Will be removed after an interval',
      type: 'boolean',
      initialValue: false,
    },
    {
      title: 'Background',
      description: 'Pick a colour for the background. Default is white.',
      name: 'background',
      type: 'colorlist',
      fieldset: 'design',
    },
  ].filter((e) => e),
  preview: {
    select: {
      title: 'title',
      type: 'promotion[0]._type',
    },
    prepare({ title = [], type }: { title: PortableTextBlock[]; type: PromotionType }) {
      const plainTitle = title ? blocksToText(title) : undefined

      const getPromotionType = (type: PromotionType) => {
        if (type === 'promoteTopics') {
          return 'Topic page promotion'
        } else if (type == 'promotePeople') {
          return 'People promotion'
        } else if (type == 'promoteEvents') {
          return 'Events promotion'
        } else if (type == 'promoteMagazine') {
          return 'Magazine promotion'
        }
        return 'News promotions'
      }

      const getPromotionIcon = (type: PromotionType) => {
        if (type == 'promotePeople') {
          return EdsIcon(contacts)
        } else if (type == 'promoteEvents') {
          return EdsIcon(calendar_event)
        } else if (type == 'promoteMagazine') {
          return EdsIcon(library_books)
        }
        return
      }

      return {
        title: plainTitle,
        subtitle: getPromotionType(type),
        media: getPromotionIcon(type),
      }
    },
  },
}
