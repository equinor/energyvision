import type { ReactNode } from 'react'
import { useEffect } from 'react'
import { type StringInputProps, set, unset } from 'sanity'
import { capitalizeFirstLetter } from '@/helpers/formatters'
import styles from './OptionButtons.module.css'

/**
 * Requires field type string and and list like this:
 * const contentAlignmentOptions = [
 *   { value: 'left', icon: ContentLeftImage },
 *   { value: 'center', icon: ContentCenterImage },
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
    icon: () => ReactNode
  }[],
) {
  const { schemaType, value, onChange } = props
  const initialValue =
    typeof schemaType?.initialValue === 'string' ? schemaType.initialValue : ''

  useEffect(() => {
    if (!value && initialValue) {
      onChange(set(initialValue))
    }
  }, [initialValue, onChange, value])

  const { options } = schemaType || {}

  return (
    <div className={styles.container}>
      {options?.list?.map((option: any) => {
        return (
          <div key={`container_${option.value}`}>
            <input
              id={`id_${option.value.replace(/ /g, '')}`}
              className={styles.radio}
              type='radio'
              checked={value === option.value}
              onChange={event => {
                const nextValue = event.currentTarget.value
                onChange(nextValue ? set(nextValue) : unset())
              }}
              value={option.value}
            />
            <label
              className={styles.label}
              htmlFor={`id_${option.value.replace(/ /g, '')}`}
            >
              <div className={styles.iconWrapper}>
                <div className={styles.iconBox}>
                  {icons
                    ?.find(
                      (icon: { value: string; icon: () => ReactNode }) =>
                        icon.value === option.value,
                    )
                    ?.icon()}
                </div>
                <p className={styles.text}>
                  {capitalizeFirstLetter(option.value)}
                </p>
              </div>
            </label>
          </div>
        )
      })}
    </div>
  )
}
