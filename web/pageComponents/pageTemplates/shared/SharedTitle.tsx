import styled from 'styled-components'
import TitleText from '../../shared/portableText/TitleText'
import type { PortableTextBlock } from '@portabletext/types'
import { BackgroundContainer, BackgroundContainerProps } from '@components/Backgrounds'

type SharedTitleProps = {
  sharedTitle: PortableTextBlock[]
} & BackgroundContainerProps

const StyledHeading = styled(TitleText)`
  padding: var(--space-xLarge) var(--layout-paddingHorizontal-large);
  max-width: var(--maxViewportWidth);
  margin-left: auto;
  margin-right: auto;
`

const SharedTitle = ({ sharedTitle, background }: SharedTitleProps) => {
  return (
    <BackgroundContainer background={background}>
      <StyledHeading value={sharedTitle} level="h1" size="3xl" />
    </BackgroundContainer>
  )
}

export default SharedTitle
