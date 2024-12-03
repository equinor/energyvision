import { forwardRef, ButtonHTMLAttributes } from 'react'
import { MenuIcon } from './MenuIcon'

export type MenuButtonProps = {
  expanded?: boolean
  title: string
} & ButtonHTMLAttributes<HTMLButtonElement>

export const MenuButton = forwardRef<HTMLButtonElement, MenuButtonProps>(function MenuButton(
  { expanded = false, title, ...rest },
  ref,
) {
  return (
    <button
      ref={ref}
      aria-label={title}
      data-open={expanded}
      className={`
        group
        min-w-12
        min-h-12
        relative
        grid
        grid-cols-[min-content]
        items-center
        justify-center
        gap-3
        m-0
        cursor-pointer
        bg-transparent
        border-none
        outline-none
        text-slate-80
        text-base
        font-medium
        leading-[1em]
        md:grid-cols-[min-content_1fr]
        hover:bg-moss-green-60
        rounded-md
        py-2 
        px-3 
        focus:outline-none
        focus-visible:envis-outline`}
      {...rest}
    >
      <span className="leading-[1em] hidden break-keep sm:block">{title}</span>
      <MenuIcon />
    </button>
  )
})
