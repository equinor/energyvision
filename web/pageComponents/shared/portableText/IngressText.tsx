import { PortableTextProps } from '@portabletext/react'
import Blocks from './Blocks'

type IngressTextProps = {
  centered?: boolean
} & PortableTextProps

const IngressText = ({ value, centered = false, components = {}, ...rest }: IngressTextProps) => {
  return (
    <Blocks
      value={value}
      proseClassName="prose-md"
      className={`${centered ? 'text-center' : ''}`}
      components={components}
      {...rest}
    />
  )
}

export default IngressText
