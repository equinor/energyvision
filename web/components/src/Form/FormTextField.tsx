import { forwardRef } from 'react'
import styled from 'styled-components'
import { TextField as EdsTextField, TextFieldProps } from '@equinor/eds-core-react'

export const TextFieldWrapper = styled.div`
  padding: var(--space-small) 0px var(--space-medium) 0px;
  p {
    color: var(--clear-red-100);
    font-size: var(--typeScale-0);
  }
`
const StyledEdsTextField = styled(EdsTextField)`
  label,
  input,
  textarea {
    font-size: var(--typeScale-1);
  }
`

export const FormTextField = forwardRef<HTMLDivElement, TextFieldProps>(function TextField({ children, ...rest }, ref) {
  return (
    <TextFieldWrapper>
      <StyledEdsTextField ref={ref} {...rest}>
        {children}
      </StyledEdsTextField>
    </TextFieldWrapper>
  )
})
