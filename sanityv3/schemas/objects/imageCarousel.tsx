import CompactBlockEditor from '../components/CompactBlockEditor'
import { configureBlockContent, configureTitleBlockContent } from '../editors'
import { EdsIcon } from '../../icons'
import { library_image } from '@equinor/eds-icons'
import blocksToText from '../../helpers/blocksToText'
import type { Rule } from 'sanity'
import { validateCharCounterEditor } from '../validations/validateCharCounterEditor'

const titleContentType = configureTitleBlockContent()
const ingressBlockContentType = configureBlockContent({
  h2: false,
  h3: false,
  h4: false,
  internalLink: false,
  externalLink: false,
  attachment: false,
  lists: false,
})

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
      of: [titleContentType],
      title: 'Title',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      type: 'boolean',
      name: 'hideTitle',
      title: 'Hide title',
      description: 'Hides the title, but screen readers will read title of carousel',
    },
    {
      name: 'ingress',
      title: 'Ingress',
      description: 'Optional short description. Max 400 characters',
      type: 'array',
      of: [ingressBlockContentType],
      validation: (Rule: Rule) => Rule.custom((value: any) => validateCharCounterEditor(value, 400, true)),
    },
    {
      type: 'array',
      name: 'items',
      description: 'Add images for the carousel',
      title: 'Carousel items',
      of: [{ type: 'imageWithAltAndCaption' }],
      validation: (Rule: Rule) => Rule.required().min(2),
    },
    {
      type: 'number',
      name: 'delay',
      title: 'Delay( Not in use anymore )',
      description: 'Time in seconds that an image should be visible for before transitioning to the next.',
      initialValue: 3,
      fieldset: 'carouselOptions',
      validation: (Rule: Rule) => Rule.required().min(2),
      readOnly: ({ value }: { value?: string }) => !value,
    },
    {
      type: 'boolean',
      name: 'autoplay',
      title: 'Autoplay',
      description: 'Whether the carousel should autoplay or not.',
      initialValue: true,
      fieldset: 'carouselOptions',
    },
    {
      title: 'Background',
      description: 'Pick a colour for the background. Default is white.',
      name: 'background',
      type: 'colorlist',
      fieldset: 'design',
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
