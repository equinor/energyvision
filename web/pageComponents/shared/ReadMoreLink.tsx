import { LinkData } from '../../types'
import { getUrlFromAction } from '../../common/helpers'
import { getLocaleFromName } from '../../lib/localization'
import { ReadMoreLink as CoreReadMoreLink } from '@core/Link'

const ReadMoreLink = ({ action }: { action: LinkData }) => {
  const url = action && getUrlFromAction(action)
  return (
    <CoreReadMoreLink
      href={url as string}
      {...(action.link?.lang && { locale: getLocaleFromName(action.link?.lang) })}
      type={action.type}
    >
      {`${action.label} ${action.extension ? `(${action.extension.toUpperCase()})` : ''}`}
    </CoreReadMoreLink>
  )
}

export default ReadMoreLink
