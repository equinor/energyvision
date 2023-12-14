import { ReactNode, CSSProperties, HTMLAttributes } from 'react'
import styled from 'styled-components'

/* If we need this for e.g. the search, let's move it to components folder */
const StyledTopbarDropdown = styled.div`
  position: fixed;
  background: var(--bg-default);
  overflow: auto;
  display: var(--display);
  z-index: 50;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
`
type Props = {
  isOpen: boolean
  children: ReactNode
} & HTMLAttributes<HTMLDivElement>

export const TopbarDropdown = ({ isOpen, children, ...rest }: Props) => {
  return (
    <StyledTopbarDropdown
      style={
        {
          '--display': isOpen ? 'block' : 'none',
        } as CSSProperties
      }
      {...rest}
    >
      {children}
    </StyledTopbarDropdown>
  )
}
