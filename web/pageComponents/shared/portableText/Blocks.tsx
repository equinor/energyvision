/* eslint-disable @typescript-eslint/ban-ts-comment */
import { PortableText } from '@portabletext/react'
import { PortableTextBlock } from '@portabletext/types'
import { FigureWithLayout, Quote, Fact, Sub, Sup, ExternalLink, InternalLink } from './components'
/* import { Heading } from '@components/Heading' */
import isEmpty from './helpers/isEmpty'

const blockSerializer = {
  block: {
    h2: ({ children }: { children?: React.ReactNode }) => {
      return <h2 className={`px-layout-lg not-prose`}>{children}</h2>
    },
    h2Base: ({ children }: { children?: React.ReactNode }) => {
      return <h2 className={`px-layout-lg`}>{children}</h2>
    },
    h3Base: ({ children }: { children?: React.ReactNode }) => {
      return <h3 className={`px-layout-lg`}>{children}</h3>
    },
    h3: ({ children }: { children?: React.ReactNode }) => <h3 className={`px-layout-lg not-prose`}>{children}</h3>,
    normal: ({ children }: PortableTextBlock) => {
      if (isEmpty(children)) return null
      return (
        <p className={`px-layout-lg`}>
          <>{children}</>
        </p>
      )
    },
    smallText: ({ children }: PortableTextBlock) => {
      if (isEmpty(children)) return null
      return (
        <p className={`px-layout-lg text-sm`}>
          <>{children}</>
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
    positionedInlineImage: (props) => <FigureWithLayout {...props} />,
    //@ts-ignore
    pullQuote: Quote,
  },
  list: {
    bullet: ({ children }: PortableTextBlock) => (
      <ul>
        <>{children}</>
      </ul>
    ),
    number: ({ children }: PortableTextBlock) => (
      <ol>
        <>{children}</>
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }: PortableTextBlock) => (
      <li>
        <>{children}</>
      </li>
    ),
  },
}

type Props = {
  value: PortableTextBlock[]
}

const inlineBlockTypes = ['block', 'positionedInlineImage', 'pullQuote']

//@ts-ignore
export default function Blocks({ value }: Props) {
  let div: PortableTextBlock[] = []
  return (
    <>
      {value.map((block, i, blocks) => {
        // Normal text blocks (p, h1, h2, etc.) — these are grouped so we can wrap them in a prose div
        if (inlineBlockTypes.includes(block._type)) {
          div.push(block)

          // If the next block is also text/pullQuote, group it with this one
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
        } else if (block._type === 'factbox') {
          let marginOverride = ''
          // If the next block is a factbox, remove margin bottom
          if (blocks[i + 1]?._type === 'factbox') {
            marginOverride = 'mb-0'
          }
          // If the previous block was a factbox, remove margin top
          if (blocks[i - 1]?._type === 'factbox') {
            marginOverride = 'mt-0'
          }

          return (
            <PortableText
              key={block._key}
              value={block}
              components={{
                types: {
                  //@ts-ignore
                  factbox: (props) => <Fact className={`${marginOverride}`} {...props} />,
                },
              }}
            />
          )
        } else {
          // Non-text blocks (modules, sections, etc.) — note that these can recursively render text
          // blocks again
          return (
            <PortableText
              key={block._key}
              value={block}
              components={{
                types: {},
              }}
            />
          )
        }
      })}
    </>
  )
}
