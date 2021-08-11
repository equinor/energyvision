/* eslint-disable @typescript-eslint/no-explicit-any */
import { PortableText } from '../lib/sanity'
import {
  BlockRenderer,
  SubRenderer,
  SupRenderer,
  ExternalLinkRenderer,
  InternalLinkRenderer,
  ListRenderer,
  ListItemRenderer,
} from './serializers/'
import { PortableTextProps } from '@sanity/block-content-to-react'
import removeEmptyBlocks from './helpers/removeEmptyBlocks'

const defaultSerializers = {
  types: { block: BlockRenderer },
  marks: { sub: SubRenderer, sup: SupRenderer, link: ExternalLinkRenderer, internalLink: InternalLinkRenderer },
  list: ListRenderer,
  listItem: ListItemRenderer,
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const SimpleBlockContent = ({ blocks, serializers = {}, ...props }: PortableTextProps) => (
  <PortableText
    blocks={blocks && removeEmptyBlocks(blocks)}
    serializers={{ ...defaultSerializers, ...serializers }}
    {...props}
  />
)

export default SimpleBlockContent
