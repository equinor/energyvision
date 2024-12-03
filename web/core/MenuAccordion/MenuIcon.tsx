import envisTwMerge from '../../twMerge'

export const MenuIcon = (className = '') => {
  const lineClassName = `
  block
  absolute
  h-[2px]
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
  group-data-open:group-hover:nth-1:top-[9px]
  group-data-open:group-hover:nth-2:top-[21px]
  `
  return (
    <span
      className={envisTwMerge(
        `
    relative
    overflow-auto
    hidden 
    group-data-open:block 
    w-[30px]
    h-[30px]
  `,
        className,
      )}
      aria-hidden="true"
    >
      <span className={lineClassName}></span>
      <span className={lineClassName}></span>
    </span>
  )
}
