import { forwardRef, type HTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'
import BaseLink from '@/core/Link/BaseLink'
import { getLayoutPx } from '@/lib/helpers/getCommonUtilities'
import { Typography } from '../../core/Typography'
import type { AnchorLinkReference, LayoutGrid } from '../../types'

export type AnchorLinkListData = {
  id: string
  type: 'anchorLinkList'
  title?: string
  columns?: string
  hideTitle?: boolean
  layoutGrid?: LayoutGrid
  makeSticky?: boolean
  anchorList?: AnchorLinkReference[]
}

export type AnchorLinkListProps = {
  data: AnchorLinkListData
  anchor?: string
  className?: string
} & HTMLAttributes<HTMLElement>

const AnchorLinkList = forwardRef<HTMLElement, AnchorLinkListProps>(
  function AnchorLinkList({ data, anchor, className = '' }, ref) {
    const { title, anchorList = [], columns, layoutGrid, hideTitle } = data

    const getFlow = () => {
      const commonGridStyling = 'flex flex-wrap lg:grid'
      //lg:place-items-center to be discussed

      const gridColsVariant = {
        lg: `lg:grid-cols-[repeat(auto-fit,_minmax(100px,_1fr))]`,
        md: `lg:grid-cols-[repeat(auto-fit,_minmax(150px,_1fr))]`,
        sm: `lg:grid-cols-[repeat(auto-fit,_minmax(200px,_1fr))]`,
      }

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
          return `flex flex-wrap lg:grid ${gridColsVariant[layoutGrid ?? 'lg']}`
      }
    }

    //discuss md or lg as fallback
    //title align with rest of text headings or width the achor link list

    const px = getLayoutPx(layoutGrid ?? 'lg')

    return (
      <section
        ref={ref}
        className={twMerge(`py-6 lg:pt-6 lg:pb-12`, className)}
        id={anchor}
      >
        <div className='mx-auto w-full max-w-content border-moss-green-50 border-y py-6'>
          <div className={twMerge(`flex flex-col items-start ${px}`)}>
            {title && (
              <Typography
                variant='h5'
                as='h2'
                className={`${hideTitle ? 'sr-only' : 'pb-4'} `}
              >
                {title}
              </Typography>
            )}
            <ul
              className={twMerge(
                `w-full gap-x-4 gap-y-2 lg:gap-x-6 lg:gap-y-4`,
                getFlow(),
              )}
            >
              {anchorList?.map(
                (anchorLink: {
                  id: string
                  title?: string
                  anchorReference?: string
                }) => {
                  const anchor = anchorLink?.anchorReference
                    ? `#${anchorLink?.anchorReference}`
                    : ''
                  return (
                    <li
                      key={`anchor_link_${anchorLink?.id}`}
                      className='flex w-fill justify-start'
                    >
                      <BaseLink
                        href={anchor}
                        className='group flex w-fill items-center justify-center gap-1 whitespace-nowrap text-base text-moss-green-100 hover:underline'
                      >
                        {anchorLink?.title}
                      </BaseLink>
                    </li>
                  )
                },
              )}
            </ul>
          </div>
        </div>
      </section>
    )
  },
)

export default AnchorLinkList
