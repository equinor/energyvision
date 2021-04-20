import React, { useCallback, forwardRef } from 'react'
// eslint-disable-next-line import/no-unresolved
import FormField from 'part:@sanity/components/formfields/default'
import { TextArea, Label, Box } from '@sanity/ui'
// eslint-disable-next-line import/no-unresolved
import PatchEvent, { set } from 'part:@sanity/form-builder/patch-event'
//const createPatchFrom = (value) => PatchEvent.from(value === '' ? unset() : set(value))

type TextAreaWithCharsProps = {
  value: string
  type: { title: 'string'; description: string }
  onChange: any
  markers: any
  presence: any
}

// eslint-disable-next-line react/display-name
const TextAreaWithChars = forwardRef<HTMLTextAreaElement, TextAreaWithCharsProps>(
  ({ value = '', type, markers, presence, onChange }, ref) => {
    const length = value.split('').length

    const handleChange = useCallback((event) => {
      onChange(PatchEvent.from(set(event.target.value)))
    }, [])

    return (
      <div>
        <FormField label={type.title} description={type.description} markers={markers} presence={presence}>
          <TextArea type="text" ref={ref} value={value} onChange={handleChange} />
        </FormField>
        <Box marginTop={2}>
          <Label size={1}>Characters: {length}</Label>
        </Box>
      </div>
    )
  },
)

export default {
  title: 'Fields for title and description meta',
  name: 'titleAndMeta',
  type: 'object',

  fields: [
    {
      name: 'documentTitle',
      title: 'Document title',
      description: `The HTML title element (<title>) defines the document's title. A <title> tells both users and search
      engines what the topic of a particular page is. You should create a unique title for each page on your site. Choose a
      title that reads naturally and effectively communicates the topic of the page’s content. The frontend will use h1 as a fallback for missing document title.`,
      type: 'string',
      /* validation: Rule => Rule.required().warning('The document title is very important for SEO'), */
    },
    {
      name: 'metaDescription',
      title: 'Meta description',
      validation: (Rule: any) => [
        Rule.required().warning('Meta description is important for SEO'),
        Rule.max(160).warning('Google recommends max. 160 chars'),
      ],
      description: `Meta descriptions are HTML attributes that provide concise summaries of webpages.
      It shows up in search results and in social media. Should be max. 160 chars`,
      type: 'text',
      inputComponent: TextAreaWithChars,
      rows: 5,
    },
  ],
}
