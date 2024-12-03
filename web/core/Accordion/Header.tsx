import { forwardRef } from 'react'
import {
  AccordionHeader,
  AccordionHeaderProps as _AccordionHeaderProps,
  AccordionTrigger,
  AccordionTriggerProps,
} from '@radix-ui/react-accordion'
import envisTwMerge from '../../twMerge'
import { add_circle_filled, add_circle_outlined, chevron_down, remove, remove_outlined } from '@equinor/eds-icons'
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
    secondary: '',
    plain: '',
  }
  const variantClassName: Partial<Record<Variants, string>> = {
    primary: `flex 
      items-center
      w-full
      bg-transparent
      sm:py-6
      border-none
      cursor-pointer
      focus-visible:envis-outline
      dark:focus-visible:envis-outline-invert`,
    secondary: 'group/trigger w-full flex justify-between border-b py-3 border-moss-green-90',
    plain: '',
  }
  const iconVariantClassName: Partial<Record<Variants, string>> = {
    primary: '',
    secondary: 'rotate-180 group-data-closed/trigger:rotate-0',
    plain: '',
  }

  const getVariantBody = () => {
    switch (variant) {
      case 'secondary':
        return (
          <>
            {children}
            <TransformableIcon className={iconVariantClassName[variant]} iconData={chevron_down} />
          </>
        )
      case 'primary':
        return (
          <>
            <span className="grid pr-4">
              <TransformableIcon
                className={`fill-energy-red-100 
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
                className={`fill-energy-red-100 
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
                className={`fill-energy-red-100 
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
                className={`fill-energy-red-100 
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
              group-data-open:font-bold
              pt-2
              leading-earthy`}
            >
              {children}
            </Typography>
          </>
        )
      default:
        return <>{children}</>
    }
  }

  return (
    <AccordionHeader asChild className={envisTwMerge(`${headerVariantClassName[variant]}`, headerClassName)}>
      <Typography as={hasSectionTitle ? 'h3' : 'h2'}>
        <AccordionTrigger
          ref={ref}
          className={envisTwMerge(
            `group
          ${variantClassName[variant]}
          `,
            className,
          )}
          {...rest}
        >
          {getVariantBody()}
        </AccordionTrigger>
      </Typography>
    </AccordionHeader>
  )
})
