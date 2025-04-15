import { forwardRef } from 'react'
import { NativeSelectProps } from '@equinor/eds-core-react'
import { TextFieldWrapper } from '@components'
import { twMerge } from 'tailwind-merge'

export const FormSelect = forwardRef<HTMLDivElement, NativeSelectProps>(function EdsNativeSelect({
  children,
  ...rest
}) {
  return (
    <TextFieldWrapper>
      <EdsNativeSelect
        className={twMerge('[&>label]:text-base [&>select]:text-base [&>label]:text-slate-80')}
        {...rest}
      >
        {children}
      </EdsNativeSelect>
    </TextFieldWrapper>
  )
})
