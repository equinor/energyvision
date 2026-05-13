import { Switch } from '@sanity/ui'
import { useCallback } from 'react'
import { type BooleanInputProps, set, unset } from 'sanity'
import styles from './Toggle.module.css'

export function Toggle(props: BooleanInputProps) {
  const { onChange, value, ...elementProps } = props

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const nextValue = event.currentTarget.checked
      onChange(nextValue ? set(nextValue) : unset())
    },
    [onChange],
  )

  return (
    <div>
      <div className={styles.flexContainer}>
        <Switch
          checked={!!value}
          onChange={handleChange}
          className={styles.switch}
        />
        <div>
          <h2 className={styles.label}>{elementProps?.schemaType?.title}</h2>
          <div className={styles.description}>
            {elementProps?.schemaType?.description}
          </div>
        </div>
      </div>
    </div>
  )
}
