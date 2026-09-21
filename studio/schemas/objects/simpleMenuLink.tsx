import { link } from '@equinor/eds-icons';
import type { Reference, Rule } from 'sanity';
import { EdsIcon } from '../../icons';
import { internalReference } from './linkSelector/common';

export type SimpleMenuLink = {
  _type: 'simpleMenuLink';
  label: string;
  route?: Reference;
};

export default {
  title: 'Menu link',
  name: 'simpleMenuLink',
  type: 'object',
  fields: [
    {
      title: 'Label',
      name: 'label',
      description: 'The visible label of the link.',
      type: 'string',
      validation: (Rule: Rule) => Rule.required(),
    },
    { ...internalReference, name: 'route' },
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
        subtitle: route?.current ? route.current : 'No route selected yet',
        media: EdsIcon(link),
      };
    },
  },
};
