import { Reference, Rule, SanityDocument } from '@sanity/types'
import routes from '../routes'

export default {
  name: 'breadcrumbs',
  title: 'Breadcrumbs',
  type: 'object',
  fields: [
    {
      name: 'enableBreadcrumbs',
      type: 'boolean',
      title: 'Enable breadcrumbs for this page',
      description:
        'Toggle this if you want this page to display breadcrumbs. By default, the slug of the page will be used as breadcrumbs (e.g. Home > Energy > Hydro).',
    },
    {
      name: 'useCustomBreadcrumbs',
      type: 'boolean',
      title: 'Use custom breadcrumbs',
      description:
        'Toggle this if you want to create custom breadcrumbs for this page. These will overwrite the default breadcrumbs.',
      initialValue: false,
    },
    {
      name: 'customBreadcrumbs',
      type: 'array',
      title: 'Custom breadcrumbs',
      description:
        'Add the pages that you wish to compose the breadcrumbs with, in the order that you want them to be displayed in. ⚠️ Note: You do not have to add the homepage or the page you are currently creating/editing. These will be added automatically.',
      of: [
        {
          name: 'reference',
          title: 'Breadcrumb segment',
          description:
            "Use this field to link to an internal page. The last part of the linked page's route will be used to build the breadcrumbs. For example when linking to '/energy/sustainability', the 'sustainability' part will be used as label for this segment",
          type: 'reference',
          validation: (Rule: Rule) =>
            Rule.required().custom((value: Reference, context) => {
              const { document } = context
              if (document && document._id.replace('drafts.', '') === value._ref)
                return 'Breadcrumbs cannot link to themselves'

              return true
            }),
          to: routes,
          options: {
            filter: ({ document }: { document: SanityDocument }) => ({
              filter: `_type match $routeLang`,
              params: { routeLang: document._type },
            }),
            disableNew: true,
          },
        },
      ],
      validation: (Rule: Rule) => Rule.unique(),
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      hidden: ({ parent }) => !parent.enableBreadcrumbs || !parent.useCustomBreadcrumbs,
    },
  ],
}
