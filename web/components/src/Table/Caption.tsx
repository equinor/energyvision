import { forwardRef, CSSProperties } from 'react'
import { Table as EdsTable, CaptionProps } from '@equinor/eds-core-react'
import styled from 'styled-components'

const { Caption: EdsCaption } = EdsTable

const StyledCaption = styled(EdsCaption)<{ center: boolean }>`
  padding: var(--space-small) 0;
  font-size: var(--typeScale-1);
  line-height: var(--lineHeight-1);
  text-align: left;
  ${({ center }) =>
    center && {
      textAlign: 'center',
    }}

  color: var(--color-on-background);
`

export type TableCaptionProps = {
  center?: boolean
} & CaptionProps

export const Caption = forwardRef<HTMLTableCellElement, TableCaptionProps>(function Cell(
  { center = false, style, children, ...rest },
  ref,
) {
  return (
    <StyledCaption
      ref={ref}
      center={center}
      style={
        {
          ...style,
        } as CSSProperties
      }
      {...rest}
    >
      {children}
    </StyledCaption>
  )
})
