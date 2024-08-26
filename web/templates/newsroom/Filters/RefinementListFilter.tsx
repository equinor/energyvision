import { Typography } from '@core/Typography'
import { Checkbox } from '@equinor/eds-core-react'
import { useId } from 'react'
import { useRefinementList, UseRefinementListProps } from 'react-instantsearch'
import { FormattedMessage } from 'react-intl'

export type RefinementListFilterProps = {
  /* id to the heading that labels the filter, required when variant is accordion */
  labelledBy?: string
  variant?: 'list' | 'accordion'
  /* Required when variant is list */
  filterName?: string
} & React.ComponentProps<'div'> &
  UseRefinementListProps

const RefinementListFilter = ({ variant = 'list', filterName, labelledBy, ...rest }: RefinementListFilterProps) => {
  const { items, refine } = useRefinementList(rest)
  const headingId = useId()
  return (
    <div
      className={`${
        variant === 'list'
          ? 'border border-autumn-storm-60 rounded-sm p-4 flex flex-col max-h-[350px] overflow-auto transparent-v-scrollbar'
          : ''
      }`}
      // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
      tabIndex={0}
    >
      {variant === 'list' && (
        <Typography as="h3" variant="h6" id={headingId}>
          {filterName}
        </Typography>
      )}
      {items.length > 0 ? (
        <div role="group" aria-labelledby={variant === 'list' ? headingId : labelledBy}>
          <ul>
            {items.map((item) => (
              <li key={item.value}>
                <Checkbox
                  role="checkbox"
                  value={item.value}
                  label={`${item.label} (${item.count})`}
                  checked={item.isRefined}
                  onChange={() => refine(item.value)}
                />
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div>
          <FormattedMessage id="newsroom_no_relevant_filters" defaultMessage="No relevant content for this filter" />
        </div>
      )}
    </div>
  )
}

export default RefinementListFilter
