import { SchemaType } from '../../types'
import { link } from '@equinor/eds-icons'
import { EdsIcon } from '../../icons'

const validateLink = (isStatic: boolean, value: any, connectedField: any): SchemaType.ValidationResult => {
  if (isStatic) return true
  if (value && connectedField) {
    return 'Can only have a single link. Choose either an internal or external link.'
  }

  if (!connectedField && !value) {
    return 'An internal or external link is required.'
  }

  if (connectedField && !value) {
    return true
  }

  return true
}

export type ReferenceTarget = {
  type: string
}

const defaultReferenceTargets: ReferenceTarget[] = [
  {
    type: 'news',
  },
  { type: 'route_en_GB' },
  { type: 'route_nb_NO' },
]

const LinkField = {
  name: 'linkSelector',
  title: 'Link',
  type: 'object',
  description: 'Select either an internal or external URL',
  fieldsets: [
    {
      name: 'label',
      title: 'Label',
      description: 'The label that the link/button should have.',
    },
  ],
  fields: [
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
          return validateLink(context.parent?.isStatic, value, context.parent.url)
        }),
      to: defaultReferenceTargets,
      options: {
        filter: ({ document }: { document: any }) => ({
          filter: `_type == $routeLang || _type == 'news'`,
          params: { routeLang: `route_${document._lang}` },
        }),
      },
      // eslint-disable-next-line
      // @ts-ignore: Djeez, typescript
      hidden: ({ parent }) => parent?.isStatic === true,
    },
    {
      name: 'url',
      title: 'External URL',
      description: 'Use this field to link to an external site.',
      type: 'url',
      validation: (Rule: SchemaType.ValidationRule) =>
        Rule.uri({ scheme: ['http', 'https', 'tel', 'mailto'] }).custom(
          (value: any, context: SchemaType.ValidationContext) => {
            return validateLink(context.parent?.isStatic, value, context.parent.reference)
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
      description: `The URL for the static page. Please don't add language information (no/en) or .html`,
      placeholder: '/careers/experienced-professionals',
      validation: (Rule: SchemaType.ValidationRule) =>
        Rule.custom((value: any, context: SchemaType.ValidationContext) => {
          // This is not a static link
          if (!context.parent?.isStatic) return true
          if (context.parent?.isStatic && value === undefined) {
            return 'A link is required'
          }
          if (value.startsWith('/no/') || value.startsWith('/en/')) {
            return `Please don't add the language information`
          }
          if (value.endsWith('.html')) {
            return `Please remove .html`
          }
          if (!value.startsWith('/')) {
            return `The link must start with a forward slash (/)`
          }
          return true
        }),
      // eslint-disable-next-line
      // @ts-ignore: Djeez, typescript
      hidden: ({ parent }) => parent?.isStatic === false || parent?.isStatic === undefined,
    },
    {
      name: 'label',
      title: 'Visible label',
      description: 'The visible text on the link/button.',
      type: 'string',
      fieldset: 'label',
      validation: (Rule: SchemaType.ValidationRule) => Rule.required(),
    },
    {
      name: 'ariaLabel',
      title: '♿ Screenreader label',
      description: 'A text used for providing screen readers with additional information',
      type: 'string',
      fieldset: 'label',
    },
  ],
  preview: {
    select: {
      title: 'label',
      url: 'url',
    },
    prepare({ title, url }: { title: string; url: string | null }): SchemaType.Preview {
      return {
        title: title,
        subtitle: `${url ? 'External' : 'Internal'} link`,
        media: EdsIcon(link),
      }
    },
  },
}

// Used to generate a linkSelector field with dynamic reference targets
// Might be a better way of doing this, but doesn't seem like we can pass
// params to a schema field
export const FilteredLinkField = (
  fieldName = 'link',
  referenceTargets: ReferenceTarget[] = defaultReferenceTargets,
) => {
  const FilteredLink = { ...LinkField }
  FilteredLink.name = fieldName
  FilteredLink.fields[1].to = referenceTargets

  return FilteredLink
}

export default LinkField
