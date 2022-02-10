/* eslint-disable @typescript-eslint/no-explicit-any */
import { PortableTextProps } from '@sanity/block-content-to-react'
import { PortableText } from '../lib/sanity'
import {
  PaddedBlockRenderer,
  SubRenderer,
  SupRenderer,
  InternalLinkRenderer,
  ExternalLinkRenderer,
  FactRenderer,
  QuoteRenderer,
  FigureRendererWithLayout,
  PaddedListRenderer,
  ListItemRenderer,
} from './serializers/'
import removeEmptyBlocks from './helpers/removeEmptyBlocks'

const defaultSerializers = {
  marks: { sub: SubRenderer, sup: SupRenderer, link: ExternalLinkRenderer, internalLink: InternalLinkRenderer },
  types: {
    block: PaddedBlockRenderer,
    positionedInlineImage: FigureRendererWithLayout,
    factbox: FactRenderer,
    pullQuote: QuoteRenderer,
  },
  list: PaddedListRenderer,
  listItem: ListItemRenderer,
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const NewsBlockContent = ({ blocks, serializers = {}, ...props }: PortableTextProps) => {
  return (
    <PortableText
      blocks={blocks && removeEmptyBlocks(blocks)}
      serializers={{...defaultSerializers, ...serializers }}
      {...props}
    />
  )
}

export default NewsBlockContent
