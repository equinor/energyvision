import { FactImagePosition } from '@components'
import { twMerge } from 'tailwind-merge'

type ContentProps = {
  hasImage?: boolean
  dynamicHeight?: boolean
  className?: string
  hasColumns?: boolean
  hasBgColor?: boolean
  imagePosition?: FactImagePosition
} & React.HTMLAttributes<HTMLDivElement>

export const Content = ({
  hasImage = false,
  hasColumns = false,
  hasBgColor = false,
  imagePosition = 'left',
  dynamicHeight = false,
  children,
  className = '',
  ...rest
}: ContentProps) => {
  const contentClassNames = `
  ${!hasColumns && !hasImage ? 'px-layout-lg max-w-viewport mx-auto' : ''}
  ${hasColumns && !hasImage ? 'px-layout-sm' : ''}
  ${
    hasImage
      ? `${imagePosition === 'right' ? `lg:col-start-1 lg:row-start-1 pl-layout-sm pr-24` : 'pr-layout-sm pl-24'}`
      : ''
  }
  ${hasBgColor ? `${hasImage ? 'pt-12 pb-24 lg:py-24' : 'py-24'}` : 'pt-0 pb-24'}
  `

  return (
    <div className={twMerge(contentClassNames, className)} {...rest}>
      {children}
    </div>
  )
}
