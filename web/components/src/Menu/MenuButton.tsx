import { forwardRef, ButtonHTMLAttributes } from 'react'
import styled from 'styled-components'
import { MenuIcon } from './MenuIcon'
import { outlineTemplate, Tokens } from '@utils'

const { outline } = Tokens

export type MenuButtonProps = {
  expanded?: boolean
  title: string
} & ButtonHTMLAttributes<HTMLButtonElement>

const StyledButtonText = styled.span`
  line-height: 1em;
  display: none;

  @media (min-width: 600px) {
    display: block;
  }
`

const StyledMenuButton = styled.button<{ expanded: boolean }>`
  position: relative;
  display: grid;
  grid-template-columns: min-content 1fr;
  align-items: center;
  grid-gap: 13px;
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
  line-height: 1em;

  &[data-focus-visible-added]:focus {
    ${outlineTemplate(outline)}
  }

  ${({ expanded }) =>
    !expanded &&
    `
      &:hover .menuIcon {
        span:nth-child(1) {
          top: 9px;
        }
        span:nth-child(2) {
          top: 21px;
        }
      }
    `}
`

export const MenuButton = forwardRef<HTMLButtonElement, MenuButtonProps>(function MenuButton(
  { expanded = false, title, ...rest },
  ref,
) {
  return (
    <StyledMenuButton expanded={expanded} ref={ref} title={title} {...rest}>
      <StyledButtonText>{title}</StyledButtonText>
      <MenuIcon expanded={expanded} />
    </StyledMenuButton>
  )
})
