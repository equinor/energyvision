/* eslint-disable @typescript-eslint/ban-ts-comment */
import { anchor } from '@equinor/eds-icons'
import { Rule } from '@sanity/types'
import { validateComponentAnchor } from '../validations/validateAnchorReference'
import { EdsIcon } from '../../icons'
import React from 'react'

export type AnchorLink = {
  _type: 'anchorLink'
}

export default {
  title: 'Anchor Link',
  description: 'This component is to be used to display Id',
  name: 'anchorLink',
  type: 'object',

  fields: [
    {
      name: 'anchorReference',
      type: 'anchorReferenceField',
      title: 'Anchor reference',
      validation: (Rule: Rule) =>
        // @ts-ignore
        Rule.custom((value: string, context: any) => validateComponentAnchor(value, context)),
    },
  ],
  preview: {
    select: {
      anchorReference: 'anchorReference',
    },
    prepare({ anchorReference }: { anchorReference: string }) {
      return {
        title: anchorReference,
        subtitle: `Anchor Link component`,
        media: EdsIcon(anchor),
      }
    },
  },
}
