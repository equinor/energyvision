import { SchemaType } from '../../types'
import { link } from '@equinor/eds-icons'
import { EdsIcon } from '../../icons'

export default {
  title: 'Menu link',
  name: 'menuLink',
  type: 'object',
  fields: [
    {
      title: 'Label',
      name: 'label',
      description: 'The visible label of the link.',
      type: 'string',
      validation: (Rule: SchemaType.ValidationRule): SchemaType.ValidationRule => Rule.required(),
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
      title: 'Route',
      name: 'route',
      description: 'The content you want to appear at this path. Remember that it needs to be published first.',
      type: 'reference',
      to: [{ type: 'route_en_GB' }, { type: 'route_nb_NO' }],
      options: {
        filter: ({ document }: { document: any }) => ({
          filter: `_type == $routeLang`,
          params: { routeLang: `route_${document._lang}` },
        }),
      },

      // @TODO How can we validate only when it's active
      // validation: (Rule: SchemaType.ValidationRule): SchemaType.ValidationRule => Rule.required(),
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
      // eslint-disable-next-line
      // @ts-ignore: Djeez, typescript
      hidden: ({ parent }) => parent?.isStatic === false,
    },
  ],
  preview: {
    select: {
      label: 'label',
      route: 'route.slug',
      isStatic: 'isStatic',
      staticUrl: 'staticUrl',
    },
    prepare(selection: any) {
      const { label, route, isStatic, staticUrl } = selection
      return {
        title: label || 'No label added yet',
        subtitle: isStatic ? `Static URL: ${staticUrl}` : route?.current || 'No route selected yet',
        media: EdsIcon(link),
      }
    },
  },
}
