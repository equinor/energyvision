import { TransformableIcon } from '../../../icons/TransformableIcon'
import { isModifierClick } from '../../../pageComponents/shared/search/simplePagination/PaginationItem'
import { forwardRef, HTMLAttributes, useMemo } from 'react'
import { close_circle_outlined, close } from '@equinor/eds-icons'
import { Typography } from '@core/Typography'
import { FormattedMessage } from 'react-intl'
import envisTwMerge from '../../../twMerge'
import { SanityNewsTag } from '../../../types/types'
import { SearchTags, tagVariants } from '../Newsroom'
import { TagsProps } from './NewsroomSanityFilters'

type SelectedSanityFiltersProps = {
  search: SearchTags
  tags: TagsProps
  onClear: () => void
  onRemove: (filterName: tagVariants, key: string) => void
} & HTMLAttributes<HTMLDivElement>

const SelectedSanityFilters = forwardRef<HTMLDivElement, SelectedSanityFiltersProps>(function SelectedSanityFilters(
  { search, tags, className = '', onRemove, onClear },
  ref,
) {
  console.log('search', search)
  const selectedItems = useMemo(() => {
    const flattenedTags: SanityNewsTag[] = tags
      ? Object.keys(tags).reduce(function (r, k) {
          //@ts-ignore: TODO
          return r.concat(tags[k])
        }, [])
      : []
    return Object.entries(search)
      ?.map(([key, value]) => {
        return value.map((v) => {
          return {
            //@ts-ignore: TODO
            label: flattenedTags.find((t: SanityNewsTag) => t.key === v).title ?? '-',
            key: v,
            filterName: key as tagVariants,
          }
        })
      })
      .flatMap((item) => item)
  }, [search, tags])

  return selectedItems?.length > 0 ? (
    <div ref={ref} className={envisTwMerge('border border-norwegian-woods-100 p-4 flex flex-col gap-2', className)}>
      <div className="flex justify-between">
        <Typography as="h2" variant="h6" className="">
          Selected filters
        </Typography>
        <button
          type="button"
          onClick={onClear}
          className="flex gap-1 text-xs underline hover:no-underline focus:outline-none focus-visible:envis-outline active:scale-99"
        >
          <TransformableIcon iconData={close} className="size-6" />
          <FormattedMessage id="newsroom_filters_clear_all" defaultMessage="Clear all" />
        </button>
      </div>
      <ul className="flex flex-wrap gap-4">
        {selectedItems.map((item) => (
          <li key={item.key} className="">
            <button
              type="button"
              onClick={(event) => {
                if (isModifierClick(event)) {
                  return
                }
                onRemove(item.filterName, item.key)
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

export default SelectedSanityFilters
