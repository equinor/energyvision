import { BackgroundContainer, FormattedDate, Link, Table as EnvisTable, Text } from '@components'
import styled from 'styled-components'
import isEmpty from '../shared/portableText/helpers/isEmpty'
import IngressText from '../shared/portableText/IngressText'
import RichText from '../shared/portableText/RichText'
import TitleText from '../shared/portableText/TitleText'

import { getLocaleFromName } from '../../lib/localization'
import type { CellData, LinkData, TableData } from '../../types/types'
import { PortableTextBlock } from '@portabletext/types'
import { PortableText } from '@portabletext/react'
import defaultSerializers from '../shared/portableText/helpers/defaultSerializers'
import { twMerge } from 'tailwind-merge'

const { Head, Row, Cell, Body } = EnvisTable

export const StyledTableWrapper = styled(BackgroundContainer)``

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

  const { theme, ...restOptions } = designOptions

  // Should the headers just be a plain text field?
  return (
    <StyledTableWrapper {...restOptions} id={anchor} renderFragmentWhenPossible>
      <div className={twMerge(`pb-page-content px-layout-lg max-w-viewport mx-auto`, className)}>
        {title && <StyledTitle value={title} />}
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
      </div>
    </StyledTableWrapper>
  )
}

export default Table
