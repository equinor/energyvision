import { Checkbox } from '@equinor/eds-core-react'
import { forwardRef, useEffect } from 'react'
import { useFieldArray, useFormContext, Controller } from 'react-hook-form'

type OptionListProps = {
  optionsList?: {
    optionValue: string
    optionLabel: string
  }[]
  selectedOptions?: any[]
  filterName: string
  listLabel: string
}

const OptionList = forwardRef<HTMLUListElement, OptionListProps>(function FilterButton(
  { optionsList = [], selectedOptions = [], listLabel, filterName, ...rest },
  ref,
) {
  //console.log('optionsList', optionsList)
  const { control } = useFormContext()
  const { fields, update } = useFieldArray({
    control,
    name: `${filterName}_optionList`,
  })

  useEffect(() => {
    if (optionsList?.length > 0) {
      optionsList.map((option, i) => {
        update(i, {
          ...option,
          _id: option.id,
          optionLabel: option.title,
          optionValue: option.key,
          checked: selectedOptions?.some((selectedOption) => selectedOption?.key === option.optionValue),
        })
      })
    }
  }, [optionsList, selectedOptions, update])

  return (
    <ul ref={ref} className="flex flex-col">
      {fields &&
        fields?.length > 0 &&
        fields.map((field, index) => {
          console.log('field', field)
          return (
            <Controller
              name={`${filterName}_optionList.${index}`}
              control={control}
              key={field.id}
              {...field}
              render={({ field: { onChange, ref, value, name, ...rest } }) => {
                console.log('value', value)
                return (
                  <Checkbox
                    {...rest}
                    role="option"
                    aria-selected={Boolean(value?.checked)}
                    name={name}
                    ref={ref}
                    value={value}
                    label={field?.optionLabel}
                    checked={Boolean(value?.checked)}
                    onChange={(e) =>
                      onChange({
                        ...value,
                        checked: e.target.checked,
                      })
                    }
                  />
                )
              }}
            />
          )
        })}
    </ul>
  )
})

export default OptionList
