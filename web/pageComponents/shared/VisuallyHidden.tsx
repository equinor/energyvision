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
}

const VisuallyHidden = ({ children }: Props) => {
  return <Hidden>{children}</Hidden>
}

export default VisuallyHidden
