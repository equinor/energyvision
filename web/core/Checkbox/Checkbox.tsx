import {
  Checkbox as EdsCheckbox,
  type CheckboxProps as EdsCheckboxProps,
} from '@equinor/eds-core-react'
import { forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'

export type CheckboxProps = EdsCheckboxProps

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  function Checkbox({ children, ...rest }, ref) {
    return (
      <EdsCheckbox
        ref={ref}
        {...rest}
        className={twMerge('[&>span]:text-base')}
      >
        {children}
      </EdsCheckbox>
    )
  },
)
