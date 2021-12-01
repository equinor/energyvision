import { forwardRef, HTMLAttributes } from 'react'
import { Heading } from '../Heading'

import styled from 'styled-components'

const StyledTitle = styled.div`
  margin-left: 0;
`

const StyledHeading = styled(Heading)`
  margin-bottom: 0;
`

export type TitleProps = {
  /* Header level */
  level?: 'h2' | 'h3' | 'h4' | 'h5'
} & HTMLAttributes<HTMLHeadingElement>

export const Title = forwardRef<HTMLDivElement, TitleProps>(function Title({ level = 'h3', children, ...rest }, ref) {
  return (
    <StyledTitle ref={ref} {...rest}>
      <StyledHeading level={level} size="lg">
        {children}
      </StyledHeading>
    </StyledTitle>
  )
})
