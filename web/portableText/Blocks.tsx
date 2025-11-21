'use client'

import {
  PortableText,
  type PortableTextBlockComponent,
  type PortableTextListComponent,
  type PortableTextMarkComponent,
  type PortableTextReactComponents,
  type PortableTextTypeComponent,
} from '@portabletext/react'
import type {
  PortableTextBlock,
  PortableTextBlockStyle,
} from '@portabletext/types'
import type { ElementType } from 'react'
import { twMerge } from 'tailwind-merge'
import { IFrame } from '@/core/IFrame/IFrame'
import type { TypographyProps } from '@/core/Typography'
import type {
  TypographyGroups,
  TypographyVariants,
} from '@/core/Typography/variants'
import { FactBox } from '@/sections/FactBox/FactBox'
import { FigureWithLayout, Quote } from './components'
import { Block } from './components/Block'
import { Footnote } from './components/Footnote'
import { Link } from './components/Link'
import { List } from './components/List'

export type BlockType = Record<
  PortableTextBlockStyle,
  PortableTextBlockComponent | undefined
>
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type MarkType = Record<
  string,
  PortableTextMarkComponent<any> | undefined
>
export type TypesType = Record<
  string,
  PortableTextTypeComponent<any> | undefined
>
export type ListType = Record<'number' | 'bullet', PortableTextListComponent>

type TypeProps = {
  value?: any
  children?: PortableTextBlock[]
}
type TWLineClamps = {
  [key: number]: string
}

// Ingress only has normal and small text
// Text Block Text Content has normal, small text and heading 3
// News Content has normal, small text and heading 2 and 3 -> Heading group article
const getBlockComponents = ({
  as,
  className = '',
  group,
  variant,
}: {
  as?: ElementType
  className?: string
  group?: TypographyGroups
  variant?: TypographyVariants
}) => {
  return {
    normal: ({ children }: TypeProps) => {
      return (
        <Block as={as} group={group} variant={variant} className={className}>
          {/**@ts-ignore:todo */}
          {children}
        </Block>
      )
    },
    smallText: ({ children }: TypeProps) => (
      <Block as={as} variant='sm' className={className}>
        {/**@ts-ignore:todo */}
        {children}
      </Block>
    ),
    largeText: ({ children }: TypeProps) => (
      <Block as={as} variant='2xl' className={className}>
        {/**@ts-ignore:todo */}
        {children}
      </Block>
    ),
    extraLargeText: ({ children }: TypeProps) => {
      return (
        <Block as={as} variant='5xl' className={className}>
          {/**@ts-ignore:todo */}
          {children}
        </Block>
      )
    },
    twoXLText: ({ children }: TypeProps) => {
      return (
        <Block as={as} variant='8xl' className={className}>
          {/**@ts-ignore:todo */}
          {children}
        </Block>
      )
    },
    h2: ({ children }: TypeProps) => (
      <Block as={as} group={group} variant='h2' className={className}>
        {/**@ts-ignore:todo */}
        {children}
      </Block>
    ),
    h3: ({ children }: TypeProps) => (
      <Block as={as} group={group} variant='h3' className={className}>
        {/**@ts-ignore:todo */}
        {children}
      </Block>
    ),
    h4: ({ children }: TypeProps) => (
      <Block as={as} group={group} variant='h4' className={className}>
        {/**@ts-ignore:todo */}
        {children}
      </Block>
    ),
  }
}

const markSerializers: MarkType = {
  //@ts-ignore:todo
  sub: ({ children }: TypeProps) => <sub>{children}</sub>,
  //@ts-ignore:todo
  sup: ({ children }: TypeProps) => <sup>{children}</sup>,
  //@ts-ignore:todo
  s: ({ children }: TypeProps) => <s>{children}</s>,
  link: ({ children, value }: any) => {
    return (
      <Link type='externalUrl' value={value}>
        {children}
      </Link>
    )
  },
  internalLink: ({ children, value }: any) => {
    return (
      <Link type='internalUrl' value={value}>
        {children}
      </Link>
    )
  },
  footnote: () => null,
  //@ts-ignore:todo
  highlight: ({ children }: TypeProps) => {
    return (
      <span
        data-highlight
        className={'text-energy-red-100 dark:text-spruce-wood-100'}
      >
        {/*@ts-ignore:todo*/}
        {children}
      </span>
    )
  },
  strong: ({ children }: any) => (
    <strong className='font-bold'>{children}</strong>
  ),
}

const listSerializers: ListType = {
  bullet: ({ children }: any) => {
    return <List as='ul'>{children}</List>
  },
  number: ({ children }: any) => {
    return <List as='ol'>{children}</List>
  },
}

const typesSerializers = {
  positionedInlineImage: (props: any) => <FigureWithLayout {...props} />,
  pullQuote: (props: any) => <Quote {...props} />,
}

const footnoteSerializer = {
  footnote: (props: any) => {
    return <Footnote {...props} />
  },
}

export type BlocksProps = {
  value: PortableTextBlock[]
  blocksComponents?: Partial<PortableTextReactComponents>
  marks?: MarkType
  types?: TypesType
  /**
   * Extend components sent for non blocks
   */
  components?:
    | PortableTextReactComponents
    | Partial<PortableTextReactComponents>
  className?: string
  /** Extended or overrides to the block serializers  */
  blockClassName?: string
  /** If needed to connect with aria-describedby and such */
  id?: string
  /** Use to clamp lines on number */
  clampLines?: 3 | 4 | 5
  includeFootnotes?: boolean
  noInvert?: boolean
} & TypographyProps

const inlineBlockTypes = ['block', 'positionedInlineImage', 'pullQuote']

export default function Blocks({
  group,
  variant = 'body',
  value,
  blocksComponents,
  marks: marksComponents,
  components,
  className = '',
  blockClassName = '',
  id,
  clampLines,
  includeFootnotes = false,
  as,
}: BlocksProps) {
  let div: PortableTextBlock[] = []
  if (!value) return

  return (
    //@ts-ignore:todo
    value.map(
      (block: PortableTextBlock, i: number, blocks: PortableTextBlock[]) => {
        // Normal text blocks (p, h1, h2, etc.) — these are grouped so we can wrap them in a prose div
        if (inlineBlockTypes.includes(block._type)) {
          const twLineClampUtility: TWLineClamps = {
            3: 'line-clamp-3',
            4: 'line-clamp-4',
            5: 'line-clamp-5',
          }

          if (blocks?.length === 1) {
            return (
              <PortableText
                key={block._key}
                className={twMerge(
                  ` ${group === 'article' ? 'px-layout-lg' : ''}`,
                  clampLines && twLineClampUtility[clampLines],
                  className,
                )}
                id={id}
                value={block}
                components={{
                  //@ts-ignore:todo
                  block: {
                    ...getBlockComponents({
                      group,
                      variant,
                      as,
                      className: blockClassName,
                    }),
                    ...blocksComponents,
                  },
                  types: { ...typesSerializers },
                  marks: {
                    ...markSerializers,
                    ...marksComponents,
                    ...(includeFootnotes && footnoteSerializer),
                  },
                  list: { ...listSerializers },
                }}
                onMissingComponent={(message, options) => {
                  console.warn(
                    `${message},type:${options.type},nodeType:${options.nodeType}`,
                  )
                }}
              />
            )
          }
          div.push(block)

          // If the next block is also text/pullQuote, group it with this one
          if (inlineBlockTypes.includes(blocks[i + 1]?._type)) return null

          // Otherwise, render the group of text blocks we have
          const value = div
          div = []

          return (
            <div
              key={block._key}
              className={twMerge(
                `${group === 'article' ? 'px-layout-lg' : ''}`,
                clampLines && twLineClampUtility[clampLines],
                className,
              )}
              id={id}
            >
              <PortableText
                value={value}
                components={{
                  //@ts-ignore:todo
                  block: {
                    ...getBlockComponents({
                      group,
                      variant,
                      as,
                      className: blockClassName,
                    }),
                    ...blocksComponents,
                  },
                  types: { ...typesSerializers },
                  marks: {
                    ...markSerializers,
                    ...marksComponents,
                    ...(includeFootnotes && footnoteSerializer),
                  },
                  list: { ...listSerializers },
                }}
                onMissingComponent={(message, options) => {
                  console.warn(
                    `${message},type:${options.type},nodeType:${options.nodeType}`,
                  )
                }}
              />
            </div>
          )
        }
        /** Factbox block */
        if (block._type === 'factbox') {
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
                  factbox: props => (
                    //@ts-ignore:todo
                    <FactBox className={`${marginOverride}`} {...props} />
                  ),
                },
              }}
            />
          )
        }
        /** Basic iframe block */
        if (block._type === 'basicIframe') {
          let marginOverride = ''
          // If the next block is a basicIframe, remove margin bottom
          if (blocks[i + 1]?._type === 'basicIframe') {
            marginOverride = 'mb-0'
          }
          // If the previous block was a basicIframe, remove margin top
          if (blocks[i - 1]?._type === 'basicIframe') {
            marginOverride = 'mt-0'
          }

          return (
            <PortableText
              key={block._key}
              value={block}
              components={{
                types: {
                  //@ts-ignore:todo
                  basicIframe: props => {
                    const { value } = props
                    return (
                      <IFrame
                        {...value}
                        className={`px-layout-md ${marginOverride}`}
                      />
                    )
                  },
                },
              }}
            />
          )
        }
        // Non-text blocks (modules, sections, etc.) — note that these can recursively render text
        // blocks again
        return (
          <PortableText
            key={block._key}
            value={block}
            components={{
              ...components,
            }}
          />
        )
      },
    )
  )
}
