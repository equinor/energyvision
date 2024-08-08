/* eslint-disable @typescript-eslint/ban-ts-comment */
import { PortableText, PortableTextProps } from '@portabletext/react'
import type { PortableTextBlock } from '@portabletext/types'
import { Typography, TypographyProps } from './Typography'
import isEmpty from '../../pageComponents/shared/portableText/helpers/isEmpty'
import { Highlight } from '../../pageComponents/shared/portableText/components'
import { BlockProps } from '../../pageComponents/shared/portableText/Blocks'
import { twMerge } from 'tailwind-merge'

export type HeadingProps = {
  value?: PortableTextBlock[]
  /**
   * If needed to connect with aria-labelledby and such
   */
  id?: string
  noProse?: boolean
  serializerClassnames?: {
    largeText?: string
    normal?: string
    extraLargeText?: string
    twoXLText?: string
  }
} & PortableTextProps &
  TypographyProps &
  BlockProps

type DefaultComponentsProps = {
  serializerClassnames?: {
    largeText?: string
    normal?: string
    extraLargeText?: string
    twoXLText?: string
  }
  className?: string
} & TypographyProps

const defaultComponents = ({
  variant,
  as: providedAs,
  serializerClassnames,
  className,
  id,
}: DefaultComponentsProps) => {
  return {
    block: {
      h1: ({ children }: PortableTextBlock) => {
        return (
          <Typography variant="h1" id={id} className={className}>
            <>{children}</>
          </Typography>
        )
      },
      h2: ({ children }: PortableTextBlock) => {
        console.log('is h2', id)
        return (
          <Typography variant="h2" id={id} className={className}>
            <>{children}</>
          </Typography>
        )
      },
      h3: ({ children }: PortableTextBlock) => {
        return (
          <Typography variant="h3" id={id} className={className}>
            <>{children}</>
          </Typography>
        )
      },
      largeText: ({ children }: PortableTextBlock) => {
        const classNames = serializerClassnames ? serializerClassnames['largeText'] : className
        return (
          <Typography variant="2xl" id={id} as={providedAs} className={classNames}>
            <>{children}</>
          </Typography>
        )
      },
      extraLargeText: ({ children }: PortableTextBlock) => {
        const classNames = serializerClassnames ? serializerClassnames['extraLargeText'] : className
        return (
          <Typography variant="5xl" id={id} as={providedAs} className={classNames}>
            <>{children}</>
          </Typography>
        )
      },
      twoXLText: ({ children }: PortableTextBlock) => {
        const classNames = serializerClassnames ? serializerClassnames['twoXLText'] : className
        return (
          <Typography variant="8xl" id={id} as={providedAs} className={classNames}>
            <>{children}</>
          </Typography>
        )
      },
      //TODO Deprecate together with bigTitle option in text teaser
      extraLarge: ({ children }: PortableTextBlock) => {
        return (
          <Typography variant="5xl" id={id} as={providedAs} className={className}>
            <>{children}</>
          </Typography>
        )
      },
      normal: ({ children }: PortableTextBlock) => {
        const classNames = serializerClassnames ? serializerClassnames['normal'] : className
        if (isEmpty(children)) return null
        return (
          <Typography variant={variant} id={id} as={providedAs} className={classNames}>
            <>{children}</>
          </Typography>
        )
      },
    },
    marks: {
      highlight: Highlight,
      sub: ({ children }: PortableTextBlock) => <sub>{<>{children}</>}</sub>,
      sup: ({ children }: PortableTextBlock) => <sup>{<>{children}</>}</sup>,
      s: ({ children }: PortableTextBlock) => <s>{<>{children}</>}</s>,
    },
  }
}

/**
 * Component to use with portabletext headings
 */
export const Heading = ({
  value,
  blocksComponents = {},
  variant,
  group,
  as,
  className,
  noProse = false,
  proseClassName = '',
  serializerClassnames,
  id,
  ...props
}: HeadingProps) => {
  let div: PortableTextBlock[] = []
  return (
    <>
      {value?.length > 1 ? (
        value?.map((block: PortableTextBlock, i: number, blocks: PortableTextBlock[]) => {
          // Normal text blocks (p, h1, h2, etc.) — these are grouped so we can wrap them in a prose div
          if (block._type === 'block') {
            div.push(block)
            // If the next block is also text/pullQuote, group it with this one
            if (blocks[i + 1]?._type === 'block') return null

            // Otherwise, render the group of text blocks we have
            const value = div
            div = []
            const WrapperTextTag = as ?? (`h2` as React.ElementType)
            const PortableTextTag = `span` as React.ElementType

            return (
              <WrapperTextTag
                key={block._key}
                className={twMerge(
                  `${noProse ? '' : `prose ${proseClassName} dark:prose-invert`} flex flex-col`,
                  className,
                )}
                id={id}
              >
                <PortableText
                  value={value}
                  components={{
                    // eslint-disable-next-line
                    // @ts-ignore
                    block: {
                      ...defaultComponents({ variant, group, as: PortableTextTag, serializerClassnames, className })
                        .block,
                      ...blocksComponents,
                    },
                    // eslint-disable-next-line
                    // @ts-ignore
                    marks: {
                      ...defaultComponents({ variant, group, as: PortableTextTag }).marks,
                    },
                  }}
                />
              </WrapperTextTag>
            )
          }
        })
      ) : (
        <PortableText
          value={value}
          components={{
            // eslint-disable-next-line
            // @ts-ignore
            block: {
              ...defaultComponents({ variant, group, as, serializerClassnames, className, id }).block,
              ...blocksComponents,
            },
            // eslint-disable-next-line
            // @ts-ignore
            marks: {
              ...defaultComponents({ variant, group, as }).marks,
            },
          }}
          {...props}
        />
      )}
    </>
  )
}
