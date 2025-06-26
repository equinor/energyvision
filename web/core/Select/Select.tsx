import { forwardRef } from 'react'
import { NativeSelect as EdsNativeSelect, NativeSelectProps } from '@equinor/eds-core-react'

type SelectProps = NativeSelectProps

export const Select = forwardRef<HTMLDivElement, SelectProps>(function Select({ children, ...rest }, ref) {
  return (
    <EdsNativeSelect ref={ref} {...rest} className="[&>label]:text-base [&>label]:font-medium *:!text-slate-80">
      {children}
    </EdsNativeSelect>
  )
})
