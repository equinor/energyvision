import { text_field } from '@equinor/eds-icons'
import type {
  PortableTextBlock,
  Reference,
  Rule,
  ValidationContext,
} from 'sanity'
import blocksToText from '../../helpers/blocksToText'
import { EdsIcon } from '../../icons'
import type { ColorSelectorValue } from '../components/ColorSelector'
import CompactBlockEditor from '../components/CompactBlockEditor'
import { configureBlockContent } from '../editors'

type TextBlock = {
  overline?: string
  title?: string
  ingress?: string
  text?: string
  isBigText?: boolean
  useBrandTheme?: boolean
  bigText?: PortableTextBlock[]
  action?: Reference[]
  splitList?: boolean
  background?: ColorSelectorValue
}

type TextBlockDocument = {
  parent: TextBlock
  value?: string
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
      hidden: ({ parent }: TextBlockDocument) => parent.isBigText,
    },
    {
      title: 'Eyebrow headline',
      name: 'eyebrow',
      options: {
        collapsible: true,
        collapsed: true,
      },
      hidden: ({ parent }: TextBlockDocument) => parent.isBigText,
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
      of: [configureBlockContent({ variant: 'with2XLTitle' })],
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
      title: 'Big text (Deprecated)',
      description:
        'Set big text to false. Will be removed after a transition period',
      name: 'isBigText',
      type: 'boolean',
      fieldset: 'titleOptions',
      hidden: ({ value }: { value?: string }) => !value,
    },
    {
      name: 'bigTitle',
      title: 'Title (Deprecated)',
      description:
        'Use regular title and set big text to false. Will be removed after a transition period',
      fieldset: 'titleOptions',
      type: 'array',
      of: [configureBlockContent({ variant: 'withXLTitle' })],
      hidden: ({ parent, value }: TextBlockDocument) =>
        !value || !parent.isBigText,
      validation: (Rule: Rule) =>
        Rule.custom((value: PortableTextBlock[], ctx: ValidationContext) =>
          value && (ctx.parent as TextBlock)?.isBigText
            ? 'Clear this field and use regular title without big text boolean'
            : true,
        ).warning(),
    },
    {
      name: 'ingress',
      title: 'Ingress',
      type: 'array',
      of: [configureBlockContent({ variant: 'ingress' })],
      hidden: ({ parent }: TextBlockDocument) => parent?.isBigText,
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
      isBigText: 'isBigText',
      bigTitle: 'bigTitle',
    },
    prepare({
      title,
      isBigText,
      bigTitle,
      ingress,
      text,
    }: {
      title: PortableTextBlock[]
      ingress: PortableTextBlock[]
      isBigText: boolean
      bigTitle: PortableTextBlock[]
      text: PortableTextBlock[]
    }) {
      const plainTitle = isBigText
        ? blocksToText(bigTitle)
        : blocksToText(title || ingress || text)

      return {
        title: plainTitle || 'Missing title/content',
        subtitle: isBigText
          ? 'Text block component (BIG TEXT)'
          : 'Text block component',
        media: EdsIcon(text_field),
      }
    },
  },
}
