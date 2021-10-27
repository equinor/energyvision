import { SchemaType } from '../../types'
import { format_line_spacing } from '@equinor/eds-icons'
import { EdsIcon } from '../../icons'
import { configureBlockContent } from '../editors/blockContentType'
import CharCounterEditor from '../components/CharCounterEditor'

const introBlockContentType = configureBlockContent({
  h1: false,
  h2: false,
  h3: false,
  h4: false,
  internalLink: false,
  externalLink: false,
  attachment: false,
  lists: false,
})

const validateIngress = (value: any) => {
  if (!value || value.length === 0) {
    return 'Required'
  }

  const count = value[0].children.reduce(
    (total: any, current: { text: string | any[] }) => total + current.text.length,
    0,
  )

  if (count > 215) {
    return `The introduction should be no longer than 215 characters. Currently ${count} characters long.`
  }

  return true
}

const validateLink = (isStatic: boolean, value: any, connectedField: any): SchemaType.ValidationResult => {
  if (isStatic) return true
  if (value && connectedField) {
    return 'Can only have a single link. Choose either an internal or external link.'
  }

  if (!value && !connectedField) {
    return 'You must provide either an internal or external link.'
  }

  if (connectedField && !value) {
    return true
  }

  return true
}

export default {
  type: 'document',
  name: 'subMenu',
  title: 'Menu item',
  fieldsets: [
    {
      title: 'Top level/landing page link',
      name: 'link',
      options: {
        collapsible: true,
        collapsed: false,
      },
    },
  ],
  fields: [
    {
      name: 'isDisabled',
      title: 'Is disabled',
      description: `For testing purposes, it's possible to temporarily disable the menu item`,
      type: 'boolean',
      initialValue: false,
    },
    {
      title: 'Menu label',
      name: 'label',
      description: 'The label that appears at top level in the menu',
      type: 'string',
    },
    {
      name: 'isStatic',
      title: 'Is static page',
      description: `While migrating, content can be available as static pages generated from the old CMS. If this is 
      the case for this menu item, it's important to register the url in the static input field`,
      type: 'boolean',
      initialValue: false,
      fieldset: 'link',
    },
    {
      name: 'reference',
      title: 'Internal link',
      description: 'Use this field to reference an internal page.',
      type: 'reference',
      fieldset: 'link',
      validation: (Rule: SchemaType.ValidationRule) =>
        Rule.custom((value: any, context: SchemaType.ValidationContext) => {
          return validateLink(context.parent?.isStatic, value, context.parent.url)
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
      name: 'url',
      title: 'External URL',
      description: 'Use this field to link to an external site.',
      type: 'url',
      fieldset: 'link',
      validation: (Rule: SchemaType.ValidationRule) =>
        Rule.custom((value: any, context: SchemaType.ValidationContext) => {
          return validateLink(context.parent?.isStatic, value, context.parent.reference)
        }),
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
      fieldset: 'link',
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
      hidden: ({ parent }) => parent?.isStatic === false,
    },
    {
      title: 'Menu groups',
      name: 'group',
      type: 'array',
      of: [
        {
          type: 'menuGroup',
        },
      ],
      validation: (Rule: SchemaType.ValidationRule): SchemaType.ValidationRule => Rule.max(5),
    },
    {
      name: 'featuredContent',
      type: 'reference',
      title: 'Featured content',

      to: [{ type: 'news' }, { type: 'route_en_GB' }, { type: 'route_nb_NO' }],
      options: {
        filter: ({ document: { _lang, title: title = '' } }: any): SchemaType.ReferenceFilter => ({
          filter: `title != $title && (_type == $routeLang || _type == 'news')`,
          params: { routeLang: `route_${_lang}`, title, lang: _lang },
        }),
      },
    },
    {
      name: 'intro',
      title: 'Intro text',
      description: 'A short and catchy introduction text for this menu item (max. 215 chars)',
      type: 'array',
      inputComponent: CharCounterEditor,
      of: [introBlockContentType],
      validation: (Rule: SchemaType.ValidationRule) => Rule.custom((value: any) => validateIngress(value)),
    },
  ],
  preview: {
    select: {
      label: 'label',
      group: 'group',
      url: 'url',
      reference: 'reference.slug',
      isDisabled: 'isDisabled',
    },
    prepare(selection: any) {
      const { label, group = [], url, reference, isDisabled } = selection
      return {
        title: label || 'No label added yet',
        subtitle: reference?.en_GB?.current || url || `Menu groups: ${group.length} Is disabled: ${isDisabled}`,
        media: EdsIcon(format_line_spacing),
      }
    },
  },
}
