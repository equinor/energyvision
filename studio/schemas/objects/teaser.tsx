import { SchemaType } from '../../types'
import { configureBlockContent } from '../editors/blockContentType'
import CharCounterEditor from '../components/CharCounterEditor'
import { topicsList } from '../../helpers/topics'
import { AlignmentSelector } from '../components'

const topicPages = topicsList.map((topic: any) => ({ type: `page_${topic.id}` }))

const validateContent = (value: any, maxLength: number) => {
  if (!value) return true

  const count = value[0].children.reduce((total: number, current: any) => total + current.text.length, 0)

  if (count > maxLength) {
    return `Ingress cannot be longer than ${maxLength} characters. Currently ${count} characters long.`
  }

  return true
}

const validateLink = (value: any, connectedField: any): SchemaType.ValidationResult => {
  if (value && connectedField) {
    return 'Can only have a single link. Choose either an internal or external link.'
  }

  if (!connectedField && !value) {
    return 'An internal or external link is required.'
  }

  if (connectedField && !value) {
    return true
  }

  return true
}

const blockContentType = configureBlockContent({
  h1: false,
  h2: false,
  h3: false,
  h4: false,
  internalLink: false,
  externalLink: false,
  attachment: false,
  lists: false,
})

export default {
  name: 'teaser',
  title: 'Teaser',
  type: 'object',
  localize: true,
  fieldsets: [
    {
      name: 'link',
      title: 'Link',
      description: 'Select either an internal link or external URL.',
    },
  ],
  fields: [
    {
      name: 'overline',
      title: 'Overline',
      type: 'string',
    },
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'ingress',
      title: 'Ingress',
      type: 'array',
      inputComponent: CharCounterEditor,
      of: [blockContentType],
      validation: (Rule: SchemaType.ValidationRule) => Rule.custom((value: any) => validateContent(value, 400)),
    },
    {
      name: 'content',
      title: 'Content',
      type: 'array',
      inputComponent: CharCounterEditor,
      of: [blockContentType],
    },
    {
      name: 'reference',
      title: 'Internal link',
      type: 'reference',
      validation: (Rule: SchemaType.ValidationRule) =>
        Rule.custom((value: any, context: SchemaType.ValidationContext) => {
          return validateLink(value, context.parent.url)
        }),
      to: topicPages,
      fieldset: 'link',
    },
    {
      name: 'url',
      title: 'External URL',
      type: 'url',
      validation: (Rule: SchemaType.ValidationRule) =>
        Rule.custom((value: any, context: SchemaType.ValidationContext) => {
          return validateLink(value, context.parent.reference)
        }),
      to: topicPages,
      fieldset: 'link',
    },
    {
      name: 'image',
      title: 'Image',
      type: 'imageWithAlt',
      validation: (Rule: SchemaType.ValidationRule) => Rule.required(),
    },
    {
      name: 'imagePosition',
      title: 'Image position',
      description: 'Select which side of the teaser the image should be displayed at on larger screens.',
      type: 'string',
      inputComponent: AlignmentSelector,
    },
  ],
  preview: {
    select: {
      title: 'title',
      image: 'image.asset',
      slug: 'reference.slug.current',
      url: 'url',
    },
    prepare(selection: any) {
      const { title, image, slug, url } = selection
      return {
        title: title,
        subtitle: `Teaser for: ${slug || url}`,
        media: image,
      }
    },
  },
}
