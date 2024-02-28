/* eslint-disable @typescript-eslint/ban-ts-comment */
import { PortableText } from '@portabletext/react'
import { PortableTextBlock } from '@portabletext/types'
import { FigureWithLayout, Quote, Fact, Sub, Sup, ExternalLink, InternalLink } from './components'
import { Heading } from '@components/Heading'
import isEmpty from './helpers/isEmpty'

const blockSerializer = {
  block: {
    h2: ({ children }: { children?: React.ReactNode }) => <h2 className={`px-layout-lg`}>{children}</h2>,
    normal: ({ children }: PortableTextBlock) => {
      if (isEmpty(children)) return null
      return (
        <p className={`px-layout-lg`}>
          {/*@ts-ignore */}
          {children}
        </p>
      )
    },
    smallText: ({ children }: PortableTextBlock) => {
      if (isEmpty(children)) return null
      return (
        <p
          className={`px-layout-lg 
          text-sm`}
        >
          {/*@ts-ignore */}
          {children}
        </p>
      )
    },
  },
  marks: {
    sub: Sub,
    sup: Sup,
    link: ExternalLink,
    internalLink: InternalLink,
  },
  types: {
    //@ts-ignore
    positionedInlineImage: FigureWithLayout,
    //@ts-ignore
    pullQuote: Quote,
  },
  list: {
    bullet: ({ children }: PortableTextBlock) => (
      <div className="px-layout-lg">
        <ul>{children}</ul>
      </div>
    ),
    number: ({ children }: PortableTextBlock) => <ol className="px-layout-lg">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li>{children}</li>,
  },
}

type Props = {
  value: PortableTextBlock[]
}

const inlineBlockTypes = ['block', 'positionedInlineImage', 'pullQuote']

export default function Blocks({ value }: Props) {
  let div: PortableTextBlock[] = []
  return value.map((block, i, blocks) => {
    // Normal text blocks (p, h1, h2, etc.) — these are grouped so we can wrap them in a prose div
    if (inlineBlockTypes.includes(block._type)) {
      div.push(block)

      // If the next block is also text, group it with this one
      if (inlineBlockTypes.includes(blocks[i + 1]?._type)) return null

      // Otherwise, render the group of text blocks we have
      const value = div
      div = []

      return (
        <div
          key={block._key}
          className={`
          prose   
          prose-envis 
          p-0
          max-w-viewport
          mx-auto
        `}
        >
          <PortableText
            value={value}
            //@ts-ignore
            components={{
              ...blockSerializer,
            }}
          />
        </div>
      )
    } else {
      // Non-text blocks (modules, sections, etc.) — note that these can recursively render text
      // blocks again
      return (
        <PortableText
          key={block._key}
          value={block}
          components={{
            types: {
              //@ts-ignore
              factbox: Fact,
              //@ts-ignore
              positionedInlineImage: FigureWithLayout,
            },
          }}
        />
      )
    }
  })
}
