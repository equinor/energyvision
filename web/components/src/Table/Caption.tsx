import { forwardRef, CSSProperties } from 'react'
import { Table as EdsTable, CaptionProps } from '@equinor/eds-core-react'
import styled from 'styled-components'

const { Caption: EdsCaption } = EdsTable

const StyledCaption = styled(EdsCaption)``

export type TableCaptionProps = CaptionProps

export const Caption = forwardRef<HTMLTableCellElement, CaptionProps>(function Cell({ style, children, ...rest }, ref) {
  return (
    <StyledCaption
      ref={ref}
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
