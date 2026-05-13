import type { StringInputProps } from 'sanity'
//import styles from './Select.module.css'

export function Select(props: StringInputProps) {
  const { renderDefault, ...elementProps } = props

  return (
    <div>
      {renderDefault({
        renderDefault,
        ...elementProps,
      })}
    </div>
  )
}
