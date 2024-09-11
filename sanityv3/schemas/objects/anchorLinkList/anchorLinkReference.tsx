import { anchor } from '@equinor/eds-icons'
import { EdsIcon } from '../../../icons'
import { AnchorLinkDescription } from '../anchorReferenceField'

export type AnchorLinkReference = {
  _type: 'anchorLinkReference'
}

export default {
  title: 'Anchor Link Reference',
  name: 'anchorLinkReference',
  type: 'object',

  fields: [
    {
      name: 'title',
      description: 'Visible title for the anchor link in the list of anchors',
      type: 'string',
    },
    {
      name: 'anchorReference',
      title: 'Anchor reference',
      type: 'anchorReferenceField',
      description: AnchorLinkDescription(),
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
