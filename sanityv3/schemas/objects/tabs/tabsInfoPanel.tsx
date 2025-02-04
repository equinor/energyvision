import { defineField, PortableTextBlock, Rule } from 'sanity'
import { configureBlockContent } from '../../editors'
import CompactBlockEditor from '../../components/CompactBlockEditor'

const titleContentType = configureBlockContent({
  h2: false,
  h3: false,
  h4: false,
  attachment: false,
  internalLink: false,
  externalLink: false,
  lists: false,
})
const blockContentType = configureBlockContent({
  h2: false,
  h3: false,
  h4: false,
  attachment: false,
})

export default {
  title: 'Information Panel',
  type: 'object',
  name: 'tabsInfoPanel',
  fields: [
    defineField({
      name: 'image',
      title: 'image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'imageVariant',
      title: 'Select image variant',
      description: 'Use same image variant for all information panels.',
      type: 'string',
      options: {
        list: [
          { title: 'Background image', value: 'backgroundImage' },
          { title: 'Side image', value: 'sideImage' },
        ],
        layout: 'radio',
      },
      initialValue: 'sideImage',
    }),
    defineField({
      name: 'title',
      type: 'array',
      components: {
        input: CompactBlockEditor,
      },
      of: [titleContentType],
      validation: (Rule: Rule) =>
        Rule.custom((value: PortableTextBlock[]) => (!value ? 'A title is recommended' : true)).warning(),
    }),
    defineField({
      name: 'text',
      title: 'Text content',
      type: 'array',
      of: [blockContentType],
    }),
    defineField({
      name: 'action',
      type: 'array',
      title: 'CTA',
      of: [
        { type: 'linkSelector', title: 'Link' },
        { type: 'downloadableImage', title: 'Call to action: Download image' },
        { type: 'downloadableFile', title: 'Call to action: Download file' },
      ],
    }),
    defineField({
      type: 'array',
      name: 'keyInfo',
      description: 'Up to 4 key information bits',
      title: 'Summary keys',
      of: [
        {
          name: 'keyInfo',
          title: 'Summary key',
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Title',
              type: 'string',
            },
            {
              name: 'keyFigure',
              title: 'Key figure highlighted',
              type: 'string',
            },
            {
              name: 'explanation',
              title: 'Short explanation or unit',
              type: 'text',
            },
          ],
        },
      ].filter((e) => e),
      validation: (Rule: Rule) => Rule.max(4),
    }),
  ],
}
