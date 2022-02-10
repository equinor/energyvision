import { BackgroundContainer, Table as EnvisTable } from '@components'
import { IngressBlockRenderer, TitleBlockRenderer } from '../../common/serializers'
import SimpleBlockContent from '../../common/SimpleBlockContent'
import type { TableData } from '../../types/types'
import styled from 'styled-components'

const { Head, Row, Cell, Body } = EnvisTable

export const StyledTableWrapper = styled(BackgroundContainer)``

const TableContainer = styled.div`
  margin: 0 auto var(--space-medium);
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

        <EnvisTable>
          <Head>
            <Row>
              {tableHeaders.map((header) => {
                return (
                  <Cell key={header._key}>
                    <SimpleBlockContent
                      blocks={header.headerCell}
                      serializers={{
                        types: {
                          block: IngressBlockRenderer,
                        },
                      }}
                    />
                  </Cell>
                )
              })}
            </Row>
          </Head>

          <Body>
            {tableRows.map((row) => {
              return (
                <Row key={row._idx}>
                  {row?.row?.map((cell: any) => {
                    return <Cell key={cell._key}>cell hei</Cell>
                  })}
                </Row>
              )
            })}
          </Body>
        </EnvisTable>
      </TableContainer>
    </StyledTableWrapper>
  )
}

export default Table
