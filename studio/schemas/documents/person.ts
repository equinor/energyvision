import { MdOutlinePerson } from 'react-icons/md';
import type { Rule } from 'sanity';
import { filterByRouteWithPersonList } from '../../helpers/referenceFilters';
import { CompactBlockEditor } from '../components/CompactBlockEditor';
import { GeneratedPersonUrlInput } from '../components/GeneratedPersonUrlInput';
import { configureBlockContent } from '../editors';
import singleItemArray from '../objects/singleItemArray';
import routes from '../routes';
import { lang } from './langField';

export default {
  title: 'Person',
  name: 'person',
  type: 'document',
  icon: MdOutlinePerson,
  fieldsets: [
    {
      name: 'seo',
      title: 'SEO',
      description:
        'Enable structured markup to show rich results on Google search',
    },
    {
      name: 'someLinks',
      title: 'SoMe links',
      options: {
        collapsible: true,
        collapsed: true,
      },
    },
  ],
  fields: [
    lang,
    {
      title: 'Name',
      name: 'name',
      type: 'string',
      validation: (Rule: Rule) =>
        Rule.required().error('Please provide a name'),
    },
    {
      title: 'Title',
      name: 'title',
      type: 'string',
    },
    {
      title: 'Date of employment',
      name: 'employmentDate',
      type: 'string',
    },
    {
      title: 'Image',
      name: 'image',
      type: 'imageWithAlt',
    },
    {
      title: 'Bio',
      name: 'bio',
      type: 'array',
      components: {
        input: CompactBlockEditor,
      },
      of: [configureBlockContent({ variant: 'ingress' })],
    },
    singleItemArray({
      name: 'callToActions',
      title: 'Call to action link',
      type: 'array',
      of: [{ type: 'linkSelector', title: 'Link' }],
    }),
    {
      title: 'CV main route',
      name: 'personListRoute',
      description:
        'The main route where this person is listed. This route together with searchparams for this person will be possible to use in an internal link.',
      type: 'reference',
      to: routes,
      options: {
        filter: filterByRouteWithPersonList,
        disableNew: true,
      },
    },
    {
      title: 'CV URL',
      name: 'personListUrl',
      description:
        'Generated from the CV main route and person name. This field cannot be edited.',
      type: 'string',
      readOnly: true,
      components: {
        input: GeneratedPersonUrlInput,
      },
    },
    {
      title: 'LinkedIn profile URL',
      name: 'linkedinProfileUrl',
      description: "The person's public LinkedIn profile URL.",
      type: 'url',
      fieldset: 'someLinks',
      validation: (Rule: Rule) =>
        Rule.uri({ scheme: ['https'] }).custom((value) => {
          if (!value) return true;

          try {
            const hostname = new URL(value).hostname.toLowerCase();
            return hostname === 'linkedin.com' ||
              hostname.endsWith('.linkedin.com')
              ? true
              : 'Please enter a valid LinkedIn URL';
          } catch {
            return 'Please enter a valid LinkedIn URL';
          }
        }),
    },

    /*     {
      name: 'enableStructuredMarkup',
      type: 'boolean',
      title: 'Show the person card content as rich results',
      description: 'Enable this only if its about a person',
      fieldset: 'seo',
    }, */
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'title',
      media: 'image.asset',
    },
  },
};
