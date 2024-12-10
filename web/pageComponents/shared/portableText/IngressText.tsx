import Blocks, { BlockProps } from './Blocks'
import { twMerge } from 'tailwind-merge'

type IngressTextProps = {
  centered?: boolean
  className?: string
  includeFootnotes?: boolean
  /** Use to clamp lines on number */
  clampLines?: number
} & BlockProps

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
