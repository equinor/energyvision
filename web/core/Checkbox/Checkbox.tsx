import { forwardRef } from 'react'
import { Checkbox as EdsCheckbox, CheckboxProps as EdsCheckboxProps } from '@equinor/eds-core-react'
import envisTwMerge from '../../twMerge'

export type CheckboxProps = EdsCheckboxProps

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox({ children, ...rest }, ref) {
  return (
    <EdsCheckbox ref={ref} {...rest} className={envisTwMerge('[&>span]:text-base')}>
      {children}
    </EdsCheckbox>
  )
})
