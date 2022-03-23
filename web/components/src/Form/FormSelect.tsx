import { forwardRef } from 'react'
import styled from 'styled-components'
import { NativeSelect as EdsNativeSelect, NativeSelectProps } from '@equinor/eds-core-react'
import { TextFieldWrapper } from '@components'

const StyledEdsTextField = styled(EdsNativeSelect)`
  label {
    font-size: var(--typescale-0);
  }
`

export const FormSelect = forwardRef<HTMLDivElement, NativeSelectProps>(function EdsNativeSelect(
  { children, ...rest },
  ref,
) {
  return (
    <TextFieldWrapper>
      <StyledEdsTextField ref={ref} {...rest}>
        {children}
      </StyledEdsTextField>
    </TextFieldWrapper>
  )
})
