import { BackgroundContainer, BackgroundContainerProps } from '@components/Backgrounds'
import { ReactNode, CSSProperties } from 'react'
import styled from 'styled-components'

/* If we need this for e.g. the search, let's move it to components folder */
const StyledTopbarDropdown = styled(BackgroundContainer)`
  position: fixed;
  overflow: auto;
  left: 0;
  top: 0;
  right: var(--right);
  bottom: 0;
`
type Props = {
  right?: string
  children: ReactNode
} & BackgroundContainerProps

export const TopbarDropdown = ({ children, right = '15px', style, ...rest }: Props) => {
  return (
    <StyledTopbarDropdown
      style={
        {
          ...style,
          '--right': right,
        } as CSSProperties
      }
      {...rest}
    >
      {children}
    </StyledTopbarDropdown>
  )
}
