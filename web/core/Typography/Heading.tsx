'use client'
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
} & PortableTextProps &
  TypographyProps &
  BlockProps

const defaultComponents = ({ variant, as: providedAs, className }: TypographyProps) => {
  return {
    block: {
      h1: ({ children }: PortableTextBlock) => {
        return (
          <Typography variant="h1" className={className}>
            <>{children}</>
          </Typography>
        )
      },
      h2: ({ children }: PortableTextBlock) => {
        return (
          <Typography variant="h2" className={className}>
            <>{children}</>
          </Typography>
        )
      },
      h3: ({ children }: PortableTextBlock) => {
        return (
          <Typography variant="h3" className={className}>
            <>{children}</>
          </Typography>
        )
      },
      largeText: ({ children }: PortableTextBlock) => {
        return (
          <Typography variant="2xl" as={providedAs} className={className}>
            <>{children}</>
          </Typography>
        )
      },
      extraLargeText: ({ children }: PortableTextBlock) => {
        return (
          <Typography variant="5xl" as={providedAs} className={className}>
            <>{children}</>
          </Typography>
        )
      },
      twoXLText: ({ children }: PortableTextBlock) => {
        return (
          <Typography variant="8xl" as={providedAs} className={className}>
            <>{children}</>
          </Typography>
        )
      },
      //TODO Deprecate together with bigTitle option in text teaser
      extraLarge: ({ children }: PortableTextBlock) => {
        return (
          <Typography variant="5xl" as={providedAs} className={className}>
            <>{children}</>
          </Typography>
        )
      },
      normal: ({ children }: PortableTextBlock) => {
        if (isEmpty(children)) return null
        return (
          <Typography variant={variant} as={providedAs} className={className}>
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
  components = {},
  variant,
  group,
  as,
  className,
  proseClassName = '',
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
                className={twMerge(`prose ${proseClassName} dark:prose-invert flex flex-col`, className)}
              >
                <PortableText
                  value={value}
                  // eslint-disable-next-line
                  // @ts-ignore
                  components={{
                    ...defaultComponents({ variant, group, as: PortableTextTag, className }),
                    ...components,
                  }}
                  {...props}
                />
              </WrapperTextTag>
            )
          }
        })
      ) : (
        <PortableText
          value={value}
          // eslint-disable-next-line
          // @ts-ignore
          components={{ ...defaultComponents({ variant, group, as, className }), ...components }}
          {...props}
        />
      )}
    </>
  )
}
