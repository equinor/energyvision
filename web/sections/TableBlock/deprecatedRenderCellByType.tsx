import { FormattedDate } from '@core/FormattedDateTime'
import { Link } from '@core/Link'
import { LinkData } from '../../types'
import Blocks from '../../pageComponents/shared/portableText/Blocks'
import { getLocaleFromName } from '../../lib/localization'

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

// DEPRECATED
// To be deleted when all old tables are migrated to v2 table
export const renderCellByType = (cellData: any) => {
  switch (cellData?.type) {
    case 'richText':
      return <Blocks value={cellData.text} />
    case 'dateField':
      return <>{cellData.date ? <FormattedDate datetime={cellData.date.toString()} /> : null}</>
    case 'numberField':
      return <>{cellData.number}</>
    case 'downloadableFile':
      return (
        <>
          {cellData.href ? (
            <Link href={cellData.href.replace('cdn.sanity.io', 'cdn.equinor.com')} download>
              {cellData.filename}
            </Link>
          ) : null}
        </>
      )
    case 'linkSelector':
      return (
        <Link href={getLink(cellData as LinkData)} locale={getLocale(cellData as LinkData)}>
          {cellData.label}
        </Link>
      )
    default:
      return <>default</>
  }
}
