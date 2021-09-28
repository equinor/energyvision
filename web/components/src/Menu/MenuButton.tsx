import { forwardRef } from 'react'
import styled from 'styled-components'
import { Icon, Button, ButtonProps } from '@equinor/eds-core-react'
import { clear, menu } from '@equinor/eds-icons'

export type MenuButtonProps = Omit<ButtonProps, 'color' | 'variant'> & {
  /** Do we want to make it explicit like this? Or just aria-expanded from button */
  ariaExpanded: boolean
  /** The text for the menu button, visually hidden on small screens */
  title: string
}

const StyledIcon = styled(Icon)`
  fill: var(--default-text);
`

const Title = styled.span`
  color: var(--default-text);
  @media (max-width: 800px) {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }
`

export const MenuButton = forwardRef<HTMLButtonElement, MenuButtonProps>(function MenuButton(
  { ariaExpanded, title, ...rest },
  ref,
) {
  const iconSize = 24
  return (
    <Button variant="ghost" aria-expanded={ariaExpanded} ref={ref} {...rest}>
      <Title>{title}</Title>
      {ariaExpanded ? <StyledIcon size={iconSize} data={clear} /> : <StyledIcon size={iconSize} data={menu} />}
    </Button>
  )
})
