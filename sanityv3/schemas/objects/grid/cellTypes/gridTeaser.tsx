/* eslint-disable react/display-name */
import blocksToText from '../../../../helpers/blocksToText'
import { configureBlockContent, configureThemedTitleBlockContent } from '../../../editors'
import { validateCharCounterEditor } from '../../../validations/validateCharCounterEditor'

import type { PortableTextBlock, Reference, Rule, ValidationContext } from 'sanity'
import type { DownloadableImage } from './../../downloadableImage'
import type { DownloadableFile } from '../../files'
import type { ImageWithAlt } from '../../imageWithAlt'
import type { LinkSelector } from '../../linkSelector'
import type { ColorSelectorValue } from '../../../components/ColorSelector'
import { LeftAlignedImage, RightAlignedImage } from '../../../../icons'
import { RadioIconSelector } from '../../../components'
import { fromLargerTextThemeColors, fromNormalTextThemeColors } from '../../../components/ThemeSelector'

const blockContentType = configureBlockContent({
  smallText: true,
  largeText: true,
  extraLargeText: true,
})
const themedTitleContentType = configureThemedTitleBlockContent({ normalText: false, extraLargeText: true })

const imageAlignmentOptions = [
  { value: 'left', icon: LeftAlignedImage },
  { value: 'right', icon: RightAlignedImage },
]

export type GridTeaser = {
  _type: 'gridTeaser'
  content?: PortableTextBlock[]
  themedContent?: PortableTextBlock[]
  useExtendedThemes?: boolean
  quote: string
  author: string
  authorTitle?: string
  action?: (LinkSelector | DownloadableFile | DownloadableImage)[]
  image: ImageWithAlt
  imagePosition?: string
  background?: ColorSelectorValue
}
type GridTeaserDocument = {
  parent: GridTeaser
}

export default {
  name: 'gridTeaser',
  title: 'Grid Teaser',
  type: 'object',
  localize: true,
  fieldsets: [
    {
      title: 'Quote',
      name: 'quote',
      description: '',
      options: {
        collapsible: true,
        collapsed: true,
      },
    },
    {
      name: 'link',
      title: 'Link',
      description: 'Select either an internal link or external URL.',
    },
    {
      name: 'design',
      title: 'Design options',
    },
  ],
  fields: [
    {
      title: 'Use extended themes',
      name: 'useExtendedThemes',
      description: 'Enabling this removes normal text style and quote, but gives more theme options',
      type: 'boolean',
    },
    {
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [blockContentType],
      hidden: ({ parent }: GridTeaserDocument) => parent.useExtendedThemes,
      validation: (Rule: Rule) =>
        Rule.custom((value: PortableTextBlock[]) => {
          return validateCharCounterEditor(value, 600)
        }).warning(),
    },
    {
      name: 'themedContent',
      title: 'Themed Content',
      type: 'array',
      of: [themedTitleContentType],
      hidden: ({ parent }: GridTeaserDocument) => !parent.useExtendedThemes,
      validation: (Rule: Rule) =>
        Rule.custom((value: PortableTextBlock[]) => {
          return validateCharCounterEditor(value, 600)
        }).warning(),
    },
    {
      name: 'quote',
      type: 'text',
      title: 'Quote',
      description: 'Highlighted quote from the article, gets theme from below',
      rows: 5,
      hidden: ({ parent }: GridTeaserDocument) => parent.useExtendedThemes,
    },
    {
      name: 'author',
      type: 'string',
      title: 'Name',
      hidden: ({ parent }: GridTeaserDocument) => parent.useExtendedThemes,
    },
    {
      name: 'authorTitle',
      type: 'string',
      title: 'Title',
      description: 'Optional title for the author.',
      hidden: ({ parent }: GridTeaserDocument) => parent.useExtendedThemes,
    },
    {
      name: 'action',
      title: 'Link/action',
      description: 'Select the link or downloadable file for the teaser',
      type: 'array',
      of: [
        { type: 'linkSelector', title: 'Link' },
        { type: 'downloadableImage', title: 'Downloadable image' },
        { type: 'downloadableFile', title: 'Downloadable file' },
      ],
      validation: (Rule: Rule) => Rule.max(1).error('Only one action is permitted'),
    },
    {
      name: 'image',
      title: 'Image',
      type: 'imageWithAlt',
      validation: (Rule: Rule) => Rule.custom((value: ImageWithAlt) => (!value.asset ? 'Image is required' : true)),
    },
    {
      name: 'imagePosition',
      title: 'Image position',
      description:
        'On span 3 one can select which side the image will be on for larger screens. On mobile and single column the image will be above',
      type: 'string',
      components: {
        input: function ({ onChange, value }: { onChange: any; value: string }) {
          return (
            <RadioIconSelector
              name="imageAlignmentSelector"
              options={imageAlignmentOptions}
              defaultValue="left"
              currentValue={value}
              onChange={onChange}
            />
          )
        },
      },
    },
    {
      name: 'theme',
      title: 'Theme',
      type: 'themeList',
      options: {
        colors: fromNormalTextThemeColors,
      },
      hidden: ({ parent }: GridTeaserDocument) => parent.useExtendedThemes,
    },
    {
      name: 'themeFromLarger',
      title: 'Theme',
      type: 'themeList',
      options: {
        colors: fromLargerTextThemeColors,
      },
      hidden: ({ parent }: GridTeaserDocument) => !parent.useExtendedThemes,
    },
  ],
  preview: {
    select: {
      title: 'content',
      text: 'quote',
      image: 'image.asset',
    },
    prepare({
      title,
      text,
      image,
    }: {
      title: PortableTextBlock[]
      text: PortableTextBlock[]
      isBigText: boolean
      bigText: PortableTextBlock[]
      image: Reference
    }) {
      const plainTitle = blocksToText(title || text)

      return {
        title: plainTitle || 'Missing content/quote',
        subtitle: 'Grid Teaser component',
        media: image,
      }
    },
  },
}
