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
  word-break: keep-all;

  @media (min-width: 600px) {
    display: block;
  }
`

const StyledMenuButton = styled.button<{ expanded: boolean }>`
  min-width: 48px;
  min-height: 48px;
  position: relative;
  display: grid;
  grid-template-columns: min-content;
  align-items: center;
  justify-content: center;
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

  @media (min-width: 600px) {
    grid-template-columns: min-content 1fr;
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
    <StyledMenuButton
      expanded={expanded}
      ref={ref}
      aria-label={title}
      className="focus:outline-none focus-visible:envis-outline hover:bg-moss-green-60 rounded-md"
      {...rest}
    >
      <StyledButtonText>{title}</StyledButtonText>
      <MenuIcon expanded={expanded} />
    </StyledMenuButton>
  )
})
