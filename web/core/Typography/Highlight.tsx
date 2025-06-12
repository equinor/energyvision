/**
 * Highlight color works based on the data-highlight attribute
 * Tailwind css variant `highlight:` selects all child elements
 * with data-highlight attribute.
 *
 * When you add `highlight:!text-energy-red-100` to the parent element
 * child elements with Hightlight get the color. Do not forget important
 *
 * If the parent has no `hightlight:` classname then default color is applied
 * @returns
 */

import { twMerge } from 'tailwind-merge'

export const Highlight = ({ children, className = '' }: { children?: React.ReactNode; className?: string }) => {
  return (
    <span data-highlight className={twMerge('text-energy-red-100 dark:text-spruce-wood-100', className)}>
      {children}
    </span>
  )
}
