import { DocumentTextIcon } from '@sanity/icons/DocumentText';
import { defineArrayMember, defineField, defineType } from 'sanity';

export const useCaseList = defineType({
  name: 'useCaseList',
  title: 'Use case list',
  type: 'object',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
    }),
    defineField({
      name: 'items',
      title: 'Use cases',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{ type: 'useCase' }],
        }),
      ],
      validation: (rule) => rule.required().min(1).unique(),
    }),
  ],
  preview: {
    select: { title: 'title' },
    prepare({ title }: { title?: string }) {
      return {
        title: title || 'Use case list',
        subtitle: 'Use case list',
      };
    },
  },
});