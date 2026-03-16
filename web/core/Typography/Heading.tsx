/* eslint-disable @typescript-eslint/ban-ts-comment */

import { Highlight } from '@core/Typography/Highlight'
import { PortableText, type PortableTextProps } from '@portabletext/react'
import type { PortableTextBlock } from '@portabletext/types'
import { twMerge } from 'tailwind-merge'
import type { BlockProps } from '../../pageComponents/shared/portableText/Blocks'
import isEmpty from '../../pageComponents/shared/portableText/helpers/isEmpty'
import { Typography, type TypographyProps } from './Typography'

type DefaultComponentsProps = {
  serializerClassnames?: {
    largeText?: string
    normal?: string
    extraLargeText?: string
    twoXLText?: string
  }
  className?: string
  useDisplay?: boolean
} & TypographyProps

const defaultComponents = ({
  variant,
  as: providedAs,
  serializerClassnames,
  className,
  id,
  useDisplay = false,
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
      displayText: ({ children }: PortableTextBlock) => {
        return (
          <Typography group="display" variant="h2_base" id={id} as={providedAs}>
            <>{children}</>
          </Typography>
        )
      },
      largeText: ({ children }: PortableTextBlock) => {
        const classNames = serializerClassnames ? serializerClassnames['largeText'] : className

        return (
          <Typography
            group={useDisplay ? 'display' : 'heading'}
            variant={useDisplay ? 'h2_lg' : '2xl'}
            id={id}
            as={providedAs}
            className={classNames}
          >
            <>{children}</>
          </Typography>
        )
      },
      extraLargeText: ({ children }: PortableTextBlock) => {
        const classNames = serializerClassnames ? serializerClassnames['extraLargeText'] : className
        return (
          <Typography group="display" variant="h2_xl" id={id} as={providedAs} className={classNames}>
            <>{children}</>
          </Typography>
        )
      },
      twoXLText: ({ children }: PortableTextBlock) => {
        const classNames = serializerClassnames ? serializerClassnames['twoXLText'] : className
        return (
          <Typography group="display" variant="h1_xl" id={id} as={providedAs} className={classNames}>
            <>{children}</>
          </Typography>
        )
      },
      //TODO Deprecate together with bigTitle option in text teaser
      extraLarge: ({ children }: PortableTextBlock) => {
        return (
          <Typography group="display" variant="h1_lg" id={id} as={providedAs} className={className}>
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
  useDisplay?: boolean
} & PortableTextProps &
  TypographyProps &
  BlockProps

/**
 * Component to use with portabletext headings
 */
export const Heading = ({
  value,
  blocksComponents,
  variant,
  group,
  as,
  className,
  noProse = false,
  proseClassName = '',
  serializerClassnames,
  id,
  useDisplay = false,
  ...props
}: HeadingProps) => {
  let serializers = {
    // eslint-disable-next-line
    // @ts-ignore
    block: {
      ...defaultComponents({
        variant,
        as,
        serializerClassnames,
        className,
        id,
        useDisplay,
      }).block,
      ...(blocksComponents && blocksComponents),
    },
    // eslint-disable-next-line
    // @ts-ignore
    marks: {
      ...defaultComponents({ variant, group, as }).marks,
    },
  }

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

            serializers = {
              // eslint-disable-next-line
              // @ts-ignore
              block: {
                ...defaultComponents({
                  variant,
                  as: PortableTextTag,
                  serializerClassnames,
                  className,
                  id,
                  useDisplay,
                }).block,
                ...(blocksComponents && blocksComponents),
              },
              // eslint-disable-next-line
              //@ts-ignore
              marks: {
                ...defaultComponents({ variant, group, as: PortableTextTag }).marks,
              },
            }

            return (
              <WrapperTextTag
                key={block._key}
                className={twMerge(
                  `${noProse ? '' : `prose ${proseClassName} dark:prose-invert`} flex flex-col`,
                  className,
                )}
                id={id}
              >
                {/*@ts-ignore */}
                <PortableText value={value} components={serializers} />
              </WrapperTextTag>
            )
          }
        })
      ) : (
        <PortableText
          {...props}
          value={value}
          /*@ts-expect-error */
          components={serializers}
        />
      )}
    </>
  )
}
