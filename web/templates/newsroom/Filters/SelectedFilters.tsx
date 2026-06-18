'use client'
import { TransformableIcon } from '../../../icons/TransformableIcon'
import { forwardRef, HTMLAttributes } from 'react'
import { useClearRefinements, useCurrentRefinements, UseRefinementListProps } from 'react-instantsearch'
import { close_circle_outlined, close } from '@equinor/eds-icons'
import { Typography } from '@/core/Typography'
import { isModifierClick } from '@/sections/searchBlocks/pagination/PaginationItem'
import { useTranslations } from 'next-intl'
import { twMerge } from 'tailwind-merge'

type SelectedFiltersProps = HTMLAttributes<HTMLDivElement>

export type RefinementListProps = {
  filterName: string
} & React.ComponentProps<'div'> &
  UseRefinementListProps

const SelectedFilters = forwardRef<HTMLDivElement, SelectedFiltersProps>(function SelectedFilters(
  { className = '' },
  ref,
) {
  const { items, refine } = useCurrentRefinements()
  const { refine: clearRefinements } = useClearRefinements()
  const t = useTranslations()

  const flattenedItems = items.flatMap((item) => {
    return item.refinements
  })

  return items?.length > 0 ? (
    <div ref={ref} className={twMerge('flex flex-col gap-2 border border-norwegian-woods-100 p-4', className)}>
      <div className="flex justify-between">
        <Typography as="h2" variant="h6" className="">
          Selected filters
        </Typography>
        <button
          type="button"
          onClick={clearRefinements}
          className="focus-visible:envis-outline flex gap-1 text-xs underline hover:no-underline focus:outline-hidden active:scale-99"
        >
          <TransformableIcon iconData={close} className="size-6" />
          {t('newsroom_filters_clear_all')}
        </button>
      </div>
      <ul className="flex flex-wrap gap-4">
        {flattenedItems.map((item) => (
          <li key={item.label} className="">
            <button
              type="button"
              onClick={(event) => {
                if (isModifierClick(event)) {
                  return
                }
                refine(item)
              }}
              className={`group focus-visible:envis-outline flex w-fit items-center gap-4 rounded-full bg-moss-green-50 py-1 pr-3 pl-4 text-slate-80 hover:bg-moss-green-60 focus:outline-hidden active:scale-99`}
            >
              <span className="sr-only">{t('remove')}</span>
              <span>{item.label}</span>
              <TransformableIcon
                aria-label="Remove filter icon"
                className="size-7 text-norwegian-woods-100"
                iconData={close_circle_outlined}
              />
            </button>
          </li>
        ))}
      </ul>
    </div>
  ) : null
})

export default SelectedFilters
