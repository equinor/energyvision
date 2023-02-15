import { LinkData } from '../../types/types'
import { ButtonLink, ButtonLinkV2 } from '../shared/ButtonLink'
import { Card, Link } from '@components'
import { CSSProperties } from 'react'
import styled from 'styled-components'

type Props = {
  action: LinkData
  hasImage: boolean
  template?: 'default' | 'icon'
}

const StyledLink = styled(Link)`
  gap: var(--space-medium);
  border-bottom: none;
`

const IconButtonLink = ({ action, hasImage }: { action: LinkData; hasImage: boolean }) => {
  return (
    <ButtonLinkV2 action={action} style={{ textDecoration: 'none' }}>
      <StyledLink variant="contentLink" underline={false} aria-label={action.ariaLabel}>
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
    </ButtonLinkV2>
  )
}

export const PromoTileButton = ({ action, template = 'default', hasImage }: Props) => {
  switch (template) {
    case 'icon':
      return <IconButtonLink action={action} hasImage={hasImage} />
    default:
      return <ButtonLink action={action} />
  }
}
