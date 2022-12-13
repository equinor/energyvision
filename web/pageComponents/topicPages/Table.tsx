import { BackgroundContainer, FormattedDate, Link, Table as EnvisTable, Text } from '@components'
import { default as NextLink } from 'next/link'
import styled from 'styled-components'
import isEmpty from '../shared/portableText/helpers/isEmpty'
import IngressText from '../shared/portableText/IngressText'
import RichText from '../shared/portableText/RichText'
import TitleText from '../shared/portableText/TitleText'

import { Flags } from '../../common/helpers/datasetHelpers'
import type { CellData, LinkData, TableData } from '../../types/types'

const { Head, Row, Cell, Body } = EnvisTable

export const StyledTableWrapper = styled(BackgroundContainer)``

const TableContainer = styled.div`
  margin: 0 auto;
  max-width: var(--maxViewportWidth);
  padding: var(--space-3xLarge) var(--layout-paddingHorizontal-large);
`
const StyledIngress = styled.div`
  padding: 0 0 var(--space-medium);
`
const StyledTitle = styled(TitleText)`
  margin-bottom: var(--space-xLarge);
`

const StyledHeaderCell = styled(Cell)`
  p {
    font-size: var(--typeScale-05);
    margin-bottom: 0;
  }
`

const StyledCell = styled(Cell)`
  font-size: var(--typeScale-0);
  font-weight: var(--fontWeight-regular);
`

const StyledTableLink = styled(Link)`
  font-size: var(--typeScale-0);
  &:hover {
    color: var(--moss-green-90);
    cursor: pointer;
  }
`

type TableProps = {
  data: TableData
  anchor?: string
}

const getLink = (linkData: LinkData) => {
  if (!linkData) return 'something-wrong'
  const { link, href } = linkData
  return (link && link.slug) || (href && href) || '/'
}

const renderCellByType = (cellData: CellData) => {
  switch (cellData.type) {
    case 'textField':
      return <>{cellData.text}</>
    case 'dateField':
      return <>{cellData.date ? <FormattedDate datetime={cellData.date.toString()} /> : null}</>
    case 'numberField':
      return <>{cellData.number}</>
    case 'downloadableFile':
      return (
        <>
          {cellData.href ? (
            <NextLink
              href={Flags.IS_DEV ? cellData.href.replace('cdn.sanity.io', 'cdn.equinor.com') : cellData.href}
              passHref
              legacyBehavior
            >
              <StyledTableLink download>{cellData.filename}</StyledTableLink>
            </NextLink>
          ) : null}
        </>
      )
    case 'linkSelector':
      return (
        <NextLink href={getLink(cellData)} passHref legacyBehavior>
          <StyledTableLink>{cellData.label}</StyledTableLink>
        </NextLink>
      )
    default:
      return <>default</>
  }
}

const Table = ({ data, anchor }: TableProps) => {
  console.log(data.tableRows[0].row)
  const { title, ingress, designOptions, tableHeaders = [], tableRows = [] } = data

  const { background } = designOptions

  // Should the headers just be a plain text field?
  return (
    <StyledTableWrapper background={background} id={anchor}>
      <TableContainer>
        {title && <StyledTitle value={title} />}
        {ingress && (
          <StyledIngress>
            <IngressText value={ingress} />
          </StyledIngress>
        )}

        <EnvisTable>
          <Head>
            <Row>
              {tableHeaders?.map((header) => {
                return (
                  <StyledHeaderCell key={header.id}>
                    {header && header.headerCell && (
                      <RichText
                        value={header.headerCell}
                        components={{
                          block: {
                            normal: ({ children }) => {
                              // eslint-disable-next-line
                              // @ts-ignore: Still struggling with the types here :/
                              if (isEmpty(children)) return null
                              return <Text size="md">{children}</Text>
                            },
                          },
                        }}
                      />
                    )}
                  </StyledHeaderCell>
                )
              })}
            </Row>
          </Head>

          <Body>
            {tableRows?.map((row) => {
              return (
                <Row key={row.id}>
                  {row?.row?.map((cell: CellData) => {
                    return <StyledCell key={cell.id}>{renderCellByType(cell)} </StyledCell>
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
