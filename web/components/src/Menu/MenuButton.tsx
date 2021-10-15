import { forwardRef, ButtonHTMLAttributes } from 'react'
import styled from 'styled-components'
import { MenuIcon } from './MenuIcon'
import { outlineTemplate, Tokens } from '@utils'

const { outline } = Tokens

export type MenuButtonProps = {
  expanded?: boolean
  title: string
} & ButtonHTMLAttributes<HTMLButtonElement>

const Title = styled.span`
  line-height: 1em;
`

const StyledMenuButton = styled.button<{ expanded: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  gap: 13px;
  margin: 0;
  padding: var(--space-xSmall);
  cursor: pointer;
  background: transparent;
  border: none;
  outline: none;
  color: var(--default-text);
  font-size: var(--typeScale-1);
  font-weight: var(--fontWeight-medium);

  &[data-focus-visible-added]:focus {
    ${outlineTemplate(outline)}
  }

  ${({ expanded }) =>
    !expanded &&
    `
      &:hover .menuIcon {
        span:nth-child(1) {
          top: 3px;
        }
        span:nth-child(2) {
          top: 14px;
        }
      }
    `}
`

export const MenuButton = forwardRef<HTMLButtonElement, MenuButtonProps>(function MenuButton(
  { expanded = false, title, ...rest },
  ref,
) {
  return (
    <StyledMenuButton expanded={expanded} ref={ref} {...rest}>
      <MenuIcon expanded={expanded} />
      <Title>{title}</Title>
    </StyledMenuButton>
  )
})
