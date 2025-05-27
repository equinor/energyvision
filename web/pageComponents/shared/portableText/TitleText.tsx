import { HTMLAttributes } from 'react'
import { PortableText, PortableTextProps } from '@portabletext/react'
import isEmpty from './helpers/isEmpty'
import { Sub, Sup, Strikethrough } from './components'
import { Highlight } from '@core/Typography/Highlight'
import type { PortableTextBlock } from '@portabletext/types'
import { Typography } from '@core/Typography'

type HeadingProps = {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl'
  level?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  regular?: boolean
  center?: boolean
  uppercase?: boolean
} & HTMLAttributes<HTMLHeadingElement>

type TitleTextProps = PortableTextProps &
  Pick<HeadingProps, 'level' | 'size'> &
  Pick<React.HTMLAttributes<HTMLHeadingElement>, 'className'>
type DefaultComponents = Pick<HeadingProps, 'level' | 'size'> &
  Pick<React.HTMLAttributes<HTMLHeadingElement>, 'className'>

const defaultComponents = ({ size, level, className }: DefaultComponents) => {
  return {
    block: {
      normal: ({ children }: PortableTextBlock) => {
        if (isEmpty(children)) return null
        return (
          <Typography as={level} variant={size} className={className}>
            <>{children}</>
          </Typography>
        )
      },
      extraLarge: ({ children }: PortableTextBlock) => {
        return (
          <Typography as={'h1'} variant={size} className={className}>
            <>{children}</>
          </Typography>
        )
      },
    },
    marks: { sub: Sub, sup: Sup, s: Strikethrough, highlight: Highlight },
  }
}

// To avoid to overdo this, the title text default components support
// size and level. If we need something else, like override the font weight, use a custom component instead
const TitleText = ({ value, components = {}, size = 'xl', level = 'h2', className, ...props }: TitleTextProps) => {
  return (
    <PortableText
      value={value}
      // eslint-disable-next-line
      // @ts-ignore: Look into the correct way of doing this
      components={{ ...defaultComponents({ size, level, className }), ...components }}
      {...props}
    />
  )
}

export default TitleText
