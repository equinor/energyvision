import { PortableTextProps } from '@portabletext/react'
import Blocks from './Blocks'

type IngressTextProps = {
  centered?: boolean
} & PortableTextProps &
  Pick<React.HTMLAttributes<HTMLElement>, 'className'>

const IngressText = ({ value, centered = false, components = {}, className, ...rest }: IngressTextProps) => {
  return (
    <Blocks
      value={value}
      proseClassName="prose-md"
      className={`${className} ${centered ? 'text-center' : ''}`}
      components={components}
      {...rest}
    />
  )
}

export default IngressText
