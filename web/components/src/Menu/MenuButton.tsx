import { forwardRef, HTMLAttributes } from 'react'

export type MenuButtonProps = HTMLAttributes<HTMLButtonElement> & {
  /** Do we want to make it explicit like this? Or just aria-expanded from button */
  ariaExpanded: boolean
}

export const MenuButton = forwardRef<HTMLButtonElement, MenuButtonProps>(function MenuButton(
  { ariaExpanded, ...rest },
  ref,
) {
  return (
    <button aria-expanded={ariaExpanded} ref={ref} {...rest}>
      Hamburger
    </button>
  )
})
