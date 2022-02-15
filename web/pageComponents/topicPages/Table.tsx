import { BackgroundContainer, Table as EnvisTable } from '@components'
import { IngressBlockRenderer, TitleBlockRenderer } from '../../common/serializers'
import SimpleBlockContent from '../../common/SimpleBlockContent'
import type { TableData } from '../../types/types'
import styled from 'styled-components'
import { Typography } from '@equinor/eds-core-react'

const { Head, Row, Cell, Body } = EnvisTable

export const StyledTableWrapper = styled(BackgroundContainer)``

const TableContainer = styled.div`
  margin: 0 auto var(--space-medium);
  max-width: var(--maxViewportWidth);
  padding: var(--space-3xLarge) var(--layout-paddingHorizontal-large);
`
const StyledIngress = styled.div`
  padding: var(--space-medium) 0;
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
          <StyledIngress>
            <SimpleBlockContent
              blocks={ingress}
              serializers={{
                types: {
                  block: IngressBlockRenderer,
                },
              }}
            />
          </StyledIngress>
        )}

        <EnvisTable>
          <Head>
            <Row>
              {tableHeaders.map((header) => {
                return (
                  <Cell key={header.id}>
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
            {console.log('tableRows ', tableRows)}
            {tableRows.map((row) => {
              return (
                <Row key={row._idx}>
                  {console.log('row ', row)}
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
