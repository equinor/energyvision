import { link } from '@equinor/eds-icons';
import type { Reference, Rule } from 'sanity';
import { filterByPages } from '../../helpers/referenceFilters';
import { EdsIcon } from '../../icons';
import { defaultReferenceTargets } from '../objects/linkSelector/common';

export type MenuLink = {
  _type: 'menuLink';
  label: string;
  route?: Reference;
};

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
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      title: 'Route',
      name: 'route',
      description:
        'The content you want to appear at this path. Remember that it needs to be published first.',
      type: 'reference',
      to: defaultReferenceTargets,
      options: {
        filter: filterByPages,
        disableNew: true,
      },
      validation: (Rule: Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      label: 'label',
      route: 'route.slug',
    },
    prepare(selection: any) {
      const { label, route } = selection;
      return {
        title: label || 'No label added yet',
        subtitle: route?.current || 'No route selected yet',
        media: EdsIcon(link),
      };
    },
  },
};
