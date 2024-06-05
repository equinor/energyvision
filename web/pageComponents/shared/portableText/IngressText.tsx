import { PortableTextProps } from '@portabletext/react'
import Blocks from './Blocks'
import { twMerge } from 'tailwind-merge'

type IngressTextProps = {
  centered?: boolean
  className?: string
  includeFootnotes?: boolean
} & PortableTextProps

const IngressText = ({ value, centered = false, components = {}, className = '', ...rest }: IngressTextProps) => {
  return (
    <Blocks
      value={value}
      proseClassName="prose-md"
      className={twMerge(`${centered ? 'text-center' : ''}`, className)}
      components={components}
      {...rest}
    />
  )
}

export default IngressText
