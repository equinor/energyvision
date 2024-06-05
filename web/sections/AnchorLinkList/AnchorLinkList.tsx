import { twMerge } from 'tailwind-merge'
import { HTMLAttributes, forwardRef } from 'react'
import { AnchorLinkListData } from '../../types'
import { Typography } from '../../core/Typography'
import { ButtonLink } from '../../core/Link'

export type AnchorLinkListProps = {
  data: AnchorLinkListData
  anchor?: string
  className?: string
} & HTMLAttributes<HTMLElement>

const AnchorLinkList = forwardRef<HTMLElement, AnchorLinkListProps>(function AnchorLinkList(
  { data, anchor, className = '', ...rest },
  ref,
) {
  const { title, anchorList = [], columns } = data

  const getFlow = () => {
    const commonGridStyling = 'grid justify-start'
    switch (columns) {
      case '3':
        return `${commonGridStyling} grid-cols-3`
      case '4':
        return `${commonGridStyling} grid-cols-4`
      case '5':
        return `${commonGridStyling} grid-cols-5`
      case '6':
        return `${commonGridStyling} grid-cols-6`
      default:
      case 'flex':
        return 'flex flex-wrap justify-between'
    }
  }
  return (
    <section
      ref={ref}
      className={twMerge(`px-layout-lg pb-page-content max-w-viewport mx-auto flex flex-col items-center`, className)}
      id={anchor}
      {...rest}
    >
      {title && (
        <Typography variant="h4" as="h2">
          {title}
        </Typography>
      )}
      <ul className={`${getFlow()}  gap-y-8 gap-x-16`}>
        {anchorList?.map((anchorLink) => {
          const anchor = anchorLink?.anchorReference ? `#${anchorLink?.anchorReference}` : ''
          return (
            <li key={`anchor_link_${anchorLink?.id}`}>
              <ButtonLink href={anchor} variant="ghost" className="text-moss-green-100">
                {anchorLink?.title}
              </ButtonLink>
            </li>
          )
        })}
      </ul>
    </section>
  )
})

export default AnchorLinkList
