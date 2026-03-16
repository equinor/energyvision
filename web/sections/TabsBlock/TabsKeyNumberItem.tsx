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
      className={twMerge(`h-full w-full ${cardBackground} flex flex-col rounded-md px-4 py-6 lg:px-6`, className)}
    >
      {thumbnail && (
        <Image image={thumbnail} aspectRatio="1:1" sizes={getSmallerThanPxLgSizes()} className={`mb-4 h-auto w-12`} />
      )}
      <div className="flex flex-wrap items-baseline gap-2 text-balance text-2xl leading-none">
        {keyNumber}
        <div className="font-medium text-base">{unit ? unit : ''}</div>
      </div>
      {description && <div className="flex grow flex-wrap text-balance pt-8 text-base">{description}</div>}
    </div>
  )
})

export default TabsKeyNumberItem
