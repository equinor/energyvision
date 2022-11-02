import type { Rule, ValidationContext } from '@sanity/types'
// eslint-disable-next-line import/no-unresolved
import sanityClient from 'part:@sanity/base/client'
import { world } from '@equinor/eds-icons'
import { EdsIcon } from '../../icons'
import { SearchWeights } from '../searchWeights'
import { Flags } from '../../src/lib/datasetHelpers'

const client = sanityClient.withConfig({ apiVersion: '2021-05-19' })

const externalRedirect = {
  title: 'External Redirect',
  name: 'externalRedirect',
  type: 'document',
  fields: [
    {
      title: 'From:',
      description: 'Example: /en/this-is/an-example',
      name: 'from',
      type: 'string',
      validation: (Rule: Rule) =>
        Rule.custom(async (value: string, context: ValidationContext) => {
          const { document } = context
          const documentId = document?._id
          const query = `*[_type == 'externalRedirect' && from == $value && _id != $documentId && "drafts." + _id != $documentId && !(_id in path("drafts.**"))]`
          const params = { value, documentId }
          const redirects = await client.fetch(query, params)

          if (!value) {
            return 'Slug is required'
          } else if (value.charAt(0) !== '/') {
            return "Slug must begin with '/'. Do not add https://www.equinor.etc"
          } else if (redirects.length > 0) {
            return 'Another external redirect from this path already exists'
          }

          return true
        }),
    },
    {
      title: 'To:',
      name: 'to',
      description: 'Example: https://www.this-is-another-example.com',
      type: 'string',
      validation: (Rule: Rule) =>
        Rule.custom(async (value: string) => {
          if (!value) {
            return 'Url is required'
          } else if (!value.startsWith('https://') && !value.startsWith('http://')) {
            return "Url must begin with 'https://' or 'http://'"
          }

          return true
        }),
    },
  ],
  preview: {
    select: {
      from: 'from',
      to: 'to',
    },
    prepare({ from, to }: { from: string; to: string }) {
      return { title: `From: ${from}`, subtitle: `To: ${to}`, media: () => EdsIcon(world) }
    },
  },
}

export default Flags.IS_DEV
  ? externalRedirect
  : {
      ...externalRedirect,
      __experimental_search: [
        { weight: SearchWeights.Redirects, path: 'from' },
        { weight: SearchWeights.Redirects, path: 'to' },
      ],
    }