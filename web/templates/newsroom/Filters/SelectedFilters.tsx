import { TransformableIcon } from '../../../icons/TransformableIcon'
import { isModifierClick } from '../../../pageComponents/shared/search/simplePagination/PaginationItem'
import { forwardRef, HTMLAttributes } from 'react'
import { useClearRefinements, useCurrentRefinements, UseRefinementListProps } from 'react-instantsearch'
import { close_circle_outlined, close } from '@equinor/eds-icons'
import { Typography } from '@core/Typography'
import { FormattedMessage } from 'react-intl'
import envisTwMerge from '../../../twMerge'

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

  const flattenedItems = items.flatMap((item) => {
    return item.refinements
  })

  return items?.length > 0 ? (
    <div ref={ref} className={envisTwMerge('border border-norwegian-woods-100 p-4 flex flex-col gap-2', className)}>
      <div className="flex justify-between">
        <Typography as="h2" variant="h6" className="">
          Selected filters
        </Typography>
        <button
          type="button"
          onClick={clearRefinements}
          className="flex gap-1 text-xs underline hover:no-underline focus:outline-none focus-visible:envis-outline active:scale-99"
        >
          <TransformableIcon iconData={close} className="size-6" />
          <FormattedMessage id="newsroom_filters_clear_all" defaultMessage="Clear all" />
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
              className={`group
              w-fit 
              py-1 
              pl-4
              pr-3 
              bg-moss-green-50
              hover:bg-moss-green-60
              text-slate-80 
              rounded-full 
              flex 
              items-center gap-4
              focus:outline-none
              focus-visible:envis-outline
              active:scale-99`}
            >
              <span className="sr-only">
                <FormattedMessage id="remove" defaultMessage="Remove" />
              </span>
              <span>{item.label}</span>
              <TransformableIcon
                aria-hidden
                className="text-norwegian-woods-100 size-7"
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
