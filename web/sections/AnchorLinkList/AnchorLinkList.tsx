import { forwardRef, type HTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'
import ButtonLink from '@/core/Link/ButtonLink'
import { Typography } from '../../core/Typography'
import type { AnchorLinkReference } from '../../types'

export type AnchorLinkListData = {
  id: string
  type: 'anchorLinkList'
  title?: string
  columns?: string
  anchorList?: AnchorLinkReference[]
}

export type AnchorLinkListProps = {
  data: AnchorLinkListData
  anchor?: string
  className?: string
} & HTMLAttributes<HTMLElement>

const AnchorLinkList = forwardRef<HTMLElement, AnchorLinkListProps>(
  function AnchorLinkList({ data, anchor, className = '', ...rest }, ref) {
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
          return 'grid grid-cols-[repeat(auto-fill, minmax(80px,1fr))] justify-start'
      }
    }
    return (
      <section
        ref={ref}
        className={twMerge(
          `mx-auto flex flex-col items-center px-layout-md pb-page-content`,
          className,
        )}
        id={anchor}
        {...rest}
      >
        <div className='w-full border-moss-green-50 border-y py-6'>
          {title && (
            <Typography variant='h5' as='h2' className='pb-4 text-center'>
              {title}
            </Typography>
          )}
          <ul
            className={`w-full ${getFlow()} gap-x-4 gap-y-2 lg:gap-x-6 lg:gap-y-4`}
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
                    className='flex w-full justify-start'
                  >
                    <ButtonLink
                      variant='ghost'
                      href={anchor}
                      className='w-max text-moss-green-100'
                    >
                      {anchorLink?.title}
                    </ButtonLink>
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
