/* eslint-disable @typescript-eslint/no-explicit-any */
import { PortableText } from '../lib/sanity'
import { BlockRenderer, SubRenderer, SupRenderer } from './serializers/'
import { PortableTextProps } from '@sanity/block-content-to-react'

const defaultSerializers = {
  types: { block: BlockRenderer },
  marks: { sub: SubRenderer, sup: SupRenderer },
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const SimpleBlockContent = ({ blocks, serializers = {}, ...props }: PortableTextProps) => (
  <PortableText blocks={blocks} serializers={{ ...defaultSerializers, ...serializers }} {...props} />
)

export default SimpleBlockContent
