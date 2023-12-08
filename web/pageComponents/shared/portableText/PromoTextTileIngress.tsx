import { PortableText, PortableTextProps, PortableTextReactComponents } from '@portabletext/react'
import isEmpty from './helpers/isEmpty'
import { Sub, Sup, Strikethrough } from './components'

import type { PortableTextBlock } from '@portabletext/types'

import { Text } from '@components'

const defaultComponents = (centered: boolean) => {
  return {
    block: {
      normal: ({ children }: PortableTextBlock) => {
        if (isEmpty(children)) return null
        return (
          <Text size="ml" centered={centered} style={{ margin: 0 }}>
            <>{children}</>
          </Text>
        )
      },
    },
    marks: { sub: Sub, sup: Sup, s: Strikethrough },
  }
}

type IngressTextProps = {
  centered?: boolean
} & PortableTextProps

const PromotileTitleText = ({ value, components = {}, centered = false, ...props }: IngressTextProps) => {
  return (
    <PortableText
      value={value}
      components={{ ...defaultComponents(centered), ...components } as PortableTextReactComponents}
      {...props}
    />
  )
}

export default PromotileTitleText
