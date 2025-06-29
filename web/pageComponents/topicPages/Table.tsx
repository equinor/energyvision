import { Table as EnvisTable } from '@components'
import { BackgroundContainer } from '@core/Backgrounds'
import { FormattedDate } from '@core/FormattedDateTime'
import styled from 'styled-components'
import isEmpty from '../shared/portableText/helpers/isEmpty'
import IngressText from '../shared/portableText/IngressText'
import { Link } from '@core/Link'

import { getLocaleFromName } from '../../lib/localization'
import type { CellData, LinkData, TableData } from '../../types/index'
import { PortableTextBlock } from '@portabletext/types'
import { PortableText, toPlainText } from '@portabletext/react'
import defaultSerializers from '../shared/portableText/helpers/defaultSerializers'
import Blocks from '../shared/portableText/Blocks'
import { Typography } from '@core/Typography'

const { Head, Row, Cell, Body } = EnvisTable

const StyledIngress = styled.div`
  padding: 0 0 var(--space-medium);
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
  className?: string
}

const getLink = (linkData: LinkData) => {
  if (!linkData) return 'something-wrong'
  const { link, href } = linkData
  return (link && link.slug) || (href && href) || '/'
}

const getLocale = (linkData: LinkData) => {
  if (!linkData) return undefined
  const { link } = linkData
  return getLocaleFromName(link?.lang)
}

const renderCellByType = (cellData: CellData) => {
  switch (cellData.type) {
    case 'richText':
      return (
        <PortableText
          value={cellData.text as PortableTextBlock[]}
          components={{
            ...defaultSerializers,
            block: {
              normal: ({ children }: { children?: React.ReactNode }) => {
                if (isEmpty(children as PortableTextBlock[])) return <br />
                return <p style={{ margin: 0 }}>{children}</p>
              },
            },
          }}
        />
      )
    case 'dateField':
      return <>{cellData.date ? <FormattedDate datetime={cellData.date.toString()} /> : null}</>
    case 'numberField':
      return <>{cellData.number}</>
    case 'downloadableFile':
      return (
        <>
          {cellData.href ? (
            <StyledTableLink href={cellData.href.replace('cdn.sanity.io', 'cdn.equinor.com')} download>
              {cellData.filename}
            </StyledTableLink>
          ) : null}
        </>
      )
    case 'linkSelector':
      return (
        <StyledTableLink href={getLink(cellData as LinkData)} locale={getLocale(cellData as LinkData)}>
          {cellData.label}
        </StyledTableLink>
      )
    default:
      return <>default</>
  }
}

const Table = ({ data, anchor, className }: TableProps) => {
  const { title, ingress, designOptions, tableHeaders = [], tableRows = [] } = data
  const plainTitle = title ? toPlainText(title as PortableTextBlock[]) : ''

  const { theme, ...restOptions } = designOptions

  // Should the headers just be a plain text field?
  return (
    <BackgroundContainer className={className} {...restOptions} id={anchor} renderFragmentWhenPossible>
      {title && <Typography className="mb-10">{plainTitle}</Typography>}
      {ingress && (
        <StyledIngress>
          <IngressText value={ingress} />
        </StyledIngress>
      )}

      <EnvisTable theme={theme}>
        <Head>
          <Row>
            {tableHeaders?.map((header) => {
              return (
                <StyledHeaderCell key={header.id}>
                  {header && header.headerCell && <Blocks value={header.headerCell}></Blocks>}
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
    </BackgroundContainer>
  )
}

export default Table
