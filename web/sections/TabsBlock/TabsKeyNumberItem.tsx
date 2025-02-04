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
    <div ref={ref} className={twMerge(`w-full h-full ${cardBackground} rounded-md px-4 lg:px-6 py-4`, className)}>
      <div className="flex gap-x-2 gap-y-1 items-baseline text-pretty">
        <div className="font-semibold text-lg lg:text-2xl">{keyNumber}</div>
        {unit && <div className=" text-md lg:text-lg">{unit}</div>}
      </div>
      {description && <div className="pt-2 text-pretty">{description}</div>}
    </div>
  )
})

export default TabsKeyNumberItem
