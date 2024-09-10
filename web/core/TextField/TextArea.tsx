import { forwardRef, useState, TextareaHTMLAttributes, useCallback, CSSProperties } from 'react'
import { mergeRefs, useAutoResize } from '@equinor/eds-utils'
import { SharedTextFieldProps } from './TextField'
import { Input } from '@equinor/eds-core-react'

export type TextareaProps = {
  /** Type */
  type?: string
  /** Read Only */
  readOnly?: boolean
  /** Specifies max rows for multiline  */
  rowsMax?: number
} & SharedTextFieldProps &
  TextareaHTMLAttributes<HTMLTextAreaElement>

/** Temporary. Until feature request,
 * https://github.com/equinor/design-system/issues/3622,
 * is resolved */
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { variant, disabled = false, type = 'text', rowsMax = 10, className = '', ...other },
  ref,
) {
  const [textareaEl, setTextareaEl] = useState<HTMLTextAreaElement | null>(null)
  let fontSize = 16

  if (textareaEl) {
    fontSize = parseInt(window.getComputedStyle(textareaEl).fontSize)
  }

  const padding = 12 //6px from InputToken in EDS
  const maxHeight = parseFloat('1.5') * fontSize * rowsMax + padding
  //@ts-ignore: textareaEl is required, null is handled in hook
  useAutoResize(textareaEl, rowsMax ? maxHeight : undefined)

  const combinedRef = useCallback(() => mergeRefs<HTMLTextAreaElement>(ref, setTextareaEl), [setTextareaEl, ref])()

  const inputProps = {
    ref: combinedRef,
    type,
    disabled,
    variant,
    ...other,
    style: { height: 'auto' },
    className,
  }

  const leftAdornmentStyles = {
    style: { alignItems: 'flex-start' },
  }
  const rigthAdornmentStyles = {
    style: {
      alignItems: 'flex-start',
      pointerEvents: 'none' as CSSProperties['pointerEvents'],
    },
  }

  return (
    <Input
      as="textarea"
      rightAdornmentsProps={rigthAdornmentStyles}
      leftAdornmentsProps={leftAdornmentStyles}
      {...inputProps}
    />
  )
})
