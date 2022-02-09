import { ElementType, LabelHTMLAttributes } from 'react'
import styled from 'styled-components'

const Hidden = styled.label`
  position: absolute !important;
  overflow: hidden;
  clip: rect(1px, 1px, 1px, 1px);
  width: 1px;
  height: 1px;
  word-wrap: normal;
`
type Props = {
  children: React.ReactNode
  /** Change html element. Label is default*/
  as?: ElementType
} & LabelHTMLAttributes<HTMLLabelElement>

const VisuallyHidden = ({ children, as = 'label', ...rest }: Props) => {
  return (
    <Hidden as={as} {...rest}>
      {children}
    </Hidden>
  )
}

export default VisuallyHidden
