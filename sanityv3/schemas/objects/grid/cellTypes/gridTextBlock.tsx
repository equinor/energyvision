/* eslint-disable @typescript-eslint/ban-ts-comment */
import { text_field } from '@equinor/eds-icons'
import type { PortableTextBlock, Reference, Rule } from 'sanity'
import type { ColorSelectorValue } from '../../../components/ColorSelector'
import CompactBlockEditor from '../../../components/CompactBlockEditor'
import blocksToText from '../../../../helpers/blocksToText'
import { EdsIcon ,
  ContentRightImage,
  ContentLeftImage,
  ContentCenterImage,
  ContentBottomLeftImage,
  ContentBottomCenterImage,
} from '../../../../icons'
import { configureBlockContent } from '../../../editors'
import { configureThemedTitleBlockContent } from '../../../editors/themedTitleEditorContentType'
import { fromLargerTextThemeColors, fromNormalTextThemeColors } from '../../../components/ThemeSelector'
import { capitalizeFirstLetter } from '../../../../helpers/formatters'
import { RadioIconSelector } from '../../../components'

const blockContentType = configureBlockContent({
  smallText: true,
  largeText: true,
  extraLargeText: true,
})
const themedTitleContentType = configureThemedTitleBlockContent({ normalText: false })
const titleContentType = configureThemedTitleBlockContent()

const contentAlignmentOptions = [
  { value: 'left', icon: ContentLeftImage },
  { value: 'center', icon: ContentCenterImage },
  { value: 'right', icon: ContentRightImage },
  { value: 'bottom-left', icon: ContentBottomLeftImage },
  { value: 'bottom-center', icon: ContentBottomCenterImage },
]

type GridTextBlock = {
  overline?: string
  useThemedTitle?: boolean
  title?: string
  content?: string
  action?: Reference[]
  background?: ColorSelectorValue
}

type GridTextBlockDocument = {
  parent: GridTextBlock
}

export default {
  name: 'gridTextBlock',
  title: 'Grid Text block',
  type: 'object',
  fieldsets: [
    {
      name: 'title',
      title: 'Title options',
    },
  ],
  fields: [
    {
      name: 'overline',
      title: 'Eyebrow',
      type: 'string',
      fieldset: 'title',
    },
    {
      title: 'Use themed title',
      name: 'useThemedTitle',
      description: 'Enabling this removes normal text style, but gives more theme options for the title',
      type: 'boolean',
      fieldset: 'title',
    },
    {
      name: 'title',
      type: 'array',
      components: {
        input: CompactBlockEditor,
      },
      fieldset: 'title',
      of: [titleContentType],
      hidden: ({ parent }: GridTextBlockDocument) => parent.useThemedTitle,
      validation: (Rule: Rule) =>
        Rule.custom((value: PortableTextBlock[]) => (!value ? 'A title is recommended' : true)).warning(),
    },
    {
      name: 'themedTitle',
      type: 'array',
      components: {
        input: CompactBlockEditor,
      },
      fieldset: 'title',
      of: [themedTitleContentType],
      hidden: ({ parent }: GridTextBlockDocument) => !parent.useThemedTitle,
      validation: (Rule: Rule) =>
        Rule.custom((value: PortableTextBlock[]) => (!value ? 'A title is recommended' : true)).warning(),
    },
    {
      name: 'titleThemeFromLarger',
      title: 'Title theme',
      type: 'themeList',
      options: {
        colors: fromLargerTextThemeColors,
      },
      fieldset: 'title',
      hidden: ({ parent }: GridTextBlockDocument) => !parent.useThemedTitle,
      description: 'Use white text or black text when background image',
    },
    {
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [blockContentType],
    },
    {
      name: 'action',
      title: 'Link/action',
      description: 'Select the link or downloadable file',
      type: 'array',
      of: [
        { type: 'linkSelector', title: 'Link' },
        { type: 'downloadableImage', title: 'Downloadable image' },
        { type: 'downloadableFile', title: 'Downloadable file' },
      ],
      validation: (Rule: Rule) => Rule.max(1).error('Only one action is permitted'),
    },
    {
      name: 'contentTheme',
      title: 'Content theme',
      type: 'themeList',
      options: {
        colors: fromNormalTextThemeColors,
      },
      hidden: ({ parent }: GridTextBlockDocument) => !parent.useThemedTitle,
      description:
        'Title theme background will be used if different.Text will then be white/black. Use white or black text when background image',
    },
    {
      name: 'theme',
      title: 'Theme',
      type: 'themeList',
      options: {
        colors: fromNormalTextThemeColors,
      },
      hidden: ({ parent }: GridTextBlockDocument) => parent.useThemedTitle,
      description: 'Use white or black text when background image',
    },
    {
      name: 'contentAlignment',
      title: 'Content Alignment',
      description: 'Select the content alignment on larger screens. Bottom alignments can be kept on mobile',
      type: 'string',
      initialValue: 'left',
      components: {
        input: function ({ onChange, value }: { onChange: any; value: string }) {
          return (
            <RadioIconSelector
              name="imageAlignmentSelector"
              options={contentAlignmentOptions}
              defaultValue={'left'}
              currentValue={value}
              onChange={onChange}
            />
          )
        },
      },
    },
    {
      name: 'imageBackground',
      title: 'Image background',
      type: 'object',
      fields: [
        {
          title: 'Image',
          name: 'image',
          type: 'image',
          options: {
            hotspot: true,
            collapsed: false,
          },
        },
        {
          title: 'Apply light gradient',
          name: 'useLight',
          type: 'boolean',
          description: 'Applies a white gradient over semi transparent background image.',
        },
      ],

      preview: {
        select: {
          image: 'image',
          useAnimation: 'useAnimation',
          contentAlignment: 'contentAlignment',
        },
        prepare({ image, contentAlignment }: any) {
          return {
            title: `Image background`,
            subtitle: `${capitalizeFirstLetter(contentAlignment) + ' aligned '} content`,
            media: image.asset,
          }
        },
      },
    },
  ].filter((e) => e),
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }: { title: PortableTextBlock[] }) {
      const plainTitle = blocksToText(title)

      return {
        title: plainTitle || 'Missing title/content',
        subtitle: 'Grid text block component',
        media: EdsIcon(text_field),
      }
    },
  },
}
