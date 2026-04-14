import { text_field } from '@equinor/eds-icons'
import type { PortableTextBlock, Reference, Rule } from 'sanity'
import blocksToText from '../../helpers/blocksToText'
import { EdsIcon } from '../../icons'
import type { ColorSelectorValue } from '../components/ColorSelector'
import { CompactBlockEditor } from '../components/CompactBlockEditor'
import { configureBlockContent } from '../editors'
import { validateComponentAnchor } from '../validations/validateAnchorReference'

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
      title: 'Thumbnail Image',
      name: 'thumbnail',
      options: {
        collapsible: true,
        collapsed: true,
      },
    },
    {
      title: 'Eyebrow headline',
      name: 'eyebrow',
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
        collapsed: false,
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
      fieldset: 'thumbnail',
    },
    {
      name: 'overline',
      title: 'Eyebrow',
      type: 'string',
      fieldset: 'eyebrow',
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
      name: 'anchorReference',
      type: 'anchorReferenceField',
      title: 'Anchor reference',
      description:
        'enter anchor id for this component, title will be used when compiling list of anchors on page together',
      validation: (Rule: Rule) =>
        // @ts-ignore
        Rule.custom((value: string, context: any) =>
          validateComponentAnchor(value, context),
        ),
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
      of: [configureBlockContent()],
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
    {
      name: 'designOptions',
      type: 'backgroundOptions',
      readOnly: ({ parent }: { parent: TextBlock }) => parent?.useBrandTheme,
    },
  ].filter(e => e),
  preview: {
    select: {
      title: 'title',
      ingress: 'ingress',
      text: 'text',
      anchor: 'anchorReference',
      designOptions: 'designOptions',
      backgroundImage: 'designOptions.background.0.image',
    },
    prepare({
      title,
      ingress,
      text,
      anchor,
      designOptions,
      backgroundImage,
    }: {
      title: PortableTextBlock[]
      ingress: PortableTextBlock[]
      text: PortableTextBlock[]
      anchor: string
      designOptions: any
      backgroundImage: any
    }) {
      console.log('designOptions', designOptions)
      console.log('backgroundImage', backgroundImage)

      const plainTitle = blocksToText(title ?? ingress ?? text)
      let subTitle = 'Text block'
      if (anchor) {
        subTitle = subTitle + ` | #${anchor}`
      }
      if (designOptions?.background?.[0]?._type === 'backgroundColor') {
        subTitle = subTitle + ` | ${designOptions?.background?.[0]?.title}`
      }
      if (designOptions?.background?.[0]?._type === 'backgroundImage') {
        subTitle = subTitle + ` | Background image`
      }

      return {
        title: plainTitle || 'Missing title/content',
        subtitle: subTitle,
        media:
          designOptions?.background?.[0]?._type === 'backgroundImage'
            ? backgroundImage
            : EdsIcon(text_field),
      }
    },
  },
}
