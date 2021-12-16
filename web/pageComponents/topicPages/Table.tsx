import { BackgroundContainer } from '@components'
import { IngressBlockRenderer, BlockRenderer, TitleBlockRenderer } from '../../common/serializers'
import SimpleBlockContent from '../../common/SimpleBlockContent'
import type { TableData } from '../../types/types'
import styled from 'styled-components'

export const StyledTableWrapper = styled(BackgroundContainer)``

const TableContainer = styled.div`
  margin-bottom: var(--space-medium);
`

type TableProps = {
  data: TableData
}

const Table = ({ data }: TableProps) => {
  const { title, ingress, designOptions, tableHeaders = [], tableRows = [] } = data

  const { background } = designOptions

  // @TODO: New serializer for cell content, don't use p tags
  // Should the headers just be a plain text field?
  return (
    <StyledTableWrapper background={background}>
      <TableContainer>
        {title && (
          <SimpleBlockContent
            blocks={title}
            serializers={{
              types: {
                block: TitleBlockRenderer,
              },
            }}
          />
        )}
        {ingress && (
          <SimpleBlockContent
            blocks={ingress}
            serializers={{
              types: {
                block: IngressBlockRenderer,
              },
            }}
          />
        )}

        <table>
          <thead>
            {tableHeaders.map((header) => {
              return (
                <th key={header._key}>
                  <SimpleBlockContent
                    blocks={header.headerCell}
                    serializers={{
                      types: {
                        block: IngressBlockRenderer,
                      },
                    }}
                  />
                </th>
              )
            })}
          </thead>

          <tbody>
            {tableRows.map((row) => {
              return (
                <tr key={row._idx}>
                  {row?.row?.map((cell: any) => {
                    return <td key={cell._key}>cell hei</td>
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
      </TableContainer>
    </StyledTableWrapper>
  )
}

export default Table
