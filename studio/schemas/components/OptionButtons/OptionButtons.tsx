import type { JSX, ReactNode } from 'react'
import { useEffect } from 'react'
import {
  type PathSegment,
  type StringInputProps,
  set,
  unset,
  useFormValue,
} from 'sanity'
import { capitalizeFirstLetter } from '@/helpers/formatters'
import styles from './OptionButtons.module.css'

/**
 * Requires field type string and and list like this:
 * const contentAlignmentOptions = [
 *   { value: 'left', icon: ContentLeftImage },
 *   { value: 'center', icon: <BsFileImageFill />  },
 *   { value: 'right', icon: ContentRightImage },
 * ]
 * in the schema like this:
 * options: {
 *       list: contentAlignmentOptions.map(option => ({
 *         title: capitalizeFirstLetter(option.value),
 *         value: option.value,
 *       })),
 * },
 * components: {
 *    input: props => OptionButtons(props, contentAlignmentOptions),
 * }
 */
export function OptionButtons(
  props: StringInputProps,
  icons: {
    value: string
    icon: ReactNode | (() => JSX.Element)
  }[],
  // Configuration to disable options given a parent path used in form value hook
  optionsConfig: Record<string, string[]> = {},
  //The field to cross check the optionsConfig against
  parentField?: string,
  //Required when using optionsConfig
  parentPath?: PathSegment[],
) {
  const { schemaType, value, onChange } = props
  const initialValue =
    typeof schemaType?.initialValue === 'string' ? schemaType.initialValue : ''

  const parentConditionalField = useFormValue([
    ...(parentPath ?? []),
    ...(parentField ? [parentField] : []),
  ])

  useEffect(() => {
    if (!value && initialValue) {
      onChange(set(initialValue))
    }
  }, [initialValue, onChange, value])

  const { options } = schemaType || {}

  return (
    <div className={styles.container}>
      {options?.list?.map((option: any) => {
        let allowedValues: string[] = []
        if (
          optionsConfig &&
          parentField &&
          parentConditionalField &&
          parentConditionalField !== undefined
        ) {
          //@ts-ignore
          allowedValues = optionsConfig[parentConditionalField] ?? []
        }

        const disabled =
          allowedValues.length > 0 && !allowedValues.includes(option.value)

        const iconElement = icons?.find(
          (icon: { value: string; icon: ReactNode | (() => JSX.Element) }) =>
            icon.value === option.value,
        )

        return (
          <div key={`container_${option.value}`}>
            <input
              id={`id_${option.value.replace(/ /g, '')}`}
              className={styles.radio}
              type='radio'
              disabled={disabled}
              checked={value === option.value}
              onChange={event => {
                const nextValue = event.currentTarget.value
                onChange(nextValue ? set(nextValue) : unset())
              }}
              value={option.value}
            />
            <label
              className={`${styles.label} ${disabled ? styles.disabled : ''}`}
              data-disabled={disabled}
              htmlFor={`id_${option.value.replace(/ /g, '')}`}
            >
              <div className={styles.iconWrapper}>
                <div className={styles.iconContainer}>
                  <div className={styles.iconBox}>
                    {typeof iconElement?.icon === 'function'
                      ? iconElement.icon()
                      : iconElement?.icon}
                  </div>
                </div>
                <div className={`${styles.text}`} data-disabled={disabled}>
                  {capitalizeFirstLetter(option.value)}
                </div>
              </div>
            </label>
          </div>
        )
      })}
    </div>
  )
}
