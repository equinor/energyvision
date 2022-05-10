/* eslint-disable @typescript-eslint/no-explicit-any */
import { PortableText, PortableTextProps } from '@portabletext/react'
import styled from 'styled-components'
import { h3Heading, h2Heading, Sub, Sup, ExternalLink, InternalLink } from './components'
import type { PortableTextBlock } from '@portabletext/types'

import { Text, List } from '@components'

const { Item } = List

const StyledList = styled(List)`
  font-size: var(--typeScale-2);
`

//import removeEmptyBlocks from '../helpers/removeEmptyBlocks'

const defaultSerializers = {
  block: {
    h2: h2Heading,
    h3: h3Heading,
    normal: ({ children }: PortableTextBlock) => <Text size="md">{children}</Text>,
    smallText: ({ children }: PortableTextBlock) => <Text size="small">{children}</Text>,
  },
  marks: { sub: Sub, sup: Sup, link: ExternalLink, internalLink: InternalLink },
  list: {
    bullet: ({ children }: PortableTextBlock) => <StyledList>{children}</StyledList>,
    number: ({ children }: PortableTextBlock) => <StyledList variant="numbered">{children}</StyledList>,
  },
  listItem: ({ children }: PortableTextBlock) => <Item>{children}</Item>,
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const IngressText = ({ value, components = {}, ...props }: PortableTextProps) => (
  <PortableText
    value={value /* && removeEmptyBlocks(value) */}
    // eslint-disable-next-line
    // @ts-ignore: Look into the correct way of doing this
    components={{ ...defaultSerializers, ...components }}
    {...props}
  />
)

export default IngressText
