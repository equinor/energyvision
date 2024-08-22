import { TransformableIcon } from '../../../icons/TransformableIcon'
import { isModifierClick } from '../../../pageComponents/shared/search/simplePagination/PaginationItem'
import { forwardRef, HTMLAttributes } from 'react'
import { useCurrentRefinements, UseRefinementListProps } from 'react-instantsearch'
import { close_circle_outlined } from '@equinor/eds-icons'
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

  const flattenedItems = items.flatMap((item) => {
    return item.refinements
  })

  return items?.length > 0 ? (
    <div ref={ref} className={envisTwMerge('border border-norwegian-woods-100 p-4 flex flex-col gap-2', className)}>
      <Typography as="h2" variant="h6" className="">
        Selected filters
      </Typography>
      <ul className="flex flex-wrap gap-4">
        {flattenedItems.map((item) => (
          <li
            key={item.label}
            className="w-fit py-1 px-4 bg-moss-green-50 text-slate-80 rounded-full flex items-center gap-4"
          >
            <span>{item.label}</span>
            <button
              type="button"
              onClick={(event) => {
                if (isModifierClick(event)) {
                  return
                }
                refine(item)
              }}
              className="clickbound-area"
            >
              <span className="sr-only">
                <FormattedMessage id="remove" defaultMessage="Remove" />
              </span>
              <TransformableIcon className="text-norwegian-woods-100 size-6" iconData={close_circle_outlined} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  ) : null
})

export default SelectedFilters
