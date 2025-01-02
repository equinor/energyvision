import { Rule } from 'sanity'

export default {
  name: 'stickyMenu',
  title: 'Sticky Menu',
  type: 'object',
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string',
    },
    {
      title: 'Links',
      name: 'links',
      type: 'array',
      of: [
        {
          type: 'anchorLinkReference',
          title: 'Anchor reference',
        },
        { type: 'downloadableFile', title: 'Downloadable file' },
      ],
      validation: (Rule: Rule) => Rule.unique().max(2),
    },
    {
      title: 'Color',
      description: 'Default is white.',
      name: 'backgroundColor',
      type: 'colorlist',
    },
  ],
}
