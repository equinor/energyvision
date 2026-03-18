import { anchor } from '@equinor/eds-icons'
import type { Rule } from 'sanity'
import { EdsBlockEditorIcon, EdsIcon } from '../../../icons'

export type AnchorLinkReference = {
  _type: 'anchorLinkReference'
}

export default {
  title: 'Anchor Link Reference',
  name: 'anchorLinkReference',
  type: 'object',
  icon: EdsBlockEditorIcon(anchor),
  fields: [
    {
      name: 'title',
      description: 'Visible title for the anchor link in the list of anchors',
      type: 'string',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'anchorReference',
      title: 'Anchor reference',
      type: 'anchorReferenceField',
      description: () => (
        <>
          <span style={{ display: 'block', wordWrap: 'break-word' }}>
            Insert the anchor id, which needs to match the id in the
            corresponding Anchorlink block component right before the section
            one wants to jump to. Use letters, numbers, hyphens and underscores.
            # is not needed.
          </span>
        </>
      ),
    },
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }: { title: string }) {
      return {
        title: title,
        subtitle: `Anchor Link Reference component`,
        media: EdsIcon(anchor),
      }
    },
  },
}
