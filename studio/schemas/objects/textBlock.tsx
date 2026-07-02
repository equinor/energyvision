import { text_field } from '@equinor/eds-icons'
import {
  defineArrayMember,
  defineField,
  type PortableTextBlock,
  type Reference,
  type Rule,
} from 'sanity'
import { Flags } from '@/src/lib/datasetHelpers'
import blocksToText from '../../helpers/blocksToText'
import { EdsIcon } from '../../icons'
import type { ColorSelectorValue } from '../components/ColorSelector'
import { CompactBlockEditor } from '../components/CompactBlockEditor'
import { defaultBackgroundColors, defaultColors } from '../defaultColors'
import { configureBlockContent } from '../editors'
import { validateComponentAnchor } from '../validations/validateAnchorReference'
import { createColorSelectField } from './colorList'

type TextBlock = {
  overline?: string
  title?: string
  ingress?: string
  text?: string
  useBrandTheme?: boolean
  action?: Reference[]
  splitList?: boolean
  background?: ColorSelectorValue
}

export default {
  name: 'textBlock',
  title: 'Text block',
  type: 'object',
  fieldsets: [
    {
      title: 'Addons above title',
      name: 'addonsAboveTitle',
      description: 'Thumbnail, eyebrow title and anchor reference',
      options: {
        collapsible: true,
        collapsed: true,
      },
    },
    {
      title: 'Call to action(s)',
      name: 'actions',
      options: {
        collapsible: true,
        collapsed: true,
      },
    },
    {
      name: 'titleOptions',
      title: 'Title',
      options: {
        collapsible: true,
        collapsed: false,
      },
    },
  ],
  fields: [
    {
      name: 'image',
      type: 'imageWithAlt',
      options: {
        hotspot: true,
      },
      fieldset: 'addonsAboveTitle',
    },
    {
      name: 'overline',
      title: 'Eyebrow',
      type: 'string',
      fieldset: 'addonsAboveTitle',
    },
    {
      name: 'anchorReference',
      type: 'string',
      title: 'Anchor reference',
      fieldset: 'addonsAboveTitle',
      description:
        '# is not needed. Title will be used when compiling list of anchors on page together.',
      validation: (Rule: Rule) =>
        // @ts-ignore
        Rule.custom((value: string, context: any) =>
          validateComponentAnchor(value, context),
        ),
    },
    {
      name: 'title',
      type: 'array',
      fieldset: 'titleOptions',
      components: {
        input: CompactBlockEditor,
      },
      of: [configureBlockContent({ variant: 'titleWithDisplay' })],
      validation: (Rule: Rule) =>
        Rule.custom((value: PortableTextBlock[]) =>
          !value ? 'A title is recommended' : true,
        ).warning(),
    },
    {
      title: 'Use brand theme for title',
      description:
        'Sets background to white and text color to brand red. Will disable other background options',
      name: 'useBrandTheme',
      type: 'boolean',
      fieldset: 'titleOptions',
    },

    {
      name: 'ingress',
      title: 'Ingress',
      type: 'array',
      of: [configureBlockContent({ variant: 'ingress' })],
    },
    {
      name: 'text',
      title: 'Text content',
      type: 'array',
      of: [
        configureBlockContent({ variant: 'textBlock' }),
        // This enables the image upload/paste block
        Flags.IS_DEV &&
          defineArrayMember({
            type: 'image',
            options: { hotspot: true },
          }),
      ],
    },
    {
      name: 'action',
      type: 'array',
      title: 'Links and downloads',
      fieldset: 'actions',
      of: [
        { type: 'linkSelector', title: 'Link' },
        { type: 'downloadableImage', title: 'Call to action: Download image' },
        { type: 'downloadableFile', title: 'Call to action: Download file' },
      ],
    },
    {
      title: 'Display links as two columns',
      name: 'splitList',
      type: 'boolean',
      fieldset: 'actions',
      initialValue: false,
      description:
        'You can also display links/downloads as two columns if there are a lot of links. Ensure that titles are short enough to do this.',
    },
    defineField({
      name: 'backgroundType',
      title: 'Select background type',
      description: 'Default is none = white background',
      type: 'string',
      options: {
        list: [
          {
            title: 'Background image',
            value: 'backgroundImage',
          },
          { title: 'Color', value: 'color' },
          { title: 'None', value: 'none' },
        ],
        layout: 'dropdown',
      },
      initialValue: 'none',
    }),
    createColorSelectField({
      name: 'backgroundColor',
      title: 'Background color',
      colors: [
        ...defaultBackgroundColors.filter(color => color.key !== 'white-100'),
        defaultColors[22],
      ],
      valueField: 'key',
      hidden: ({ parent }: { parent?: { backgroundType?: string } }) =>
        parent?.backgroundType !== 'color',
    }),
    {
      name: 'backgroundImage',
      type: 'imageBackground',
      title: 'Background image',
      hidden: ({ parent }: { parent?: { backgroundType?: string } }) =>
        parent?.backgroundType !== 'backgroundImage',
    },
    {
      name: 'designOptions',
      type: 'backgroundOptions',
      deprecated: true,
      readOnly: ({ parent }: { parent: TextBlock }) => parent?.useBrandTheme,
      hidden: ({ value }: { value: any }) => !value,
    },
  ].filter(e => e),
  preview: {
    select: {
      title: 'title',
      ingress: 'ingress',
      text: 'text',
      anchor: 'anchorReference',
      designOptions: 'designOptions',
      backgroundImageOld: 'designOptions.background.0.image',
      backgroundImage: 'backgroundImage.image',
      backgroundType: 'backgroundType',
    },
    prepare({
      title,
      ingress,
      text,
      anchor,
      designOptions,
      backgroundImageOld,
      backgroundImage,
      backgroundType,
    }: {
      title: PortableTextBlock[]
      ingress: PortableTextBlock[]
      text: PortableTextBlock[]
      anchor: string
      designOptions: any
      backgroundImageOld: any
      backgroundImage: any
      backgroundType: string
    }) {
      const plainTitle = blocksToText(title ?? ingress ?? text)

      let subTitle = 'Text block'
      if (anchor) {
        subTitle = subTitle + ` | #${anchor}`
      }
      if (
        backgroundType === 'color' ||
        designOptions?.background?.[0]?._type === 'backgroundColor'
      ) {
        subTitle =
          subTitle +
          ` | ${backgroundType === 'color' ? designOptions?.background?.[0]?.title : ''}`
      }
      if (
        backgroundType === 'backgroundImage' ||
        designOptions?.background?.[0]?._type === 'backgroundImage'
      ) {
        subTitle = subTitle + ` | Background image`
      }

      const media = backgroundImage ?? backgroundImageOld ?? EdsIcon(text_field)

      return {
        title: plainTitle || 'Missing title/content',
        subtitle: subTitle,
        media,
      }
    },
  },
}
