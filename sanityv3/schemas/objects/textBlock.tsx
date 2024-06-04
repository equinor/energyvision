/* eslint-disable @typescript-eslint/ban-ts-comment */
import { text_field } from '@equinor/eds-icons'
import type { PortableTextBlock, Reference, Rule, SanityDocument, ValidationContext } from 'sanity'
import type { ColorSelectorValue } from '../components/ColorSelector'
import blocksToText from '../../helpers/blocksToText'
import { EdsIcon } from '../../icons'
import CompactBlockEditor from '../components/CompactBlockEditor'
import { configureBlockContent, configureTitleBlockContent } from '../editors'

const blockContentType = configureBlockContent({
  h2: false,
  h3: true,
  h4: false,
  attachment: false,
})

const ingressContentType = configureBlockContent({
  h2: false,
  h3: false,
  h4: false,
  attachment: false,
})

const blockContentTypeForBigText = configureBlockContent({
  h2: false,
  h3: false,
  h4: false,
  attachment: false,
  smallText: false,
  largeText: true,
  extraLargeText: true,
  normalTextOverride: {
    title: 'Normal',
    value: 'normal',
    component: ({ children }: { children: React.ReactNode }) => <span style={{ fontSize: '42px' }}>{children}</span>,
  },
})
const titleContentType = configureTitleBlockContent({
  largeText: true,
  extraLargeText: true,
  twoXLText: true,
})

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
  overrideButtonStyle?: boolean
  background?: ColorSelectorValue
}

type TextBlockDocument = {
  parent: TextBlock
}

export default {
  name: 'textBlock',
  title: 'Text block',
  type: 'object',

  fieldsets: [
    {
      title: 'Thumbnail Image',
      name: 'thumbnail',
      description: 'A small image acting as a thumbnail above the title.',
      options: {
        collapsible: true,
        collapsed: true,
      },
      hidden: ({ parent }: TextBlockDocument) => parent.isBigText,
    },
    {
      title: 'Eyebrow headline',
      name: 'eyebrow',
      description: 'A descriptive keyword, category or phrase that appears over the main headline.',
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
      description: '',
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
      of: [titleContentType],
      validation: (Rule: Rule) =>
        Rule.custom((value: PortableTextBlock[], ctx: ValidationContext) =>
          !value ? 'A title is recommended' : true,
        ).warning(),
    },
    {
      title: 'Use brand theme for title',
      description: 'Sets background to white and text color to brand red. Will disable other background options',
      name: 'useBrandTheme',
      type: 'boolean',
      fieldset: 'titleOptions',
    },
    {
      title: 'Big text (Deprecated)',
      description: 'Set big text to false. Will be removed after a transition period',
      name: 'isBigText',
      type: 'boolean',
      fieldset: 'titleOptions',
      readOnly: ({ value }: { value?: string }) => !value,
    },
    {
      name: 'bigTitle',
      title: 'Title (Deprecated)',
      description: 'Use regular title and set big text to false. Will be removed after a transition period',
      fieldset: 'titleOptions',
      type: 'array',
      of: [blockContentTypeForBigText],
      hidden: ({ parent }: TextBlockDocument) => !parent.isBigText,
      validation: (Rule: Rule) =>
        Rule.custom((value: PortableTextBlock[], ctx: ValidationContext) =>
          value && (ctx.parent as TextBlock)?.isBigText
            ? 'Clear this field and use regular title without big text boolean'
            : true,
        ).warning(),
      readOnly: ({ value }: { value?: string }) => !value,
    },
    {
      name: 'ingress',
      title: 'Ingress',
      type: 'array',
      of: [ingressContentType],
      hidden: ({ parent }: TextBlockDocument) => parent.isBigText,
    },
    {
      name: 'text',
      title: 'Text content',
      type: 'array',
      of: [blockContentType],
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
      title: 'Use link style',
      name: 'overrideButtonStyle',
      type: 'boolean',
      fieldset: 'actions',
      initialValue: false,
      description:
        'You can override the default button style to link style. This can only be done if you have one link, and should be used with caution.',
      readOnly: ({ parent }: { parent: TextBlock }) => {
        return !(parent.action && parent?.action.length === 1)
      },
    },
    {
      name: 'designOptions',
      type: 'backgroundOptions',
      readOnly: ({ parent }: { parent: TextBlock }) => parent.useBrandTheme,
    },
    {
      title: 'Background (Deprecated)',
      description: 'This field will be phased out over time. Please use Design options above. Default is white',
      name: 'background',
      readOnly: true,
      type: 'colorlist',
    },
  ].filter((e) => e),
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
      const plainTitle = isBigText ? blocksToText(bigTitle) : blocksToText(title || ingress || text)

      return {
        title: plainTitle || 'Missing title/content',
        subtitle: isBigText ? 'Text block component (BIG TEXT)' : 'Text block component',
        media: EdsIcon(text_field),
      }
    },
  },
}
