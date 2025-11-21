import { IoNewspaperOutline } from 'react-icons/io5'
import type { Reference, Rule } from 'sanity'
import blocksToText from '../../../helpers/blocksToText'
import { filterMagazineByLang } from '../../../helpers/referenceFilters'
import {
  ingress,
  theme,
  title,
  viewAllLink,
  viewAllLinkLabel,
} from '../commonFields/commonFields'

export type MagazinePromotion = {
  manuallySelectArticles: boolean
  promotedArticles: Reference[]
  tags: Reference[]
}

export default {
  title: 'Magazine promotion',
  name: 'promoteMagazine',
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
      name: 'manuallySelectArticles',
      type: 'boolean',
      title: 'Manually select Magazine articles',
      description: `Use this option if you want to manually select the articles to promote`,
      initialValue: false,
    },
    {
      title: 'Magazine articles to be promoted',
      name: 'promotedArticles',
      description: 'Select the individual articles you want to promote',
      type: 'array',
      of: [
        {
          title: 'Add article',
          type: 'reference',
          to: [
            {
              type: 'magazine',
            },
          ],
          options: {
            disableNew: true,
            filter: filterMagazineByLang,
          },
        },
      ],
      validation: (Rule: Rule) => Rule.unique(),
      hidden: ({ parent }: { parent: MagazinePromotion }) =>
        parent?.manuallySelectArticles === false,
    },
    {
      title: 'Magazine tag(s)',
      description: 'Select magazine tags you want to promote',
      name: 'tags',
      type: 'array',
      of: [
        {
          title: 'Select the magazine tag(s) to promote',
          type: 'reference',
          to: [{ type: 'magazineTag' }],
          options: { disableNew: true },
        },
      ],
      validation: (Rule: Rule) => Rule.unique(),
      options: { sortable: false },
      hidden: ({ parent }: { parent: MagazinePromotion }) =>
        parent?.manuallySelectArticles === true,
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
      title: 'title',
      tags: 'tags',
      articles: 'promotedArticles',
      manualSelection: 'manuallySelectArticles',
    },
    prepare({
      title,
      tags,
      articles,
      manualSelection,
    }: {
      title: any
      tags: Reference[]
      articles: Reference[]
      manualSelection: boolean
    }) {
      //@ts-ignore:todo
      const plainTitle = blocksToText(title) ?? 'No title, only articles'
      let count = ''
      if (manualSelection && articles && articles?.length > 0) {
        count = `${articles.length} articles`
      }
      if (!manualSelection && tags && tags?.length > 0) {
        count = `${tags.length} tags`
      }

      return {
        title: plainTitle,
        subtitle: `Magazine promotion | ${manualSelection ? 'manual' : 'automatic'} ${count ? `| ${count}` : ''}`,
        media: IoNewspaperOutline,
      }
    },
  },
}
