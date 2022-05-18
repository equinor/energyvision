import { PortableText, PortableTextProps } from '@portabletext/react'
import { Heading, HeadingProps } from '@components'
import isEmpty from './helpers/isEmpty'
import { Sub, Sup } from './components'

import type { PortableTextBlock } from '@portabletext/types'

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
          <Heading size={size} level={level} className={className}>
            {children}
          </Heading>
        )
      },
    },
    marks: { sub: Sub, sup: Sup },
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
