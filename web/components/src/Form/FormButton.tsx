import { forwardRef } from 'react'
import styled from 'styled-components'
import { Button as EdsButton, ButtonProps as EdsButtonProps } from '@equinor/eds-core-react'

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: right;
  padding: var(--space-medium) 0px var(--space-medium) 0px;
`

const StyledEdsButton = styled(EdsButton)`
  padding-left: var(--space-xLarge);
  padding-right: var(--space-xLarge);
`

export const FormButton = forwardRef<HTMLDivElement, EdsButtonProps>(function Button({ children, ...rest }, ref) {
  return (
    <ButtonWrapper>
      <StyledEdsButton ref={ref} {...rest}>
        {children}
      </StyledEdsButton>
    </ButtonWrapper>
  )
})
