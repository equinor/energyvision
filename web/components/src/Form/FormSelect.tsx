import { forwardRef } from 'react'
import styled from 'styled-components'
import { NativeSelect as EdsNativeSelect, NativeSelectProps } from '@equinor/eds-core-react'
import { TextFieldWrapper } from '@components'

const StyledEdsNativeSelectField = styled(EdsNativeSelect)`
  label,
  select {
    font-size: var(--typeScale-1);
  }
  label {
    color: var(--default-text);
  }
`

export const FormSelect = forwardRef<HTMLDivElement, NativeSelectProps>(function EdsNativeSelect(
  { children, ...rest },
  ref,
) {
  return (
    <TextFieldWrapper>
      <StyledEdsNativeSelectField ref={ref} {...rest}>
        {children}
      </StyledEdsNativeSelectField>
    </TextFieldWrapper>
  )
})
