import { forwardRef } from 'react'
import { NativeSelect as EdsNativeSelect, NativeSelectProps } from '@equinor/eds-core-react'
import { twMerge } from 'tailwind-merge'

type SelectProps = NativeSelectProps & {
  label?: string
}

export const Select = forwardRef<HTMLDivElement, SelectProps>(function Select({ 
  children, 
  className = '',
  label,
  id,
  ...rest 
}, ref) {
  return (
    <div ref={ref} className={className}>
      {label && (
        <label htmlFor={id} className="mx-2 text-base font-medium">
          {label}
        </label>
      )}
      <EdsNativeSelect 
        {...rest}
        id={id}
        className="[&_select]:text-base"
        label=''
      >
        {children}
      </EdsNativeSelect>
    </div>
  )
})
