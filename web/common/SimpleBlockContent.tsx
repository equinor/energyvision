/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component } from 'react'
import BlockContent from '@sanity/block-content-to-react'
import BlockRenderer from './serializers/BlockRenderer'
import SubRenderer from './serializers/SubRenderer'
import SupRenderer from './serializers/SupRenderer'

const defaultSerializers = {
  types: { block: BlockRenderer },
  marks: { sub: SubRenderer, sup: SupRenderer },
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
  serializers: Serializers
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const SimpleBlockContent = ({ blocks, serializers = {}, ...props }: Props) => (
  <BlockContent blocks={blocks} serializers={{ ...defaultSerializers, ...serializers }} {...props} />
)

export default SimpleBlockContent
