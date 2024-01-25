import { forwardRef, CSSProperties } from 'react'
import { Table as EdsTable, TableProps as EdsTableProps } from '@equinor/eds-core-react'
import styled, { ThemeProvider } from 'styled-components'
import { TableThemes } from '../../../types/types'

type ThemeType = {
  headerBackground: string
  headerBand: string
  rowBackground: string
}

const themes: Record<TableThemes, ThemeType> = {
  blue: {
    headerBackground: '#A8C3DB',
    headerBand: '#7294BB',
    rowBackground: '#D6EBF6',
  },
  green: {
    headerBackground: '#C2D4D6',
    headerBand: '#B5C7C9',
    rowBackground: '#E3EDEA',
  },
  grey: {
    headerBackground: 'var(--grey-20)',
    headerBand: 'var(--grey-40)',
    rowBackground: 'var(--grey-10)',
  },
}

type StyledTableProps = {
  theme: ThemeType
}

const StyledTable = styled(EdsTable)<StyledTableProps>`
  overflow-x: auto;
  display: block;
  width: fit-content;
  max-width: 100%;
  /* Because of caption and display block, re add the background colour
  to the body to prevent white background for the caption */
  background: transparent;
  @media (min-width: 750px) {
    width: 100%;
    display: table;
  }

  /** EDS doesn't offer customization. Add theming by overriding styles */
  ${({ theme: { headerBackground, headerBand, rowBackground } }: StyledTableProps) => `
    --header-background: ${headerBackground};
    --header-band: ${headerBand};
    --row-background: ${rowBackground};
  `}

  thead {
    > tr {
      > th {
        background: var(--header-background) !important;
        border-bottom: 2px solid var(--header-band);
        :not(:first-child) {
          border-left: 1.5px solid var(--white-100);
        }
      }
    }
  }

  tbody {
    > tr {
      > td {
        :not(:first-child) {
          border-left: 1.5px solid var(--white-100);
        }
      }
      :nth-child(even) {
        background: var(--row-background);
      }
      :not(:last-child) > td {
        border-bottom: 0;
      }
      :last-child > td {
        border-bottom: 2px solid var(--row-background) !important;
      }
    }
  }
`

export type TableProps = EdsTableProps & { theme?: TableThemes }

export const Table = forwardRef<HTMLTableElement, TableProps>(function List(
  { children, style, theme = 'grey', ...rest },
  ref,
) {
  return (
    <ThemeProvider theme={themes[theme]}>
      <StyledTable
        ref={ref}
        style={
          {
            ...style,
          } as CSSProperties
        }
        {...rest}
      >
        {children}
      </StyledTable>
    </ThemeProvider>
  )
})
