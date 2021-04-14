/* eslint-disable @typescript-eslint/no-explicit-any */
import { PortableTextProps } from '@sanity/block-content-to-react'
import { PortableText } from '../lib/sanity'
import {
  BlockRenderer,
  SubRenderer,
  SupRenderer,
  InternalLinkRenderer,
  ExternalLinkRenderer,
  FigureRenderer,
  FactRenderer,
  QuoteRenderer,
} from './serializers/'

const defaultSerializers = {
  marks: { sub: SubRenderer, sup: SupRenderer, link: ExternalLinkRenderer, internalLink: InternalLinkRenderer },
  types: {
    block: BlockRenderer,
    imageWithAltAndCaption: FigureRenderer,
    positionedInlineImage: FigureRenderer,
    factbox: FactRenderer,
    pullQuote: QuoteRenderer,
  },
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const NewsBlockContent = ({ blocks, serializers = {}, ...props }: PortableTextProps) => (
  <PortableText blocks={blocks} serializers={{ ...defaultSerializers, ...serializers }} {...props} />
)

export default NewsBlockContent
