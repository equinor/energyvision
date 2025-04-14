import { forwardRef } from 'react'
import { Table as EdsTable, CaptionProps } from '@equinor/eds-core-react'

const { Caption: EdsCaption } = EdsTable

export type TableCaptionProps = {
  center?: boolean
} & CaptionProps

export const Caption = forwardRef<HTMLTableCellElement, TableCaptionProps>(function Cell(
  { center = false, children, ...rest },
  ref,
) {
  return (
    <EdsCaption
      ref={ref}
      className={`py-[var(--space-small)] text-left text-[var(--typeScale-1)] leading-[var(--lineHeight-1)] text-${
        center ? 'center' : ''
      } text-[var(--color-on-background)]`}
      {...rest}
    >
      {children}
    </EdsCaption>
  )
})
