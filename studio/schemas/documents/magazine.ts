import { i18n } from '../documentTranslation'
import { configureTitleBlockContent } from '../editors'
import CompactBlockEditor from '../components/CompactBlockEditor'
import blocksToText from '../../helpers/blocksToText'
import { Colors } from '../../helpers/ColorListValues'
import type { Rule, SanityDocument } from '@sanity/types'
import { defaultLanguage } from '../../languages'
import { Flags } from '../../src/lib/datasetHelpers'
import SlugInput from '../components/SlugInput'
import { magazineSlug } from '../../../satellitesConfig.js'
import slugify from 'slugify'
import { withSlugValidation } from '../validations/validateSlug'
import { configureBlockContent } from '../editors/blockContentType'
import CharCounterEditor from '../components/CharCounterEditor'
import { validateCharCounterEditor } from '../validations/validateCharCounterEditor'
import magazineTagBar from '../objects/magazineTagBar'

const titleContentType = configureTitleBlockContent()

const ingressBlockContentType = configureBlockContent({
  h1: false,
  h2: false,
  h3: false,
  h4: false,
  internalLink: false,
  externalLink: false,
  attachment: false,
  lists: false,
})

export default {
  type: 'document',
  name: 'magazine',
  title: 'Magazine page',
  i18n,
  fieldsets: [
    {
      title: 'Header / Banner v1',
      name: 'header',
    },
    {
      title: 'Slug',
      name: 'slug',
      description: '⚠️ Changing the slug after publishing it has negative impacts in the SEO ⚠️',
      options: {
        collapsible: true,
        collapsed: false,
      },
    },
    {
      title: 'SEO & metadata',
      name: 'metadata',
      description: 'This part is used for meta information when this content is used on the web',
      options: {
        collapsible: true,
        collapsed: true,
      },
    },
    Flags.IS_DEV && {
      title: 'Tags',
      name: 'tagFieldset',
      options: {
        collapsible: true,
        collapsed: false,
      },
    },
  ],
  fields: [
    {
      title: 'Meta information',
      name: 'seo',
      type: 'titleAndMeta',
      fieldset: 'metadata',
    },
    Flags.IS_DEV && {
      title: 'Magazine tags',
      name: 'magazineTags',
      type: 'array',
      description: 'Add tags to describe the content of this magazine article',
      of: [
        {
          type: 'reference',
          to: [{ type: 'magazineTag' }],
          options: { disableNew: true },
        },
      ],
      fieldset: 'tagFieldset',
    },
    Flags.IS_DEV && {
      type: 'array',
      name: 'magazineTagBar',
      title: 'Horizontal Magazine Tags Bar',
      of: [{ type: 'magazineTagBar', title: 'Promote Magazine Tag' }],
      validation: (Rule: Rule) => Rule.required().min(1).max(1),
    },
    {
      title: 'Open Graph Image',
      name: 'openGraphImage',
      type: 'imageWithAlt',
      description: 'You can override the hero image as the SoMe image by uploading another image here.',
      fieldset: 'metadata',
    },
    Flags.IS_DEV && {
      name: 'ingress',
      title: 'Description',
      description: 'Shown in newsletters and promotions. Max 400 characters',
      type: 'array',
      inputComponent: CharCounterEditor,
      of: [ingressBlockContentType],
      validation: (Rule: Rule) => Rule.custom((value: any) => validateCharCounterEditor(value, 400)),
    },
    {
      name: 'title',
      type: 'array',
      title: 'Title',
      inputComponent: CompactBlockEditor,
      of: [titleContentType],
      fieldset: 'header',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      title: 'Hero image',
      name: 'heroFigure',
      type: 'imageWithAltAndCaption',
      validation: (Rule: Rule) => Rule.required(),
      fieldset: 'header',
    },
    Flags.HAS_MAGAZINE_SUBSCRIPTION && {
      title: 'Send to subscribers',
      name: 'shouldDistributeMagazine',
      description: 'Activate (change to green) to send to subscribers when you publish the magazine article.',
      type: 'boolean',
      initialValue: false,
    },
    {
      name: 'magazineSlug',
      title: 'Magazine slug',
      type: 'string',
      fieldset: 'slug',
      placeholder: 'For example "Experienced professionals"',
      description: 'The unique part of the URL for this magazine. Should probably be something like the page title.',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      fieldset: 'slug',
      inputComponent: SlugInput,
      options: withSlugValidation({
        source: async (doc: SanityDocument) => {
          // translated document ids end with _i18n__lang while base documents don't
          const lastFiveCharacters = doc._id.slice(-5)
          const translatedMagazine = magazineSlug[lastFiveCharacters] || magazineSlug[defaultLanguage.name]
          return doc.magazineSlug
            ? `/${translatedMagazine}/${slugify(doc.magazineSlug as string, { lower: true })}`
            : ''
        },
        slugify: (value: string) => value,
      }),
      description: '⚠️ Double check for typos and get it right on the first time! ⚠️',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'content',
      type: 'array',
      title: 'Page sections',
      of: [
        { type: 'textBlock' },
        { type: 'teaser' },
        { type: 'fullWidthImage' },
        { type: 'figure' },
        { type: 'textWithIconArray' },
        { type: 'pullQuote', initialValue: { background: Colors[0] } },
        { type: 'accordion' },
        { type: 'promoTileArray' },
        { type: 'promotion' },
        { type: 'iframe' },
      ],
    },
    {
      type: 'excludeFromSearch',
      name: 'excludeFromSearch',
    },
  ].filter((e) => e),
  orderings: [
    {
      title: 'Title ',
      name: 'titleAsc',
      // Yes, this will add a warning in the console, but we still need the [0] since it's a rich text editor
      // Might be worth to look into if it is a better way of sorting rich text editors
      by: [{ field: 'title[0].children[0].text', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      media: 'heroFigure.image',
    },
    prepare(selection: Record<string, any>) {
      const { title, media } = selection
      const plainTitle = title ? blocksToText(title) : ''

      return {
        title: plainTitle,
        subtitle: 'Magazine',
        media,
      }
    },
  },
}
