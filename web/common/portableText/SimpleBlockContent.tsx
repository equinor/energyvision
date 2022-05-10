/* eslint-disable @typescript-eslint/no-explicit-any */
import { PortableText, PortableTextProps } from '@portabletext/react'
import // InternalLinkRenderer,
// ListRenderer,
// ListItemRenderer,
'../serializers'
import { h3Heading, h2Heading, Sub, Sup, ExternalLink /* InternalLink */ } from './components'
import type { PortableTextBlock } from '@portabletext/types'

import { Text } from '@components'

//import removeEmptyBlocks from '../helpers/removeEmptyBlocks'

const defaultSerializers = {
  block: {
    h2: h2Heading,
    h3: h3Heading,
    normal: ({ children }: PortableTextBlock) => <Text> {children}</Text>,
    smallText: ({ children }: PortableTextBlock) => <Text size="small">{children}</Text>,
  },
  marks: { sub: Sub, sup: Sup, link: ExternalLink /*  internalLink: InternalLink */ },
  // list: ListRenderer,
  //  listItem: ListItemRenderer,
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const SimpleBlockContent = ({ value, components = {}, ...props }: PortableTextProps) => (
  <PortableText
    value={value /* && removeEmptyBlocks(value) */}
    // eslint-disable-next-line
    // @ts-ignore: Look into the correct way of doing this
    components={{ ...defaultSerializers, ...components }}
    {...props}
  />
)

export default SimpleBlockContent
