import { forwardRef } from 'react'
import { Checkbox as EdsCheckbox, CheckboxProps as EdsCheckboxProps } from '@equinor/eds-core-react'
import { twMerge } from 'tailwind-merge'

export type CheckboxProps = EdsCheckboxProps

export const Checkbox = forwardRef<HTMLInputElement, EdsCheckboxProps>(function List(
  { children, className, ...rest },
  ref,
) {
  return (
    <EdsCheckbox ref={ref} {...rest} className={twMerge('[&>span]:text-base')}>
      {children}
    </EdsCheckbox>
  )
})
