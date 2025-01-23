import { forwardRef, ButtonHTMLAttributes } from 'react'

export type MenuButtonProps = {
  expanded?: boolean
  title: string
} & ButtonHTMLAttributes<HTMLButtonElement>

export const MenuButton = forwardRef<HTMLButtonElement, MenuButtonProps>(function MenuButton(
  { expanded = false, title, ...rest },
  ref,
) {
  const lineClassName = `
  block
  absolute
  h-[2.5px]
  w-full
  bg-slate-80
  rounded-[3px]
  l-0
  transition-all duration-[250ms]
  nth-1:top-2.5
  nth-1:origin-[left_center]
  nth-2:top-[18px]
  nth-2:origin-[left_center]
  group-data-open:nth-1:rotate-45
  group-data-open:nth-1:top-1
  group-data-open:nth-1:left-[5px]
  group-data-open:nth-2:-rotate-45
  group-data-open:nth-2:top-[25px]
  group-data-open:nth-2:left-[5px]
  `

  return (
    <button
      ref={ref}
      aria-label={title}
      data-state={expanded ? 'open' : 'closed'}
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
        font-normal
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
      {/* ICON  */}
      <span
        className={`relative
        overflow-hidden
        w-[30px]
        h-[30px]
        `}
        aria-hidden="true"
      >
        <span className={lineClassName}></span>
        <span className={lineClassName}></span>
      </span>
    </button>
  )
})
