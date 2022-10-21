import styled from 'styled-components'
import TitleText from '../../shared/portableText/TitleText'
import type { PortableTextBlock } from '@portabletext/types'

type SharedTitleProps = {
  title: PortableTextBlock[]
}

const TitleWrapper = styled.div`
  padding: var(--space-xLarge) var(--layout-paddingHorizontal-large) 0 var(--layout-paddingHorizontal-large);
`
const StyledHeading = styled(TitleText)`
  max-width: 1186px; /* 1920 - (2 * 367) */
  margin-left: auto;
  margin-right: auto;
`
const SharedTitle = ({ title }: SharedTitleProps) => {
  return (
    <>
      <TitleWrapper>
        <StyledHeading value={title} level="h1" size="2xl" />
      </TitleWrapper>
    </>
  )
}

export default SharedTitle
