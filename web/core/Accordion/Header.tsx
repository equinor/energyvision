import { forwardRef } from 'react'
import {
  AccordionHeader,
  AccordionHeaderProps as _AccordionHeaderProps,
  AccordionTrigger,
  AccordionTriggerProps,
} from '@radix-ui/react-accordion'
import envisTwMerge from '../../twMerge'
import { add_circle_filled, add_circle_outlined, remove, remove_outlined } from '@equinor/eds-icons'
import { TransformableIcon } from '../../icons/TransformableIcon'
import { Variants } from './Accordion'
import { Typography } from '@core/Typography'

export type AccordionHeaderProps = {
  hasSectionTitle?: boolean
  variant?: Variants
  headerClassName?: string
  className?: string
} & _AccordionHeaderProps &
  AccordionTriggerProps

/**
 * Accordion header with trigger element
 * By default this part is rendered as a button, use asChild if you want link.
 * Remember to ensure accessibility and functionality if changing element type
 *
 * @see 🏷️ {@link AccordionHeaderProps}
 */
export const Header = forwardRef<HTMLButtonElement, AccordionHeaderProps>(function Header(
  { variant = 'primary', children, hasSectionTitle = false, className = '', headerClassName = '', ...rest },
  ref,
) {
  const headerVariantClassName: Partial<Record<Variants, string>> = {
    primary: '',
    menu: '',
    simpleMenu: '',
  }
  const variantClassName: Partial<Record<Variants, string>> = {
    primary: ` 
    items-center
    py-4
    xl:pt-5
    xl:pb-4
    border-none`,
    menu: `
    py-3
    px-2
    items-center
    text-base
    aria-current:bg-grey-10
    border-b
    border-grey-20
    aria-current:border-moss-green-95
    font-normal 
    data-open:font-bold
    leading-none
    xl:px-6
    xl:my-4
    xl:text-sm
    xl:border-t-0
    xl:border-transparent
    xl:border-b-2
    data-open:xl:border-moss-green-95
    data-open:xl:font-normal`,
    simpleMenu: `py-3
    px-2
    items-center
    text-base
    aria-current:bg-grey-10
    aria-current:border-moss-green-95
    font-normal 
    data-open:font-bold
    leading-none`,
  }

  const textVariantClassName: Partial<Record<Variants, string>> = {
    primary: 'text-base',
    menu: 'text-base xl:text-sm',
    simpleMenu: 'text-base xl:text-sm',
  }

  return (
    <AccordionHeader asChild className={envisTwMerge(`${headerVariantClassName[variant]}`, headerClassName)}>
      <Typography as={hasSectionTitle ? 'h3' : 'h2'}>
        <AccordionTrigger
          ref={ref}
          className={envisTwMerge(
            `group
            w-full
            bg-transparent
            cursor-pointer
            hover:underline
            underline-offset-2
            outline-none
            focus:outline-none
            focus-visible:envis-outline
            dark:focus-visible:envis-outline-invert
            flex
            justify-start
          ${variantClassName[variant]}
          `,
            className,
          )}
          {...rest}
        >
          <span className={`grid pr-4 ${variant === 'menu' ? 'xl:hidden' : ''}`}>
            <TransformableIcon
              className={`fill-slate-80
                  dark:fill-white-100
                  opacity-100
                  group-hover:opacity-0
                  group-data-open:opacity-0
                  transition-opacity
                  col-span-full
                  row-span-full`}
              size={24}
              iconData={add_circle_outlined}
            />
            <TransformableIcon
              className={`fill-slate-80
                  dark:fill-white-100
                  opacity-0
                  group-hover:opacity-100
                  group-data-open:opacity-0
                  transition-opacity
                  col-span-full
                  row-span-full`}
              size={24}
              iconData={add_circle_filled}
            />
            <TransformableIcon
              className={`fill-slate-80
                  dark:fill-white-100
                  opacity-0
                  group-data-open:opacity-100
                  group-data-open:group-hover:opacity-0
                  transition-opacity
                  col-span-full
                  row-span-full`}
              size={24}
              iconData={remove_outlined}
            />
            <TransformableIcon
              className={`fill-slate-80
                  dark:fill-white-100
                  opacity-0
                  group-data-open:opacity-0
                  group-data-open:group-hover:opacity-100
                  transition-opacity
                  col-span-full
                  row-span-full`}
              size={24}
              iconData={remove}
            />
          </span>
          <Typography
            as="span"
            className={`
              motion-safe:transition-all
              motion-safe:duration-100 
              motion-safe:ease-in-out
              font-normal
              group-data-open:font-semibold
              ${textVariantClassName[variant]}`}
          >
            {children}
          </Typography>
        </AccordionTrigger>
      </Typography>
    </AccordionHeader>
  )
})
