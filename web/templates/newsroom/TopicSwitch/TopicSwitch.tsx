import { forwardRef } from 'react'
import { Checkbox } from '@equinor/eds-core-react'
import { useRefinementList, UseRefinementListProps } from 'react-instantsearch'
import { FormattedMessage } from 'react-intl'

export type TopicSwitchProps = React.ComponentProps<'fieldset'> & UseRefinementListProps

const TopicSwitch = forwardRef<HTMLFieldSetElement, TopicSwitchProps>(function TopicSwitch(
  { className = '', ...rest },
  ref,
) {
  const { items, refine } = useRefinementList(rest)

  return (
    <fieldset ref={ref} className="p-0">
      <legend className="text-xs pb-4">
        <FormattedMessage id="newsroom_topic_filter" defaultMessage="Select topic" />
      </legend>
      <div className="border border-autumn-storm-60 rounded-md pl-1 pr-6 flex flex-col max-h-[800px] overflow-auto transparent-v-scrollbar">
        {items.length > 0 ? (
          items.map((item) => (
            <Checkbox
              key={item.value}
              value={item.value}
              label={`${item.label} (${item.count})`}
              checked={item.isRefined}
              onChange={() => refine(item.value)}
            />
          ))
        ) : (
          <div>
            <FormattedMessage id="newsroom_no_relevant_filters" defaultMessage="No relevant content for this filter" />
          </div>
        )}
      </div>
    </fieldset>
  )
})
export default TopicSwitch
