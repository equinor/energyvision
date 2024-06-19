import { twMerge } from 'tailwind-merge'
import { HTMLAttributes, forwardRef } from 'react'
import { AnchorLinkListData } from '../../types'
import { Typography } from '../../core/Typography'
import { BaseLink, ButtonLink, Link } from '../../core/Link'

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
    const commonGridStyling = 'flex flex-wrap justify-stretch lg:grid justify-start'
    switch (columns) {
      case '3':
        return `${commonGridStyling} lg:grid-cols-3`
      case '4':
        return `${commonGridStyling} lg:grid-cols-4`
      case '5':
        return `${commonGridStyling} lg:grid-cols-5`
      case '6':
        return `${commonGridStyling} lg:grid-cols-6`
      default:
      case 'flex':
        return 'flex flex-wrap justify-stretch'
    }
  }
  return (
    <section
      ref={ref}
      className={twMerge(`px-layout-lg pb-page-content max-w-viewport mx-auto flex flex-col`, className)}
      id={anchor}
      {...rest}
    >
      {title && (
        <Typography variant="h3" as="h2" className="pb-8 text-center">
          {title}
        </Typography>
      )}
      <ul className={`${getFlow()}  gap-x-10 gap-y-8 lg:gap-y-10 lg:gap-x-12`}>
        {anchorList?.map((anchorLink) => {
          const anchor = anchorLink?.anchorReference ? `#${anchorLink?.anchorReference}` : ''
          return (
            <li key={`anchor_link_${anchorLink?.id}`} className="flex-fr">
              <Link href={anchor} className="text-moss-green-100 no-underline hover:underline">
                {anchorLink?.title}
              </Link>
            </li>
          )
        })}
      </ul>
    </section>
  )
})

export default AnchorLinkList
