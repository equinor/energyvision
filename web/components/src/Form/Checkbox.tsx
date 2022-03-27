import { forwardRef, CSSProperties } from 'react'
import { Checkbox as EdsCheckbox, CheckboxProps as EdsCheckboxProps } from '@equinor/eds-core-react'

export type CheckboxProps = EdsCheckboxProps

export const Checkbox = forwardRef<HTMLInputElement, EdsCheckboxProps>(function List(
  { style, children, ...rest },
  ref,
) {
  return (
    <EdsCheckbox
      ref={ref}
      style={
        {
          ...style,
        } as CSSProperties
      }
      {...rest}
    >
      {children}
    </EdsCheckbox>
  )
})
