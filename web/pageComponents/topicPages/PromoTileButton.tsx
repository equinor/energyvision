import { LinkData } from '../../types/types'
import { ButtonLink } from '../shared/ButtonLink'
import { Card } from '@components'
import { CSSProperties } from 'react'
import styled from 'styled-components'

type Props = {
  action: LinkData
  hasImage: boolean
  template?: 'default' | 'icon'
}

const StyledButtonLink = styled(ButtonLink)`
  text-decoration: none;
  gap: var(--space-medium);
  border-bottom: none;
`
const Wrapper = styled.div`
  padding: 0 var(--space-medium);
`

const IconButtonLink = ({ action, hasImage }: { action: LinkData; hasImage: boolean }) => {
  return (
    <Wrapper>
      <StyledButtonLink legacyBehavior action={action} aria-label={action.ariaLabel}>
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
      </StyledButtonLink>
    </Wrapper>
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
