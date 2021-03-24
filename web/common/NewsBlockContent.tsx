/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component } from 'react'
import BlockContent from '@sanity/block-content-to-react'
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
    factbox: FactRenderer,
    blockQuote: QuoteRenderer,
  },
}

// @TODO: Need to revisit this!!!!
type Serializers = {
  // eslint-disable-next-line no-unused-vars
  types?: Record<string, (props: any) => JSX.Element | null>
  // eslint-disable-next-line no-unused-vars
  marks?: Record<string, (props: any) => JSX.Element | null>
  list?: Component
  listItem?: Component
  hardBreak?: Component
  container?: Component
}

type Block = {
  _type: string
  children: []
}

type Props = {
  blocks: Block[]
  serializers?: Serializers
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const NewsBlockContent = ({ blocks, serializers = {}, ...props }: Props) => (
  <BlockContent blocks={blocks} serializers={{ ...defaultSerializers, ...serializers }} {...props} />
)

export default NewsBlockContent
