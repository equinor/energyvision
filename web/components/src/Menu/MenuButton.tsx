import { forwardRef } from 'react'
import styled from 'styled-components'
import { Icon, Button, ButtonProps } from '@equinor/eds-core-react'
import { clear, menu } from '@equinor/eds-icons'

export type MenuButtonProps = Omit<ButtonProps, 'color' | 'variant'> & {
  expanded?: boolean
  /** The text for the menu button, visually hidden on small screens */
  title: string
}

const StyledIcon = styled(Icon)``

const Title = styled.span``

const StyledMenuButton = styled(Button)`
  color: var(--default-text);
  fill: var(--default-text);
`

export const MenuButton = forwardRef<HTMLButtonElement, MenuButtonProps>(function MenuButton(
  { expanded = false, title, ...rest },
  ref,
) {
  const iconSize = 24
  return (
    <StyledMenuButton variant="ghost" ref={ref} {...rest}>
      <Title>{title}</Title>
      {expanded ? <StyledIcon size={iconSize} data={clear} /> : <StyledIcon size={iconSize} data={menu} />}
    </StyledMenuButton>
  )
})
