import Image, { getSmallerThanPxLgSizes } from '@core/SanityImage/SanityImage'
import { forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'
import { getColorForTabsTheme } from './tabThemes'

type TabsKeyNumberItemProps = {
  theme?: number
  keyNumber?: string
  unit?: string
  description?: string
  className?: string
  thumbnail?: any
}

const TabsKeyNumberItem = forwardRef<HTMLDivElement, TabsKeyNumberItemProps>(function TabsKeyNumberItem(
  { theme, keyNumber, unit, description, thumbnail, className = '' },
  ref,
) {
  const { cardBackground } = getColorForTabsTheme(theme ?? 0)

  return (
    <div
      ref={ref}
      className={twMerge(
        `w-full
        h-full
        ${cardBackground} 
        flex
        flex-col
        rounded-md
        px-4
        lg:px-6
        py-6`,
        className,
      )}
    >
      {thumbnail && (
        <Image image={thumbnail} aspectRatio="1:1" sizes={getSmallerThanPxLgSizes()} className={`w-12 h-auto mb-3`} />
      )}
      <div className="text-2xl leading-none flex flex-wrap text-balance gap-2 items-baseline">
        {keyNumber}
        <div className="text-base font-medium">{unit ? unit : ''}</div>
      </div>
      {description && <div className="grow text-base pt-8 flex flex-wrap text-balance">{description}</div>}
    </div>
  )
})

export default TabsKeyNumberItem
