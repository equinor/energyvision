import { createElement } from 'react';
import { MdOutlinePerson } from 'react-icons/md';
import type { PreviewProps, Rule } from 'sanity';
import { CompactBlockEditor } from '../components/CompactBlockEditor';
import { configureBlockContent } from '../editors';
import singleItemArray from '../objects/singleItemArray';
import { lang } from './langField';
import { personMetadata } from './personMetadata';

export default {
  title: 'Person',
  name: 'person',
  type: 'document',
  icon: MdOutlinePerson,
  components: {
    preview: (props: PreviewProps & { metadata?: string[] | string }) => {
      const tags =
        typeof props.metadata === 'string'
          ? [props.metadata]
          : (props.metadata ?? []);
      const icons = personMetadata
        .filter((option) => tags.includes(option.value))
        .map(({ value, title, icon }) =>
          createElement(icon, {
            key: value,
            title,
            role: 'img',
            'aria-label': title,
          }),
        );

      return props.renderDefault({
        ...props,
        subtitle: icons.length
          ? createElement(
              'span',
              {
                style: {
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.25em',
                },
              },
              ...icons,
              typeof props.subtitle === 'string' ? props.subtitle : null,
            )
          : props.subtitle,
      });
    },
  },
  fieldsets: [
    {
      name: 'seo',
      title: 'SEO',
      description:
        'Enable structured markup to show rich results on Google search',
    },
  ],
  fields: [
    { ...lang, hidden: true },
    {
      title: 'Image',
      name: 'image',
      type: 'imageWithAlt',
    },
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
      title: 'Metadata',
      name: 'metadata',
      description: 'Select all tags that apply to this person.',
      type: 'array',
      of: [{ type: 'string' }],
      validation: (Rule: Rule) => Rule.unique(),
      options: {
        list: personMetadata.map(({ title, value }) => ({ title, value })),
      },
    },
    {
      title: 'Mobile number',
      name: 'mobileNumber',
      type: 'string',
      placeholder: '+47 412 60 584',
      description:
        'Include the country code and use spaces, for example +47 412 60 584.',
      validation: (Rule: Rule) =>
        Rule.regex(/^\+[1-9]\d{0,2} \d{3} \d{2} \d{3}$/).error(
          'Use the format +47 412 60 584 (country code followed by 3, 2 and 3 digits).',
        ),
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
    /* {
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
    }, */
    {
      title: 'LinkedIn profile URL',
      name: 'linkedinProfileUrl',
      description: "The person's public LinkedIn profile URL.",
      type: 'url',
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
      metadata: 'metadata',
    },
  },
};
