import { Link, FormattedDate, BackgroundContainer, Table as EnvisTable } from '@components'
import { IngressBlockRenderer, TitleBlockRenderer } from '../../common/serializers'
import SimpleBlockContent from '../../common/SimpleBlockContent'
import type { TableData } from '../../types/types'
import styled from 'styled-components'
import { default as NextLink } from 'next/link'

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
const StyledHeaderCell = styled(Cell)`
  p {
    font-size: var(--typeScale-0);
    margin-bottom: 0;
  }
`
const StyledFormattedDate = styled(FormattedDate)``

const StyledTableLink = styled(Link)`
  &:hover {
    color: var(--moss-green-90);
    cursor: pointer;
  }
`

type TableProps = {
  data: TableData
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getLink = (linkData: any) => {
  if (!linkData) return 'something-wrong'
  const { isStatic, link, staticUrl, url } = linkData
  if (isStatic) {
    return staticUrl || '/'
  } else {
    return (link && link.slug) || (url && url) || '/'
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const renderCellByType = (cellData: any) => {
  switch (cellData.type) {
    case 'textField':
      return <>{cellData.text}</>
    case 'dateField':
      return <StyledFormattedDate datetime={cellData.date} />
    case 'numberField':
      return <>{cellData.number}</>
    case 'downloadableFile':
      return (
        <NextLink href={cellData.href} passHref>
          <StyledTableLink>{cellData.filename}</StyledTableLink>
        </NextLink>
      )
    case 'linkSelector':
      return (
        <NextLink href={getLink(cellData)} passHref>
          <StyledTableLink>{cellData.label}</StyledTableLink>
        </NextLink>
      )
    default:
      return <>default</>
  }
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
                  <StyledHeaderCell key={header.id}>
                    <SimpleBlockContent
                      blocks={header.headerCell}
                      serializers={{
                        types: {
                          block: IngressBlockRenderer,
                        },
                      }}
                    />
                  </StyledHeaderCell>
                )
              })}
            </Row>
          </Head>

          <Body>
            {/*console.log('tableRows ', tableRows) */}
            {tableRows.map((row) => {
              return (
                <Row key={row.id}>
                  {/*console.log('row ', row) */}
                  {row?.row?.map((cell: any) => {
                    return <Cell key={cell.id}>{renderCellByType(cell)} </Cell>
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
