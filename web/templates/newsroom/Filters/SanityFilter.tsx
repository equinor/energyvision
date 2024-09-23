import { Typography } from '@core/Typography'
import { SanityNewsTag } from '../../../types/types'
import { Checkbox } from '@equinor/eds-core-react'
import { ChangeEvent, useId, useMemo } from 'react'
import { tagVariants } from './NewsroomSanityFilters'
import { localeCompareUndefined } from '../../../common/helpers/compare'

export type SanityFilterProps = {
  /* id to the heading that labels the filter, required when variant is accordion */
  labelledBy?: string
  variant?: 'list' | 'accordion'
  filterLabel: string
  filterName: tagVariants
  items?: SanityNewsTag[]
  //tag key list
  selected?: string[]
  onSearch: (filterName: string, selectedItems: string[]) => void
} & React.ComponentProps<'div'>

const SanityFilter = ({
  variant = 'list',
  filterLabel,
  filterName,
  labelledBy,
  items,
  selected,
  onSearch,
}: SanityFilterProps) => {
  const headingId = useId()
  const selectedItems = useMemo(() => {
    return selected ?? []
  }, [selected])

  const handleSelect = (key: string, checked: boolean) => {
    let updatedFilter = []
    if (checked) {
      updatedFilter = [...selectedItems, key]
    } else {
      updatedFilter = selectedItems.filter((s) => s !== key)
    }
    onSearch(filterName, updatedFilter)
  }

  return items && items.length > 0 ? (
    <div
      className={`${
        variant === 'list'
          ? 'border border-autumn-storm-60 rounded-sm p-4 flex flex-col overflow-auto focus:outline-none focus-visible:envis-outline transparent-v-scrollbar'
          : ''
      }`}
      {...(variant === 'list' && {
        style: {
          maxHeight: 'calc(90vh/3)',
        },
      })}
      // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
      tabIndex={0}
    >
      {variant === 'list' && (
        <Typography as="h3" variant="h7" className="font-semibold" id={headingId}>
          {filterLabel}
        </Typography>
      )}
      <div role="group" aria-labelledby={variant === 'list' ? headingId : labelledBy}>
        <ul>
          {items
            .sort((a, b) => {
              //.sort((a, b) => !!a.timestamp ? a.timestamp > b.timestamp : true)
              return localeCompareUndefined(String(a.connectedNews), String(b.connectedNews))
            })
            .map((item) => (
              <li key={item.id ?? item.key}>
                <Checkbox
                  role="checkbox"
                  value={item.key}
                  label={`${item.title}${item.connectedNews ? ` (${item.connectedNews})` : ''}`}
                  checked={selectedItems.some((s: string) => s === item.key)}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => handleSelect(item.key, e.target.checked)}
                />
              </li>
            ))}
        </ul>
      </div>
    </div>
  ) : null
}

export default SanityFilter
