'use client'
import {
  PortableText,
  PortableTextProps,
  PortableTextReactComponents,
  PortableTextMarkComponent,
  PortableTextBlockComponent,
  PortableTextTypeComponent,
} from '@portabletext/react'
import { PortableTextBlock, PortableTextBlockStyle } from '@portabletext/types'
import { FigureWithLayout, Quote, ExternalLink, InternalLink, BulletList, NumberedList } from './components'
import { FactBox } from '@/sections/FactBox/FactBox'
import { twMerge } from 'tailwind-merge'
import { Highlight } from '@/core/Typography/Highlight'
import { IFrame } from '@/core/IFrame/IFrame'
import { Footnote } from './components/Footnote'
import { Typography } from '@/core/Typography'

export type BlockType = Record<PortableTextBlockStyle, PortableTextBlockComponent | undefined>
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type MarkType = Record<string, PortableTextMarkComponent<any> | undefined>
export type TypesType = Record<string, PortableTextTypeComponent<any> | undefined>

type TypeProps = {
  value?: any
  children?: React.ReactNode
}

const defaultBlockSerializers = {
  normal: ({ children }: TypeProps) => <Typography>{children}</Typography>,
  smallText: ({ children }: TypeProps) => <p className="text-sm">{children}</p>,
  largeText: ({ children }: TypeProps) => <p className="text-2xl leading-snug">{children}</p>,
  extraLargeText: ({ children }: TypeProps) => {
    return <p className={`text-4xl leading-planetary font-medium lg:text-5xl 2xl:text-8xl`}>{children}</p>
  },
}
const proseBlockSerializers = {
  normal: ({ children }: TypeProps) => (
    <Typography group="prose" variant="body">
      {children}
    </Typography>
  ),
  smallText: ({ children }: TypeProps) => (
    <Typography group="prose" variant="body" className="text-sm">
      {children}
    </Typography>
  ),
  largeText: ({ children }: TypeProps) => (
    <Typography group="prose" variant="body" className="text-2xl leading-snug">
      {children}
    </Typography>
  ),
  extraLargeText: ({ children }: TypeProps) => {
    return (
      <Typography
        group="prose"
        variant="body"
        className={`text-4xl leading-planetary font-medium lg:text-5xl 2xl:text-8xl`}
      >
        {children}
      </Typography>
    )
  },
  h2: ({ children }: TypeProps) => (
    <Typography as="h2" variant="h2" group="prose">
      {children}
    </Typography>
  ),
  h3: ({ children }: TypeProps) => (
    <Typography as="h3" variant="h3" group="prose">
      {children}
    </Typography>
  ),
}
const defaultMarkSerializers = {
  sub: ({ children }: TypeProps) => <sub>{children}</sub>,
  sup: ({ children }: TypeProps) => <sup>{children}</sup>,
  s: ({ children }: TypeProps) => <s>{children}</s>,
  //TODO find proper type
  link: ({ children, value }: any) => {
    return <ExternalLink value={value}>{children}</ExternalLink>
  },
  //TODO find proper type
  internalLink: ({ children, value }: any) => {
    return <InternalLink value={value}>{children}</InternalLink>
  },
  footnote: () => null,
  highlight: ({ children }: TypeProps) => {
    return <Highlight>{children}</Highlight>
  },
  strong: ({ children }: any) => <strong className="font-bold text-inherit">{children}</strong>,
}
/* const proseMarkSerializers = {
  sub: ({ children }: TypeProps) => <sub>{children}</sub>,
  sup: ({ children }: TypeProps) => <sup>{children}</sup>,
  s: ({ children }: TypeProps) => <s>{children}</s>,
  //TODO find proper type
  link: ({ children, value }: any) => {
    return <ExternalLink value={value}>{children}</ExternalLink>
  },
  //TODO find proper type
  internalLink: ({ children, value }: any) => {
    return <InternalLink value={value}>{children}</InternalLink>
  },
  footnote: () => null,
  highlight: ({ children }: TypeProps) => {
    return <Highlight>{children}</Highlight>
  },
  strong: ({ children }: any) => <strong className="font-bold text-inherit">{children}</strong>,
} */

const defaultListSerializers = {
  bullet: BulletList,
  number: NumberedList,
}
/* const proseListSerializers = {
  bullet: BulletList,
  number: NumberedList,
} */

const defaultSerializers = {
  types: {
    //@ts-ignore:todo
    positionedInlineImage: (props) => <FigureWithLayout {...props} />,
    //@ts-ignore:todo
    pullQuote: (props) => <Quote {...props} className="not-prose" />,
    //@ts-ignore:todo
    basicIframe: (props) => {
      const { value } = props
      return <IFrame {...value} className="not-prose mx-auto px-layout-md py-14" />
    },
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

export type ProseVariants = 'no-prose' | 'prose-article' | 'prose-medium' | 'prose-campaign'

export type BlockProps = {
  variant?: ProseVariants
  /**
   * Override default block serializers
   */
  blocksComponents?: Partial<PortableTextReactComponents>
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
   * Override other styling to the wrapping block
   */
  className?: string
  /**
   * If needed to connect with aria-describedby and such
   */
  id?: string
  /** Use to clamp lines on number */
  clampLines?: 3 | 4 | 5
  includeFootnotes?: boolean
  noInvert?: boolean
} & PortableTextProps

const inlineBlockTypes = ['block', 'positionedInlineImage', 'pullQuote', 'basicIframe']

export default function Blocks({
  variant = 'no-prose',
  value,
  blocksComponents,
  marks: marksComponents,
  components,
  className = '',
  id,
  clampLines,
  includeFootnotes = false,
  noInvert = false,
}: BlockProps) {
  let div: PortableTextBlock[] = []
  return (
    <>
      {//@ts-ignore:todo
      value?.map((block: PortableTextBlock, i: number, blocks: PortableTextBlock[]) => {
        // Normal text blocks (p, h1, h2, etc.) — these are grouped so we can wrap them in a prose div
        if (inlineBlockTypes.includes(block._type)) {
          div.push(block)

          // If the next block is also text/pullQuote, group it with this one
          if (inlineBlockTypes.includes(blocks[i + 1]?._type)) return null

          // Otherwise, render the group of text blocks we have
          const value = div
          div = []
          /*           const proseGroup: Partial<Record<Variants, string>> = {
            default: 'group/prose',
            article: 'group/article',
            campaign: 'group/campaign',
            medium: 'group/medium',
          } */

          return (
            <div
              key={block._key}
              /*               {...(!noProse && { 'data-prose': variant })} */
              className={twMerge(`${variant === 'no-prose' ? '' : `prose ${variant}`}`, className)}
              id={id}
            >
              <PortableText
                value={value}
                //@ts-ignore:todo
                components={{
                  block: {
                    ...defaultSerializers,
                    ...(variant === 'no-prose' ? defaultBlockSerializers : proseBlockSerializers),
                    ...blocksComponents,
                    ...(clampLines && getLineClampNormalBlock(clampLines)),
                  },
                  types: { ...defaultSerializers.types },
                  marks: {
                    ...defaultMarkSerializers,
                    ...marksComponents,
                    ...(includeFootnotes && footnoteSerializer),
                  },
                  list: { ...defaultListSerializers },
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
