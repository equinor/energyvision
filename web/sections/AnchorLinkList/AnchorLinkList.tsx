import { forwardRef, type HTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'
import { getLayoutPx } from '@/lib/helpers/getCommonUtilities'
import { Typography } from '../../core/Typography'
import type { AnchorLinkReference } from '../../types'

export type AnchorLinkListData = {
  id: string
  type: 'anchorLinkList'
  title?: string
  columns?: string
  hideTitle?: boolean
  layoutGrid?: 'sm' | 'md' | 'lg'
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
      const commonGridStyling = 'grid lg:place-items-center grid-cols-3'

      const pxVariant = {
        lg: `grid-cols-[repeat(auto-fit,_minmax(100px,_1fr))]`,
        md: `grid-cols-[repeat(auto-fit,_minmax(150px,_1fr))]`,
        sm: `grid-cols-[repeat(auto-fit,_minmax(200px,_1fr))]`,
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
          return `grid ${pxVariant[layoutGrid ?? 'lg']} place-content-center`
      }
    }

    const px = getLayoutPx(layoutGrid ?? 'lg')

    return (
      <section
        ref={ref}
        className={twMerge(
          `flex flex-col items-center ${px} pb-page-content`,
          className,
        )}
        id={anchor}
      >
        <div className='w-full border-moss-green-50 border-y py-6'>
          {title && (
            <Typography
              variant='h5'
              as='h2'
              className={`${hideTitle ? 'sr-only' : 'pb-4 text-center'} `}
            >
              {title}
            </Typography>
          )}
          <ul className={`${getFlow()} gap-x-4 gap-y-2 lg:gap-x-6 lg:gap-y-4`}>
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
                    <a
                      href={anchor}
                      className='group flex w-fill items-center justify-center gap-1 whitespace-nowrap text-base text-moss-green-100 hover:underline'
                    >
                      {anchorLink?.title}
                    </a>
                  </li>
                )
              },
            )}
          </ul>
        </div>
      </section>
    )
  },
)

export default AnchorLinkList
