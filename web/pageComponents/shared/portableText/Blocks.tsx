/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
  defaultComponents,
  PortableText,
  PortableTextProps,
  PortableTextReactComponents,
  PortableTextMarkComponent,
  PortableTextBlockComponent,
  PortableTextTypeComponent,
} from '@portabletext/react'
import { PortableTextBlock, PortableTextBlockStyle } from '@portabletext/types'
import { FigureWithLayout, Quote, Fact, ExternalLink, InternalLink, BasicIframe } from './components'
import { twMerge } from 'tailwind-merge'

export type BlockType = Record<PortableTextBlockStyle, PortableTextBlockComponent | undefined>
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type MarkType = Record<string, PortableTextMarkComponent<any> | undefined>
export type TypesType = Record<string, PortableTextTypeComponent<any> | undefined>

type TypeProps = {
  children?: React.ReactNode
}

/* const defaultBlocks: BlockType = {
  smallText: ({ children }: TypeProps) => <p className="text-sm">{children}</p>,
  largeText: ({ children,className }: TypeProps) => <p className="text-2xl">{children}</p>,
  extraLargeText: ({ children, className }: TypeProps) => {
    return <p className=" whitespace-pre text-9xl font-semibold mt-4">{children}</p>
  },
} */
const defaultBlocks = (className?: string): BlockType => {
  return {
    smallText: ({ children }: TypeProps) => <p className="text-sm">{children}</p>,
    largeText: ({ children }: TypeProps) => <p className="text-2xl leading-snug">{children}</p>,
    extraLargeText: ({ children }: TypeProps) => {
      return (
        <p
          className={twMerge(`my-4 lg:my-6 text-5xl lg:text-6xl 2xl:text-8xl font-medium leading-planetary`, className)}
        >
          {children}
        </p>
      )
    },
  }
}

const defaultMarks: MarkType = {
  sub: ({ children }: TypeProps) => <sub>{children}</sub>,
  sup: ({ children }: TypeProps) => <sup>{children}</sup>,
  s: ({ children }: TypeProps) => <s>{children}</s>,
  link: ExternalLink,
  internalLink: InternalLink,
}

const defaultTypes: TypesType = {
  //@ts-ignore
  positionedInlineImage: (props) => <FigureWithLayout {...props} />,
  //@ts-ignore
  pullQuote: (props) => <Quote {...props} className="not-prose" />,
  //@ts-ignore
  basicIframe: (props) => <BasicIframe {...props} className="not-prose px-layout-md" />,
}

type BlockProps = {
  /**
   * Override default block serializers
   */
  blocks?: BlockType
  /**
   * Override default marks serializers
   */
  marks?: MarkType
  /**
   * Override default types serializers
   */
  types?: TypesType
  /**
   * Extend components sent for non blocks
   */
  components?: PortableTextReactComponents | Partial<PortableTextReactComponents>
  /**
   * Override the styling for prose wrapping block
   * @default
   */
  proseClassName?: string
  /**
   * Override other styling to the wrapping block
   */
  className?: string
  blocksClassName?: string
  /**
   * If needed to connect with aria-describedby and such
   */
  id?: string
} & PortableTextProps

const inlineBlockTypes = ['block', 'positionedInlineImage', 'pullQuote', 'basicIframe']

//@ts-ignore
export default function Blocks({
  value,
  blocks,
  marks,
  types,
  components,
  proseClassName = '',
  blocksClassName = '',
  className = '',
  id,
}: BlockProps) {
  let div: PortableTextBlock[] = []

  const serializers: PortableTextReactComponents = {
    ...defaultComponents,
    block: {
      ...defaultComponents.block,
      ...defaultBlocks(blocksClassName),
      ...blocks,
    } as BlockType,
    marks: {
      ...defaultComponents.marks,
      ...defaultMarks,
      ...marks,
    } as MarkType,
    types: {
      ...defaultComponents.types,
      ...(types ?? defaultTypes),
    } as TypesType,
  }

  return (
    <>
      {
        //@ts-ignore
        value?.map((block: PortableTextBlock, i: number, blocks: PortableTextBlock[]) => {
          // Normal text blocks (p, h1, h2, etc.) — these are grouped so we can wrap them in a prose div
          if (inlineBlockTypes.includes(block._type)) {
            div.push(block)

            // If the next block is also text/pullQuote, group it with this one
            if (inlineBlockTypes.includes(blocks[i + 1]?._type)) return null

            // Otherwise, render the group of text blocks we have
            const value = div
            div = []

            return (
              <div key={block._key} className={twMerge(`prose ${proseClassName} dark:prose-invert`, className)} id={id}>
                <PortableText
                  value={value}
                  //@ts-ignore
                  components={{
                    ...serializers,
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
          } else if (block._type === 'basicIframe') {
            return (
              <PortableText
                key={block._key}
                value={block}
                components={{
                  types: {
                    //@ts-ignore
                    basicIframe: (props) => <BasicIframe {...props} />,
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
                  ...defaultComponents,
                  ...components,
                }}
              />
            )
          }
        })
      }
    </>
  )
}
