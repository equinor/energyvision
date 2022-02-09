import { validateStaticUrl } from '../validations/validateStaticUrl'
import { validateInternalOrExternalUrl } from '../validations/validateInternalOrExternalUrl'
import type { Rule, ValidationContext, Reference } from '@sanity/types'
import routes from '../routes'
import { filterByRoute } from '../../helpers/referenceFilters'

export type ColumnLink = {
  _type: 'link'
  label: string
  isStatic: boolean
  staticUrl?: string
  reference?: Reference
  url?: string
}

export default {
  type: 'document',
  title: `Footer`,
  name: `footer`,

  fields: [
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
              of: [
                {
                  type: 'object',
                  name: 'link',
                  title: 'Link',
                  fields: [
                    {
                      name: 'label',
                      type: 'string',
                      title: 'Label',
                      description: 'Link text',
                      validation: (Rule: Rule) => Rule.required(),
                    },
                    {
                      name: 'isStatic',
                      title: 'Is static page',
                      description: `While migrating, content can be available as static pages generated from the old CMS. If this is
                the case for this menu item, it's important to register the url in the static input field`,
                      type: 'boolean',
                      initialValue: false,
                    },
                    {
                      name: 'reference',
                      title: 'Internal link',
                      description: 'Use this field to reference an internal page.',
                      type: 'reference',

                      validation: (Rule: Rule) =>
                        Rule.custom((value: any, context: ValidationContext) => {
                          const { parent } = context as { parent: ColumnLink }
                          return validateInternalOrExternalUrl(parent?.isStatic, value, parent.url)
                        }),
                      to: routes,
                      options: {
                        filter: filterByRoute,
                      },
                      hidden: ({ parent }: { parent: ColumnLink }) => parent?.isStatic === true,
                    },

                    {
                      name: 'url',
                      title: 'External URL',
                      description: 'Use this field to link to an external site.',
                      type: 'url',

                      validation: (Rule: Rule) =>
                        Rule.uri({ scheme: ['http', 'https', 'tel', 'mailto'] }).custom(
                          (value: any, context: ValidationContext) => {
                            const { parent } = context as { parent: ColumnLink }
                            return validateInternalOrExternalUrl(parent?.isStatic, value, parent.reference)
                          },
                        ),
                      hidden: ({ parent }: { parent: ColumnLink }) => parent?.isStatic === true,
                    },

                    {
                      name: 'staticUrl',
                      title: 'Static URL',
                      type: 'string',
                      description: `The URL for the static page. Don't add language information (no/en)`,
                      placeholder: '/careers/experienced-professionals',

                      validation: (Rule: Rule) =>
                        Rule.custom((value: string, context: ValidationContext) => {
                          return validateStaticUrl(value, context)
                        }),
                      hidden: ({ parent }: { parent: ColumnLink }) => parent?.isStatic === false,
                    },
                  ],
                },
                {
                  type: 'object',
                  name: 'someLink',
                  title: 'Social media link',
                  fields: [
                    {
                      name: 'url',
                      title: 'URL',
                      description: 'Use this field to link to an external site.',
                      type: 'url',

                      validation: (Rule: Rule) =>
                        Rule.uri({ scheme: ['http', 'https', 'tel', 'mailto'] }).custom(
                          (value: any, context: ValidationContext) => {
                            const { parent } = context as { parent: ColumnLink }

                            return validateInternalOrExternalUrl(parent?.isStatic, value, parent.reference)
                          },
                        ),
                    },
                    {
                      name: 'label',
                      type: 'string',
                      title: 'Label',
                      description: 'Link text',
                      validation: (Rule: Rule) => Rule.required(),
                    },
                    {
                      name: 'someType',
                      type: 'string',
                      title: 'Type of SoMe platform',
                      options: {
                        list: [
                          { title: 'Facebook', value: 'facebook' },
                          { title: 'Instagram', value: 'instagram' },
                          { title: 'Twitter', value: 'twitter' },
                          { title: 'LinkedIn', value: 'linkedin' },
                          { title: 'YouTube', value: 'youtube' },
                        ],
                        layout: 'radio',
                      },
                      validation: (Rule: Rule) => Rule.required(),
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
