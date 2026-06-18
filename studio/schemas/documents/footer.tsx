import type { Rule, Reference } from 'sanity'
import { EdsIcon } from '../../icons'
import { format_color_text } from '@equinor/eds-icons'
import { lang } from './langField'
import linkSelector from '../objects/linkSelector/linkSelector'

export type ColumnLink = {
  _type: 'link'
  label: string
  reference?: Reference
  url?: string
}

export default {
  type: 'document',
  title: `Footer`,
  name: `footer`,
  icon: () => EdsIcon(format_color_text),

  fields: [
    lang,
    {
      title: 'Footer columns',
      name: 'footerColumns',
      type: 'array',
      validation: (Rule: Rule) => Rule.length(3),
      of: [
        {
          type: 'object',
          name: 'footerColumnGroup',
          title: 'Footer column',
          fields: [
            {
              type: 'string',
              name: 'columnHeader',
              title: 'Column header',
              validation: (Rule: Rule) => Rule.required(),
            },
            {
              type: 'array',
              name: 'columnLinks',
              title: 'Links',
              of: [linkSelector(['link', 'homePageLink', 'reference', 'socialMediaLink'])],
            },
          ],
        },
      ],
    },
  ],
}
