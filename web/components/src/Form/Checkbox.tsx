import { forwardRef } from 'react'
import { Checkbox as EdsCheckbox, CheckboxProps as EdsCheckboxProps } from '@equinor/eds-core-react'
import styled from 'styled-components'

export type CheckboxProps = EdsCheckboxProps
const StyledCheckBox = styled(EdsCheckbox)`
  span {
    font-size: var(--typeScale-1);
  }
`

export const Checkbox = forwardRef<HTMLInputElement, EdsCheckboxProps>(function List({ children, ...rest }, ref) {
  return (
    <StyledCheckBox ref={ref} {...rest}>
      {children}
    </StyledCheckBox>
  )
})
