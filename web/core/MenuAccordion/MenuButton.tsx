import { type ButtonHTMLAttributes, forwardRef } from 'react'

export type MenuButtonProps = {
  expanded?: boolean
  title: string
} & ButtonHTMLAttributes<HTMLButtonElement>

export const MenuButton = forwardRef<HTMLButtonElement, MenuButtonProps>(
  function MenuButton({ expanded = false, title, ...rest }, ref) {
    const lineClassName = `block absolute h-[2.5px] w-full bg-slate-80 dark:bg-white-100 group-hover:dark:bg-slate-80 rounded-[3px] l-0 transition-transform duration-[250ms] nth-1:top-2.5 nth-1:origin-[left_center] nth-2:top-[18px] nth-2:origin-[left_center] group-data-open:nth-1:rotate-45 group-data-open:nth-1:top-1 group-data-open:nth-1:left-[5px] group-data-open:nth-2:-rotate-45 group-data-open:nth-2:top-[25px] group-data-open:nth-2:left-[5px]
  `

    return (
      <button
        ref={ref}
        aria-label={title}
        data-state={expanded ? 'open' : 'closed'}
        className={`group focus-visible:envis-outline dark:focus-visible:envis-outline-invert relative m-0 grid min-h-12 min-w-12 cursor-pointer grid-cols-[min-content] items-center justify-center gap-3 rounded-md border-none bg-transparent px-3 py-2 font-normal text-base text-slate-80 leading-[1em] outline-hidden hover:bg-moss-green-60 focus:outline-hidden md:grid-cols-[min-content_1fr] dark:text-white-100 dark:hover:bg-white-100 dark:hover:text-slate-80`}
        {...rest}
      >
        <span className='hidden break-keep leading-[1em] sm:block'>
          {title}
        </span>
        {/* ICON  */}
        <span
          className={`relative h-[30px] w-[30px] overflow-hidden`}
          aria-hidden='true'
        >
          <span className={lineClassName}></span>
          <span className={lineClassName}></span>
        </span>
      </button>
    )
  },
)
