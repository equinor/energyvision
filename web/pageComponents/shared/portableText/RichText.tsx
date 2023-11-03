/* eslint-disable @typescript-eslint/no-explicit-any */
import { PortableText, PortableTextProps } from '@portabletext/react'
import { Text, List } from '@components'
import {
  h3Heading,
  h2Heading,
  Sub,
  Sup,
  ExternalLink,
  InternalLink,
  FigureWithLayout,
  Quote,
  Fact,
  BulletList,
  NumberedList,
} from './components'
import isEmpty from './helpers/isEmpty'
import type { PortableTextBlock } from '@portabletext/types'

const { Item } = List

const defaultSerializers = {
  block: {
    h2: h2Heading,
    h3: h3Heading,
    normal: ({ children }: PortableTextBlock) => {
      if (isEmpty(children)) return null
      return (
        <Text>
          <>{children}</>
        </Text>
      )
    },
    smallText: ({ children }: PortableTextBlock) => (
      <Text size="small">
        <>{children}</>
      </Text>
    ),
  },
  types: {
    positionedInlineImage: FigureWithLayout,
    factbox: Fact,
    pullQuote: Quote,
  },
  marks: { sub: Sub, sup: Sup, link: ExternalLink, internalLink: InternalLink },
  list: {
    bullet: BulletList,
    number: NumberedList,
  },
  listItem: ({ children }: PortableTextBlock) => (
    <Item>
      <>{children}</>
    </Item>
  ),
}

const RichText = ({ value, components = {}, ...props }: PortableTextProps) => (
  <PortableText
    value={value}
    // eslint-disable-next-line
    // @ts-ignore: Look into the correct way of doing this
    components={{ ...defaultSerializers, ...components }}
    {...props}
  />
)

export default RichText
