export type TableThemeColors = {
  headerBackground: string
  headerBand: string
  rowBackground: string
  headerBorderLeftBand: string
  coloumnBorderLeftBand: string
  coloumnBorderBottomBand: string
  coloumnLastChildBorderBottomBand: string
}
export const getColorForTableTheme = (pattern?: string): TableThemeColors => {
  switch (pattern) {
    case 'blue':
      return {
        headerBackground: '[&>thead>tr>th]:!bg-[#A8C3DB]',
        headerBand: '[&>thead>tr>th]:border-b-2 [&>thead>tr>th]:border-b-[#7294BB]',
        rowBackground: '[&>tbody>tr>td:nth-child(even)]:!bg-[#D6EBF6]',
        headerBorderLeftBand:
          '[&>thead>tr>th:not(:first-child)]:border-l-2 [&>thead>tr>th:not(:first-child)]:border-l-[var(--white-100)]',
        coloumnBorderLeftBand:
          '[&>tbody>tr>td:not(:first-child)]:border-l-2 [&>tbody>tr>td:not(:first-child)]:border-l-[var(--white-100)]',
        coloumnBorderBottomBand:
          '[&>tbody>tr:last-child]:!border-b-2 [&>tbody>tr:last-child]:!border-b-[#D6EBF6]',
          coloumnLastChildBorderBottomBand: '[&>tbody>tr:not(:last-child)>td]:!border-b-0',
      }
    case 'green':
      return {
        headerBackground: '[&>thead>tr>th]:!bg-[#C2D4D6]',
        headerBand: '[&>thead>tr>th]:border-b-2 [&>thead>tr>th]:border-b-[#B5C7C9]',
        rowBackground: '[&>tbody>tr>td:nth-child(even)]:!bg-[#E3EDEA]',
        headerBorderLeftBand:
          '[&>thead>tr>th:not(:first-child)]:border-l-2 [&>thead>tr>th:not(:first-child)]:border-l-[var(--white-100)]',
        coloumnBorderLeftBand:
          '[&>tbody>tr>td:not(:first-child)]:border-l-2 [&>tbody>tr>td:not(:first-child)]:border-l-[var(--white-100)]',
        coloumnBorderBottomBand:
          '[&>tbody>tr:last-child]:!border-b-2 [&>tbody>tr:last-child>td]:!border-b-[#E3EDEA]',
          coloumnLastChildBorderBottomBand: '[&>tbody>tr:not(:last-child)>td]:!border-b-0',
      }
    case 'grey':
      return {
        headerBackground: '[&>thead>tr>th]:!bg-[var(--grey-20)]',
        headerBand: '[&>thead>tr>th]:border-b-2 [&>thead>tr>th]:border-b-[var(--grey-40)]',
        rowBackground: '[&>tbody>tr>td:nth-child(even)]:!bg-[var(--grey-10)]',
        headerBorderLeftBand:
          '[&>thead>tr>th:not(:first-child)]:border-l-2 [&>thead>tr>th:not(:first-child)]:border-l-[var(--white-100)]',
        coloumnBorderLeftBand:
          '[&>tbody>tr>td:not(:first-child)]:border-l-2 [&>tbody>tr>td:not(:first-child)]:border-l-[var(--white-100)]',
        coloumnBorderBottomBand:
          '[&>tbody>tr:last-child]:!border-b-2 [&>tbody>tr:last-child>td]:!border-b-[var(--grey-10)]',
        coloumnLastChildBorderBottomBand: '[&>tbody>tr:not(:last-child)>td]:border-b-0',
      }
    default:
      return {
        headerBackground: '[&>thead>tr>th]:!bg-[var(--grey-20)]',
        headerBand: '[&>thead>tr>th]:border-b-2 [&>thead>tr>th]:border-b-[var(--grey-40)]',
        rowBackground: '[&>tbody>tr>td:nth-child(even)]:!bg-[var(--grey-10)]',
        headerBorderLeftBand:
          '[&>thead>tr>th:not(:first-child)]:border-l-2 [&>thead>tr>th:not(:first-child)]:border-l-[var(--white-100)]',
        coloumnBorderLeftBand:
          '[&>tbody>tr>td:not(:first-child)]:border-l-2 [&>tbody>tr>td:not(:first-child)]:border-l-[var(--white-100)]',
        coloumnBorderBottomBand:
          '[&>tbody>tr:last-child]:!border-b-2 [&>tbody>tr:last-child>td]:!border-b-[var(--grey-10)]',
        coloumnLastChildBorderBottomBand: '[&>tbody>tr:not(:last-child)>td]:!border-b-0',
      }
  }
}
