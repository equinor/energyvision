// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
'use client'
import {
  PortableText,
  PortableTextReactComponents,
  PortableTextMarkComponent,
  PortableTextBlockComponent,
  PortableTextTypeComponent,
  PortableTextListComponent,
} from '@portabletext/react'
import { PortableTextBlock, PortableTextBlockStyle } from '@portabletext/types'
import { FigureWithLayout, Quote } from './components'
import { FactBox } from '@/sections/FactBox/FactBox'
import { twMerge } from 'tailwind-merge'
import { IFrame } from '@/core/IFrame/IFrame'
import { Footnote } from './components/Footnote'
import { Link } from './components/Link'
import { List } from './components/List'
import { TypographyGroups, TypographyVariants } from '@/core/Typography/variants'
import { Block } from './components/Block'
import { TypographyProps } from '@/core/Typography'

export type BlockType = Record<PortableTextBlockStyle, PortableTextBlockComponent | undefined>
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type MarkType = Record<string, PortableTextMarkComponent<any> | undefined>
export type TypesType = Record<string, PortableTextTypeComponent<any> | undefined>
export type ListType = Record<'number' | 'bullet', PortableTextListComponent>

type TypeProps = {
  value?: any
  children?: PortableTextBlock[]
}

/* const blockSerializers: BlockType = {
  normal: ({ children }: TypeProps) => <Block>{children}</Block>,
  smallText: ({ children }: TypeProps) => <Block textVariant="small">{children}</Block>,
  largeText: ({ children }: TypeProps) => <Block textVariant="large">{children}</Block>,
  extraLargeText: ({ children }: TypeProps) => {
    return <Block textVariant="extraLarge">{children}</Block>
  },
  twoXLText: ({ children }: TypeProps) => {
    return <Block textVariant="twoXLText">{children}</Block>
  },
  h2: ({ children }: TypeProps) => (
    <Block type="heading" headingLevel="h2">
      {children}
    </Block>
  ),
  h3: ({ children }: TypeProps) => (
    <Block type="heading" headingLevel="h3">
      {children}
    </Block>
  ),
  h4: ({ children }: TypeProps) => (
    <Block type="heading" headingLevel="h4">
      {children}
    </Block>
  ),
} */

// Ingress only has normal and small text
// Text Block Text Content has normal, small text and heading 3
// News Content has normal, small text and heading 2 and 3 -> Heading group article

const getBlockComponents = (group?: TypographyGroups, variant?: TypographyVariants, as, className = '') => {
  return {
    normal: ({ children }: TypeProps) => {
      return (
        <Block as={as} group={group} variant={variant} className={className}>
          {children}
        </Block>
      )
    },
    smallText: ({ children }: TypeProps) => (
      <Block as={as} variant="sm" className={className}>
        {children}
      </Block>
    ),
    largeText: ({ children }: TypeProps) => (
      <Block as={as} variant="2xl" className={className}>
        {children}
      </Block>
    ),
    extraLargeText: ({ children }: TypeProps) => {
      return (
        <Block as={as} variant="5xl" className={className}>
          {children}
        </Block>
      )
    },
    twoXLText: ({ children }: TypeProps) => {
      return (
        <Block as={as} variant="8xl" className={className}>
          {children}
        </Block>
      )
    },
    h2: ({ children }: TypeProps) => (
      <Block as={as} group={group} variant="h2" className={className}>
        {children}
      </Block>
    ),
    h3: ({ children }: TypeProps) => (
      <Block as={as} group={group} variant="h3" className={className}>
        {children}
      </Block>
    ),
    h4: ({ children }: TypeProps) => (
      <Block as={as} group={group} variant="h4" className={className}>
        {children}
      </Block>
    ),
  }
}

const markSerializers: MarkType = {
  sub: ({ children }: TypeProps) => <sub>{children}</sub>,
  sup: ({ children }: TypeProps) => <sup>{children}</sup>,
  s: ({ children }: TypeProps) => <s>{children}</s>,
  link: ({ children, value }: any) => {
    return (
      <Link type="externalUrl" value={value}>
        {children}
      </Link>
    )
  },
  internalLink: ({ children, value }: any) => {
    return (
      <Link type="internalUrl" value={value}>
        {children}
      </Link>
    )
  },
  footnote: () => null,
  highlight: ({ children }: TypeProps) => {
    return (
      <span data-highlight className={'text-energy-red-100 dark:text-spruce-wood-100'}>
        {children}
      </span>
    )
  },
  strong: ({ children }: any) => <strong className="font-bold">{children}</strong>,
}

const listSerializers: ListType = {
  bullet: ({ children }: any) => {
    return <List as="ul">{children}</List>
  },
  number: ({ children }: any) => {
    return <List as="ol">{children}</List>
  },
}

const typesSerializers = {
  //@ts-ignore:todo
  positionedInlineImage: (props) => <FigureWithLayout {...props} />,
  //@ts-ignore:todo
  pullQuote: (props) => <Quote {...props} />,
  //@ts-ignore:todo
  basicIframe: (props) => {
    const { value } = props
    return <IFrame {...value} className="mx-auto px-layout-md py-14" />
  },
}
const footnoteSerializer = {
  footnote: (props: any) => {
    return <Footnote {...props} />
  },
}

type TWLineClamps = {
  [key: number]: string
}

//TODO - Struggling with types
const getLineClampNormalBlock = (linesToClamp: number): any => {
  const twLineClampUtility: TWLineClamps = {
    3: 'line-clamp-3',
    4: 'line-clamp-4',
    5: 'line-clamp-5',
  }

  return {
    normal: ({ children }: PortableTextBlock) => (
      <p className={twLineClampUtility[linesToClamp as keyof TWLineClamps]}>
        <>{children}</>
      </p>
    ),
  }
}

export type BlocksProps = {
  value: PortableTextBlock[]
  blocksComponents?: Partial<PortableTextReactComponents>
  marks?: MarkType
  types?: TypesType
  /**
   * Extend components sent for non blocks
   */
  components?: PortableTextReactComponents | Partial<PortableTextReactComponents>
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

const inlineBlockTypes = ['block', 'positionedInlineImage', 'pullQuote', 'basicIframe']

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
  return (
    <>
      {//@ts-ignore:todo
      value?.map((block: PortableTextBlock, i: number, blocks: PortableTextBlock[]) => {
        console.log('blocks', blocks)
        // Normal text blocks (p, h1, h2, etc.) — these are grouped so we can wrap them in a prose div
        if (inlineBlockTypes.includes(block._type)) {
          if (blocks?.length === 1) {
            return (
              <PortableText
                key={block._key}
                className={twMerge(` ${group === 'article' ? 'px-layout-lg' : ''}`, className)}
                id={id}
                value={value}
                //@ts-ignore:todo
                components={{
                  block: {
                    ...getBlockComponents(group, variant, as, blockClassName),
                    ...blocksComponents,
                    ...(clampLines && getLineClampNormalBlock(clampLines)),
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
                  console.warn(`${message},type:${options.type},nodeType:${options.nodeType}`)
                }}
              />
            )
          } else {
            div.push(block)

            // If the next block is also text/pullQuote, group it with this one
            if (inlineBlockTypes.includes(blocks[i + 1]?._type)) return null

            // Otherwise, render the group of text blocks we have
            const value = div
            div = []
            /*           console.log('block', block) */

            return (
              <div
                key={block._key}
                className={twMerge(` ${group === 'article' ? 'px-layout-lg' : ''}`, className)}
                id={id}
              >
                <PortableText
                  value={value}
                  //@ts-ignore:todo
                  components={{
                    block: {
                      ...getBlockComponents(group, variant, as, blockClassName),
                      ...blocksComponents,
                      ...(clampLines && getLineClampNormalBlock(clampLines)),
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
                    console.warn(`${message},type:${options.type},nodeType:${options.nodeType}`)
                  }}
                />
              </div>
            )
          }
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
                  //@ts-ignore:todo
                  factbox: (props) => <FactBox className={`${marginOverride}`} {...props} />,
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
                ...components,
              }}
            />
          )
        }
      })}
    </>
  )
}
