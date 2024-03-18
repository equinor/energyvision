import { PortableText, PortableTextProps } from '@portabletext/react'
import type { PortableTextBlock } from '@portabletext/types'
import { Typography, TypographyProps } from './Typography'
import isEmpty from '../../pageComponents/shared/portableText/helpers/isEmpty'
import { Highlight } from '../../pageComponents/shared/portableText/components'

export type HeadingProps = PortableTextProps & TypographyProps

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
export const Heading = ({ value, components = {}, variant, group, as, className, ...props }: HeadingProps) => {
  return (
    <PortableText
      value={value}
      // eslint-disable-next-line
      // @ts-ignore
      components={{ ...defaultComponents({ variant, group, as, className }), ...components }}
      {...props}
    />
  )
}
