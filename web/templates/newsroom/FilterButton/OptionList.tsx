import { Checkbox } from '@equinor/eds-core-react'
import { forwardRef } from 'react'

type OptionListProps = {
  optionsList?: {
    value: string
    label: string
    count: string
    isRefined: boolean
  }[]
  onChange: (value: string) => void
}

const OptionList = forwardRef<HTMLUListElement, OptionListProps>(function FilterButton(
  { optionsList = [], onChange, ...rest },
  ref,
) {
  return (
    <ul ref={ref} className="flex flex-col">
      {optionsList?.length > 0 &&
        optionsList.map((item) => {
          return (
            <Checkbox
              key={item.value}
              role="option"
              aria-selected={Boolean(item.isRefined)}
              value={item.value}
              label={`${item.label} (${item.count})`}
              checked={Boolean(item.isRefined)}
              onChange={(e) => onChange(item.value)}
            />
          )
        })}
    </ul>
  )
})

export default OptionList
