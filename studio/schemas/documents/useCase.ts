import { DocumentTextIcon } from '@sanity/icons/DocumentText';
import { defineArrayMember, defineField, defineType } from 'sanity';

export const useCase = defineType({
  name: 'useCase',
  title: 'Use case',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'steps',
      title: 'Steps',
      type: 'array',
      validation: (rule) => rule.required().min(1),
      of: [
        defineArrayMember({
          name: 'useCaseStep',
          title: 'Step',
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
            }),
            defineField({
              name: 'outcome',
              title: 'Outcome',
              type: 'text',
            }),
            defineField({
              name: 'initiator',
              title: 'Initiator',
              type: 'text',
            }),
            defineField({
              name: 'recipient',
              title: 'Recipient',
              type: 'text',
            }),
            defineField({
              name: 'actors',
              title: 'Actors',
              type: 'text',
            }),
          ],
          preview: {
            select: { title: 'title', subtitle: 'description' },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'description' },
  },
});
