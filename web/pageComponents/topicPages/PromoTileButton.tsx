import { LinkData } from '../../types/types'
import { ButtonLink } from '../shared/ButtonLink'
import { Card, Link } from '@components'
import { getUrlFromAction } from '../../common/helpers'
import { getLocaleFromName } from '../../lib/localization'
import { CSSProperties } from 'react'
import styled from 'styled-components'

type Props = {
  action: LinkData
  hasImage: boolean
  template?: 'default' | 'icon' | 'unstyledText' | 'text'
}

const StyledLink = styled(Link)`
  gap: var(--space-medium);
  border-bottom: none !important;
`

const Wrapper = styled.div`
  padding: 0 var(--space-medium);
`

const generateLink = (action: LinkData, hasImage?: boolean, wrapper?: boolean, template?: string) => {
  const url = getUrlFromAction(action)

  if (!url) {
    console.warn(`Missing URL on 'IconButtonLink' link with type: '${action.type}' and label: '${action.label}'`)
    return null
  }

  const locale = getLocaleFromName(action.link?.lang)

  if (template === 'icon') {
    return (
      <StyledLink underline={false} variant="contentLink" locale={locale} href={url} aria-label={action.ariaLabel} />
    )
  }

  const linkContent = (
    <Card.Title
      style={
        {
          '--card-title-fontSize': hasImage ? 'var(--typeScale-2)' : 'var(--typeScale-4)',
          '--card-title-fontWeight': hasImage ? '450' : '400',
        } as CSSProperties
      }
    >
      {action.label}
    </Card.Title>
  )

  const linkElement = (
    <StyledLink underline={false} variant="contentLink" locale={locale} href={url} aria-label={action.ariaLabel}>
      {linkContent}
    </StyledLink>
  )

  return wrapper ? <Wrapper>{linkElement}</Wrapper> : linkElement
}

export const PromoTileButton = ({ action, template = 'default', hasImage }: Props) => {
  switch (template) {
    case 'unstyledText':
      return generateLink(action, hasImage)
    case 'text':
      return generateLink(action, hasImage, true)
    case 'icon':
      return generateLink(action, hasImage, false, template)
    default:
      return <ButtonLink action={action} />
  }
}
