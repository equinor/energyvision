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
    const commonGridStyling = 'grid lg:place-items-start grid-cols-3'
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
        return 'grid auto-fill-fr justify-start'
    }
  }
  return (
    <section
      ref={ref}
      className={twMerge(`px-layout-md pb-page-content max-w-viewport mx-auto flex flex-col items-center`, className)}
      id={anchor}
      {...rest}
    >
      <div className="w-full border-y border-moss-green-50 py-6">
        {title && (
          <Typography variant="h5" as="h2" className="pb-4 text-center">
            {title}
          </Typography>
        )}
        <ul className={`w-full ${getFlow()} gap-x-4 gap-y-2 lg:gap-y-4 lg:gap-x-6`}>
          {anchorList?.map((anchorLink: { id: string; title?: string; anchorReference?: string }) => {
            const anchor = anchorLink?.anchorReference ? `#${anchorLink?.anchorReference}` : ''
            return (
              <li key={`anchor_link_${anchorLink?.id}`} className="w-full flex justify-center">
                <ButtonLink variant="ghost" href={anchor} className="w-max text-moss-green-100">
                  {anchorLink?.title}
                </ButtonLink>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
})

export default AnchorLinkList
