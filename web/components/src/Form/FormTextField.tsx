import { forwardRef } from 'react'
import styled from 'styled-components'
import { TextField as EdsTextField, TextFieldProps } from '@equinor/eds-core-react'
import { twMerge } from 'tailwind-merge'

export const TextFieldWrapper = styled.div`
  p {
    color: var(--clear-red-100);
    font-size: var(--typeScale-0);
  }
`


export const FormTextField = forwardRef<HTMLDivElement, TextFieldProps>(function TextField({ children, ...rest }, ref) {
  return (
    <div className={twMerge('[&p]:text-clear-red-100 [&p]:text-xs')}>
      <EdsTextField className={twMerge('[&>label]:text-slate-80 [&>textarea]:text-base [&>label]:text-base [&>input]:text-base')}  ref={ref} {...rest}>
        {children}
      </EdsTextField>
    </div>
  )
})
