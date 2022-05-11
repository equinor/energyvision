import { PortableText, PortableTextProps } from '@portabletext/react'
import { Heading, HeadingProps } from '@components'
import isEmpty from './helpers/isEmpty'

import type { PortableTextBlock } from '@portabletext/types'

type TitleTextProps = PortableTextProps & Pick<HeadingProps, 'level' | 'size'>
type DefaultComponents = Pick<HeadingProps, 'level' | 'size'>

const defaultComponents = ({ size, level }: DefaultComponents) => {
  return {
    block: {
      normal: ({ children }: PortableTextBlock) => {
        if (isEmpty(children)) return null
        return (
          <Heading size={size} level={level}>
            {children}
          </Heading>
        )
      },
    },
  }
}

// To avoid to overdo this, the title text default components support
// size and level. If we need something else, like override the font weight, use a custom component instead
const TitleText = ({ value, components = {}, size = 'xl', level = 'h2', ...props }: TitleTextProps) => {
  return (
    <PortableText
      value={value}
      // eslint-disable-next-line
      // @ts-ignore: Look into the correct way of doing this
      components={{ ...defaultComponents({ size, level }), ...components }}
      {...props}
    />
  )
}

export default TitleText
