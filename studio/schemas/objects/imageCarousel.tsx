import { library_image } from '@equinor/eds-icons'
import type { Rule } from 'sanity'
import blocksToText from '../../helpers/blocksToText'
import { EdsIcon } from '../../icons'
import { CompactBlockEditor } from '../components/CompactBlockEditor'
import { configureBlockContent } from '../editors'
import { validateCharCounterEditor } from '../validations/validateCharCounterEditor'

export default {
  name: 'imageCarousel',
  title: 'Image carousel',
  type: 'object',
  fieldsets: [
    {
      title: 'Carousel options',
      name: 'carouselOptions',
      description: 'Additional settings for the carousel',
      options: {
        collapsible: true,
        collapsed: false,
      },
    },
    {
      title: 'Design options',
      name: 'design',
      description: 'Some options for design',
      options: {
        collapsible: true,
        collapsed: false,
      },
    },
  ],
  fields: [
    {
      name: 'title',
      type: 'array',
      components: {
        input: CompactBlockEditor,
      },
      of: [configureBlockContent({ variant: 'title' })],
      title: 'Title',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      type: 'boolean',
      name: 'hideTitle',
      title: 'Hide title',
      description:
        'Hides the title, but screen readers will read title of carousel',
    },
    {
      name: 'ingress',
      title: 'Ingress',
      description: 'Optional short description. Max 400 characters',
      type: 'array',
      of: [configureBlockContent({ variant: 'ingress' })],
      validation: (Rule: Rule) =>
        Rule.custom((value: any) =>
          validateCharCounterEditor(value, 400, true),
        ),
    },
    {
      type: 'array',
      name: 'items',
      description: 'Add images for the carousel. Use same type of items.',
      title: 'Carousel items',
      of: [
        { type: 'imageWithAltAndCaption' },
        { type: 'imageWithRichTextBelow' },
        { type: 'imageWithLinkAndOrOverlay' },
      ],
      validation: (Rule: Rule) => Rule.required().min(3),
    },
    {
      type: 'boolean',
      name: 'autoplay',
      title: 'Autoplay',
      description: 'Whether the carousel should autoplay or not.',
      initialValue: false,
    },
    {
      title: 'Background',
      description: 'Pick a colour for the background. Default is white.',
      name: 'background',
      type: 'colorlist',
      fieldset: 'design',
    },
    {
      type: 'number',
      name: 'delay',
      title: 'Delay( Not in use anymore )',
      description:
        'Time in seconds that an image should be visible for before transitioning to the next.',
      initialValue: 3,
      fieldset: 'carouselOptions',
      validation: (Rule: Rule) => Rule.required().min(2),
      readOnly: ({ value }: { value?: string }) => !value,
    },
  ],
  preview: {
    select: {
      title: 'title',
      items: 'items',
    },
    prepare(selection: any) {
      const { title, items } = selection
      const length = items ? items.length : 0

      return {
        title: title ? blocksToText(title) : 'Untitled image carousel',
        subtitle: `Image carousel with ${length} items`,
        media: EdsIcon(library_image),
      }
    },
  },
}
