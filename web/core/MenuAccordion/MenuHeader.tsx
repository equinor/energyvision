import { forwardRef } from 'react'
import {
  AccordionHeader,
  AccordionHeaderProps,
  AccordionTrigger,
  AccordionTriggerProps,
} from '@radix-ui/react-accordion'
import envisTwMerge from '../../twMerge'
import { BaseLink } from '@core/Link'

export type MenuHeaderProps = {
  topLevelLink: any
  topLevelLabel: string
} & AccordionTriggerProps &
  AccordionHeaderProps

export const MenuHeader = forwardRef<HTMLDivElement, MenuHeaderProps>(function MenuHeader(
  { topLevelLink, topLevelLabel, className = '' },
  ref,
) {
  return (
    <AccordionHeader
      className={`group
          flex
          items-center
          justify-between
          w-full
          bg-transparent
          py-md
          cursor-pointer
          text-default-text
          outline-none
          focus-visible:envis-outline
          xl:border-b-2
          xl:border-transparent
          xl:hover:bg-moss-green-70
          xl:py-sm
          xl:px-xs+sm
          data-open:xl:border-b
          data-open:xl:border-moss-green-95
          aria-current:xl:border-moss-green-95
          font-normal 
          data-open:font-bold 
          data-open:xl:font-normal
          `}
      ref={ref}
      asChild
    >
      <AccordionTrigger
        className={envisTwMerge(
          `group
          `,
          className,
        )}
        asChild
      >
        <BaseLink href={topLevelLink} role="button" tabIndex={0}>
          {topLevelLabel}
        </BaseLink>
      </AccordionTrigger>
    </AccordionHeader>
  )
})
