import { LinkData } from '../../types'
import { getUrlFromAction } from '../../common/helpers'
import { getLocaleFromName } from '../../lib/localization'
import { Link } from '@components/Link'
import styled from 'styled-components'

const StyledLink = styled(Link)`
  font-size: var(--typeScale-1);
`
const ReadMoreLink = ({ action }: { action: LinkData }) => {
  const { type, label, extension } = action
  const url = getUrlFromAction(action)
  if (!url) {
    console.warn(`Missing URL on 'TeaserAction' link with type: '${type}' and label: '${label}'`)
    return null
  }

  if (action.type === 'internalUrl') {
    const locale = getLocaleFromName(action.link?.lang)
    return (
      <StyledLink href={url} locale={locale} variant="readMore" aria-label={action.ariaLabel}>
        {action.label}
      </StyledLink>
    )
  }

  return (
    <StyledLink variant="readMore" href={url} type={action.type} aria-label={action.ariaLabel}>
      {action.label} {extension && `(${extension.toUpperCase()})`}
    </StyledLink>
  )
}

export default ReadMoreLink
