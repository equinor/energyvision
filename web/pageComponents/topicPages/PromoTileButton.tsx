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
  template?: 'default' | 'icon' | 'text'
}

const StyledLink = styled(Link)`
  gap: var(--space-medium);
  border-bottom: none !important;
`

const Wrapper = styled.div`
  padding: 0 var(--space-medium);
`

const TextButtonLink = ({ action, hasImage }: { action: LinkData; hasImage: boolean }) => {
  const url = getUrlFromAction(action)
  if (!url) {
    console.warn(`Missing URL on 'IconButtonLink' link with type: '${action.type}' and label: '${action.label}'`)
    return null
  }
  const locale = getLocaleFromName(action.link?.lang)

  return (
    <Wrapper>
      <StyledLink underline={false} variant="contentLink" locale={locale} href={url} aria-label={action.ariaLabel}>
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
      </StyledLink>
    </Wrapper>
  )
}

const IconButtonLink = ({ action }: { action: LinkData; hasImage: boolean }) => {
  const url = getUrlFromAction(action)
  if (!url) {
    console.warn(`Missing URL on 'IconButtonLink' link with type: '${action.type}' and label: '${action.label}'`)
    return null
  }
  const locale = getLocaleFromName(action.link?.lang)

  return <StyledLink underline={false} variant="contentLink" locale={locale} href={url} aria-label={action.ariaLabel} />
}

export const PromoTileButton = ({ action, template = 'default', hasImage }: Props) => {
  switch (template) {
    case 'text':
      return <TextButtonLink action={action} hasImage={hasImage} />
    case 'icon':
      return <IconButtonLink action={action} hasImage={hasImage} />
    default:
      return <ButtonLink action={action} />
  }
}
