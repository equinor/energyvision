import { InputProps, Input } from '@equinor/eds-core-react'
import { ReactNode, InputHTMLAttributes, forwardRef, ForwardedRef, useId, TextareaHTMLAttributes } from 'react'
import envisTwMerge from '../../twMerge'
import { Textarea } from './TextArea'

export type Variants = 'error' | 'warning' | 'success'

export type SharedTextFieldProps = {
  /** Variants */
  variant?: Variants
  /** Description,shown below label */
  description?: ReactNode
  /** Input unique id. This is required to ensure accesibility */
  id: string
  /** Label text */
  label?: ReactNode
  /** Meta text */
  meta?: ReactNode
  /** Unit text */
  unit?: string
  /** Helper text */
  helperText?: string
  /** Input ref */
  inputRef?: ForwardedRef<HTMLInputElement>
  /** InputIcon */
  inputIcon?: ReactNode
  /** HelperIcon */
  helperIcon?: ReactNode
  helperTextClassName?: string
  /** If `true` a `textarea` is rendered for multiline support. Make sure to use `textareaRef` if you need to access reference element  */
  multiline?: boolean
  /**  Maximum number of rows if `multiline` is set to `true` */
  rowsMax?: number
  /** Textarea ref when multiline is set to `true` */
  textareaRef?: ForwardedRef<HTMLTextAreaElement>
} & InputProps

type TextFieldProps = SharedTextFieldProps &
  (TextareaHTMLAttributes<HTMLTextAreaElement> | InputHTMLAttributes<HTMLInputElement>)

type FieldProps = SharedTextFieldProps & {
  multiline: boolean
} & React.HTMLAttributes<HTMLTextAreaElement | HTMLInputElement>
/** Proxy component for working around typescript and element type switching */
const Field = forwardRef<HTMLTextAreaElement | HTMLInputElement, FieldProps>(function Field(props, ref) {
  return props.multiline ? (
    <Textarea ref={ref as ForwardedRef<HTMLTextAreaElement>} {...props} className={`[&_textarea]:text-base`} />
  ) : (
    <Input ref={ref as ForwardedRef<HTMLInputElement>} {...props} className={`[&_input]:text-base`} />
  )
})

/** Temporary. Until feature request
 *  https://github.com/equinor/design-system/issues/3622
 *  is resolved */
export const TextField = forwardRef<HTMLDivElement, TextFieldProps>(function TextField(
  {
    id,
    label,
    description,
    unit,
    helperText,
    placeholder,
    disabled,
    inputIcon,
    helperIcon,
    variant,
    className = '',
    helperTextClassName = '',
    multiline = false,
    rowsMax,
    textareaRef,
    inputRef,
    ...other
  },
  ref,
) {
  const helperTextId = useId()
  const inputDescriptionId = useId()
  const hasRightAdornments = Boolean(unit || inputIcon)
  let fieldProps = {
    'aria-invalid': variant === 'error' || undefined,
    disabled,
    placeholder,
    id,
    variant,
    rightAdornments: hasRightAdornments && (
      <>
        {inputIcon}
        <span>{unit}</span>
      </>
    ),
    ref: inputRef || textareaRef,
    rowsMax,
    multiline,
    ...other,
  }

  if (helperText || description) {
    fieldProps = {
      'aria-describedby': `${helperText ? helperTextId : ''}${helperText && description ? ' ' : ''}${
        description ? inputDescriptionId : ''
      }`,
      ...fieldProps,
    }
  }

  const variantClassName = {
    error: 'text-clear-red-100',
    success: 'text-norwegian-woods-100',
    warning: '',
  }

  return (
    <div ref={ref} className={envisTwMerge(``, className)}>
      <label htmlFor={id} className="mx-2 text-base font-medium">
        {label}
      </label>
      {!!description && (
        <div id={inputDescriptionId} className="px-2 pt-2 pb-1 text-xs font-normal">
          {description}
        </div>
      )}
      <Field {...fieldProps} />
      {!!helperText && (
        <div
          id={helperTextId}
          className={envisTwMerge(
            `${
              variant ? variantClassName[variant] : ''
            } mt-2 ml-2 grid auto-cols-auto gap-2 items-start justify-start whitespace-pre-line font-semibold`,
            helperTextClassName,
          )}
        >
          {helperIcon && helperIcon}
          {helperText}
        </div>
      )}
    </div>
  )
})
