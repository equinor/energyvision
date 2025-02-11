import { twMerge } from 'tailwind-merge'
import { getColorForTabsTheme } from './tabThemes'
import { forwardRef } from 'react'

type TabsKeyNumberItemProps = {
  theme?: number
  keyNumber?: string
  unit?: string
  description?: string
  className?: string
  /* On mobile flex wraps if 3 or less, else show as scroll */
  'data-dir'?: string
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
        grid
        grid-cols-1
        data-[dir=row]:grid-rows-[max-content_25%_auto]
        items-stretch
        rounded-md
        px-4
        lg:px-6
        py-6`,
        className,
      )}
    >
      <div className="text-2xl leading-none">{keyNumber}</div>
      <div className="text-base">{unit ? unit : ''}</div>
      {description && <div className="pt-2 text-wrap">{description}</div>}
    </div>
  )
})

export default TabsKeyNumberItem
