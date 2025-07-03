import { forwardRef } from 'react'
import {
  AccordionHeader,
  AccordionHeaderProps as _AccordionHeaderProps,
  AccordionTrigger,
  AccordionTriggerProps,
} from '@radix-ui/react-accordion'
import { GoPlus, GoDash } from 'react-icons/go'
import { add_circle_filled, add_circle_outlined, remove, remove_outlined } from '@equinor/eds-icons'
import envisTwMerge from '../../twMerge'
import { TransformableIcon } from '../../icons/TransformableIcon'
import { Variants } from './Accordion'
import { Typography } from '@/core/Typography'

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
    border-none
    justify-start
    text-left`,
    menu: `
    relative
    max-xl:aria-current:before:content-['']
    max-xl:aria-current:before:absolute
    max-xl:aria-current:before:top-0
    max-xl:aria-current:before:-left-2
    max-xl:aria-current:before:w-[2px]
    max-xl:aria-current:before:h-full
    py-3
    items-center
    text-base
    border-b-0
    group-last/accordionListItem:border-b
    max-xl:data-open:border-b
    border-t
    border-grey-20
    font-normal 
    leading-none
    xl:px-6
    xl:my-4
    xl:text-sm
    xl:border-t-0
    xl:border-transparent
    xl:border-b-2
    xl:aria-current:border-moss-green-95
    data-open:xl:border-moss-green-95`,
    simpleMenu: `
    py-3
    px-2
    items-center
    text-base
    relative
    dark:hover:text-north-sea-50
    aria-current:before:content-['']
    aria-current:before:absolute
    aria-current:before:top-0
    aria-current:before:-left-2
    aria-current:before:w-[2px]
    aria-current:before:h-full
    aria-current:font-semibold
    aria-current:before:bg-north-sea-50
    font-normal
    leading-none
    max-xl:border-b-0
    max-xl:group-last/accordionListItem:border-b
    max-xl:data-open:border-b
    max-xl:border-t
    max-xl:border-grey-20`,
  }

  const textVariantClassName: Partial<Record<Variants, string>> = {
    primary: 'text-base',
    menu: 'flex justify-start text-lg xl:text-base',
    simpleMenu: 'group-hover:text-north-sea-50 flex justify-start text-lg',
  }

  const defaultIconsElement = (
    <span className={`grid pr-4`}>
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
  )

  const menuIconsElement = (
    <div className={`w-fit mr-2 ${variant === 'menu' ? 'xl:hidden' : ''}`}>
      <GoPlus
        className={`
          text-slate-80
          dark:text-white-100
          group-data-open:hidden
          `}
        size={32}
      />
      <GoDash
        className={`
          text-slate-80
          dark:text-white-100
          hidden
          group-data-open:block
          `}
        size={32}
      />
    </div>
  )

  return (
    <AccordionHeader asChild className={envisTwMerge(`${headerVariantClassName[variant]}`, headerClassName)}>
      <Typography as={hasSectionTitle ? 'h3' : 'h2'}>
        <AccordionTrigger
          ref={ref}
          className={envisTwMerge(
            `group
            w-full
            cursor-pointer
            hover:underline
            decoration-1
            underline-offset-4
            outline-hidden
            focus:outline-hidden
            focus:no-underline
            focus-visible:envis-outline
            dark:focus-visible:envis-outline-invert
            flex
            ${variantClassName[variant]}
          `,
            className,
          )}
          {...rest}
        >
          {variant === 'primary' && defaultIconsElement}
          <Typography
            as="span"
            className={`
              grow
              ${
                variant === 'menu'
                  ? `xl:motion-safe:transition-all
              xl:motion-safe:duration-100 
              xl:motion-safe:ease-in-out`
                  : ''
              } 
                font-normal
                max-xl:group-data-open:font-semibold
               xl:group-data-open:no-underline
              ${textVariantClassName[variant]}`}
          >
            {children}
          </Typography>
          {(variant === 'menu' || variant === 'simpleMenu') && menuIconsElement}
        </AccordionTrigger>
      </Typography>
    </AccordionHeader>
  )
})
