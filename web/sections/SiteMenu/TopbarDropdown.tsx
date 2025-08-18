import { HTMLAttributes, ReactNode } from 'react'
import envisTwMerge from '../../twMerge'
import getBgClassName from '../../common/helpers/getBackgroundColor'

type Props = {
  variant?: 'light' | 'dark'
  right?: string
  children: ReactNode
} & HTMLAttributes<HTMLDivElement>
export const TopbarDropdown = ({ children, variant = 'light', className = '', ...rest }: Props) => {
  const bgToken = variant === 'dark' ? 'slate-blue-95' : undefined
  const bgColor = getBgClassName(bgToken)

  return (
    <div className={envisTwMerge(`fixed overflow-auto inset-0 ${bgColor}`, className)} {...rest}>
      {children}
    </div>
  )
}
