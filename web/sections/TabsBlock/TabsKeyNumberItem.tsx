import { twMerge } from 'tailwind-merge'
import { getColorForTabsTheme } from './tabThemes'
import { forwardRef } from 'react'

type TabsKeyNumberItemProps = {
  theme?: number
  keyNumber?: string
  unit?: string
  description?: string
  className?: string
}

const TabsKeyNumberItem = forwardRef<HTMLDivElement, TabsKeyNumberItemProps>(function TabsKeyNumberItem(
  { theme, keyNumber, unit, description, className = '' },
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
      <div className="text-2xl leading-none flex flex-wrap text-balance gap-2 items-baseline">
        {keyNumber}
        <div className="text-base font-medium">{unit ? unit : ''}</div>
      </div>
      {description && <div className="grow text-base pt-8 flex flex-wrap text-balance">{description}</div>}
    </div>
  )
})

export default TabsKeyNumberItem
