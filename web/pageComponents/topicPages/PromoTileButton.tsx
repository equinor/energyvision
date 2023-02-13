import { LinkData } from '../../types/types'
import { ButtonLink, ButtonLinkV2 } from '../shared/ButtonLink'
import { Button, Card } from '@components'
import { CSSProperties } from 'react'
import styled from 'styled-components'
import { arrow_forward } from '@equinor/eds-icons'
import { Icon } from '@equinor/eds-core-react'

type Props = {
  action: LinkData
  hasImage: boolean
  template?: 'default' | 'icon'
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: var(--space-medium);
  align-items: center;
`

const IconButtonLink = ({ action, hasImage }: { action: LinkData; hasImage: boolean }) => {
  return (
    <Wrapper>
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
      <div>
        <ButtonLinkV2 action={action}>
          <Button variant="ghost_icon">
            <Icon data={arrow_forward} />
          </Button>
        </ButtonLinkV2>
      </div>
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
