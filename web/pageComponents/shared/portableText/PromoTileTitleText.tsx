import { PortableText, PortableTextProps } from '@portabletext/react'
import isEmpty from './helpers/isEmpty'
import { Sub, Sup, Strikethrough } from './components'

import type { PortableTextBlock } from '@portabletext/types'
import { Card } from '@components'

type PromoTileTitleTextProps = PortableTextProps &
  Pick<React.HTMLAttributes<HTMLElement>, 'className'> &
  Pick<React.HTMLAttributes<HTMLHeadingElement>, 'style'>

type DefaultComponents = Pick<React.HTMLAttributes<HTMLHeadingElement>, 'className' | 'style'>

const defaultComponents = ({ className, style }: DefaultComponents) => {
  return {
    block: {
      normal: ({ children }: PortableTextBlock) => {
        if (isEmpty(children)) return null
        return (
          <Card.Title level="h3" className={className} style={style}>
            <>{children}</>
          </Card.Title>
        )
      },
    },
    marks: { sub: Sub, sup: Sup, s: Strikethrough },
  }
}

const PromotileTitleText = ({ value, components = {}, className, style, ...props }: PromoTileTitleTextProps) => {
  return (
    <PortableText
      value={value}
      // eslint-disable-next-line
      // @ts-ignore: Look into the correct way of doing this
      components={{ ...defaultComponents({ className, style }), ...components }}
      style={style}
      {...props}
    />
  )
}

export default PromotileTitleText
