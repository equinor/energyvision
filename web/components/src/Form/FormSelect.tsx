import { forwardRef } from 'react'
import styled from 'styled-components'
import { NativeSelect as EdsNativeSelect, NativeSelectProps } from '@equinor/eds-core-react'
import { TextFieldWrapper } from '@components'
import { twMerge } from 'tailwind-merge'

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
      <StyledEdsNativeSelectField
        className={twMerge('[&>label]:text-base [&>select]:text-base [&>label]:text-slate-80')}
        ref={ref}
        {...rest}
      >
        {children}
      </StyledEdsNativeSelectField>
    </TextFieldWrapper>
  )
})
