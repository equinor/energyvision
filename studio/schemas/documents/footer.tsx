import { SchemaType } from '../../types'
import { validateStaticUrl } from '../validations/validateStaticUrl'
import { validateInternalOrExternalUrl } from '../validations/validateInternalOrExternalUrl'

export default {
  type: 'document',
  title: `Footer`,
  name: `footer`,

  fields: [
    {
      title: 'Footer columns',
      name: 'footerColumns',
      type: 'array',
      validation: (Rule: SchemaType.ValidationRule): SchemaType.ValidationRule => Rule.length(3),
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
              validation: (Rule: SchemaType.ValidationRule) => Rule.required(),
            },
            {
              type: 'array',
              name: 'columnLinks',
              title: 'Links',
              of: [
                {
                  type: 'object',
                  name: 'link',
                  title: 'link',
                  fields: [
                    {
                      name: 'label',
                      type: 'string',
                      title: 'Label',
                      description: 'Link text',
                      validation: (Rule: SchemaType.ValidationRule) => Rule.required(),
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

                      validation: (Rule: SchemaType.ValidationRule) =>
                        Rule.custom((value: any, context: SchemaType.ValidationContext) => {
                          return validateInternalOrExternalUrl(context.parent?.isStatic, value, context.parent.url)
                        }),
                      to: [{ type: 'route_en_GB' }, { type: 'route_nb_NO' }],
                      options: {
                        filter: ({ document }: { document: any }) => ({
                          filter: `_type == $routeLang`,
                          params: { routeLang: `route_${document._lang}` },
                        }),
                      },
                      // eslint-disable-next-line
                      // @ts-ignore: Djeez, typescript
                      hidden: ({ parent }) => parent?.isStatic === true,
                    },
                    {
                      title: 'Icon',
                      name: 'image',
                      type: 'image',
                      description: 'SVG of for example the Facebook logo',
                    },
                    {
                      name: 'url',
                      title: 'External URL',
                      description: 'Use this field to link to an external site.',
                      type: 'url',

                      validation: (Rule: SchemaType.ValidationRule) =>
                        Rule.uri({ scheme: ['http', 'https', 'tel', 'mailto'] }).custom(
                          (value: any, context: SchemaType.ValidationContext) => {
                            return validateInternalOrExternalUrl(
                              context.parent?.isStatic,
                              value,
                              context.parent.reference,
                            )
                          },
                        ),
                      // eslint-disable-next-line
                      // @ts-ignore: Djeez, typescript
                      hidden: ({ parent }) => parent?.isStatic === true,
                    },

                    {
                      name: 'staticUrl',
                      title: 'Static URL',
                      type: 'string',
                      description: `The URL for the static page. Don't add language information (no/en)`,
                      placeholder: '/careers/experienced-professionals',

                      validation: (Rule: SchemaType.ValidationRule) =>
                        Rule.custom((value: string, context: SchemaType.ValidationContext) => {
                          return validateStaticUrl(value, context)
                        }),
                      // eslint-disable-next-line
                      // @ts-ignore: Djeez, typescript
                      hidden: ({ parent }) => parent?.isStatic === false,
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
