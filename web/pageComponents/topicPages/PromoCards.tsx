import { BackgroundContainer, Link } from '@components'
import styled from 'styled-components'
import type { PromoCardsArrayData as PromoCardsData } from '../../types/types'
import PromoCardsText from '../shared/portableText/PromoCardsText'
import useWindowSize from '../../lib/hooks/useWindowSize'
import { LinkData } from '../../types/types'
import { getUrlFromAction } from '../../common/helpers'
import { getLocaleFromName } from '../../lib/localization'
import { Icon } from '@equinor/eds-core-react'
import { arrow_forward } from '@equinor/eds-icons'

const Wrapper = styled.div<{ $extraSpacing: boolean }>`
  padding: ${(props) => (props.$extraSpacing ? 'var(--space-3xLarge)' : 'var(--space-medium)')}
    var(--layout-paddingHorizontal-large);
  max-width: var(--maxViewportWidth);
  margin: auto;
  gap: var(--space-medium);
  display: flex;
  flex-direction: column;

  @media (min-width: 1000px) {
    flex-direction: row;
  }
`

const Card = styled(BackgroundContainer)<{ $isSingleCard: boolean }>`
  display: flex;
  flex-direction: column;
  min-height: 330px;
  padding: var(--space-medium);
  gap: var(--space-large);
  justify-content: center;

  @media (min-width: 1000px) {
    ${(props) => props.$isSingleCard && `a { justify-content: center; }`}
  }
`

const StyledLink = styled(Link)`
  gap: 8px;
  text-decoration: none;
  font-size: var(--typeScale-2);

  & > svg {
    fill: var(--energy-red-100);
    border: 1px solid transparent;
    border-radius: 50%;
    padding: var(--space-small);
  }
  &:hover svg {
    background: var(--energy-red-50);
  }

  .inverted-background & {
    color: var(--inverted-text) !important;
  }
`

const Action = ({ action }: { action: LinkData }) => {
  const url = getUrlFromAction(action)
  if (!url) {
    console.warn(`Missing URL on 'PromoCard' link with type: '${action.type}' and label: '${action.label}'`)
    return null
  }
  const locale = getLocaleFromName(action.link?.lang)

  return (
    <StyledLink locale={locale} href={url} aria-label={action.ariaLabel || action.label}>
      {action.label}
      <Icon data={arrow_forward} />
    </StyledLink>
  )
}

const PromoCards = ({ data, anchor }: { data: PromoCardsData; anchor?: string }) => {
  const cards = data.group
  const isSingleCard = cards.length === 1
  const { width = 0 } = useWindowSize()
  if (!data.group) return null

  return (
    <div className="background-none" id={anchor}>
      <Wrapper $extraSpacing={!!data.spacing}>
        {cards.map((card) => (
          <Card key={card.id} background={card.designOptions.background} $isSingleCard={isSingleCard}>
            <div>
              <PromoCardsText centered={isSingleCard && width >= 1000} value={card.ingress} />
            </div>
            {card.isLink && <Action action={card.action} />}
          </Card>
        ))}
      </Wrapper>
    </div>
  )
}

export default PromoCards
