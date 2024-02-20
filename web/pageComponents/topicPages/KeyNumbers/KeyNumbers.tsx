import { KeyNumbersData } from '../../../types'
import { BackgroundContainer } from '@components/Backgrounds'
import styled from 'styled-components'
import TitleText from '../../shared/portableText/TitleText'
import IngressText from '../../shared/portableText/IngressText'
import KeyNumberItem from './KeyNumberItem'
import ReadMoreLink from '../../../pageComponents/shared/ReadMoreLink'
import RichText from '../../shared/portableText/RichText'
import { Carousel } from '../../shared/Carousel'
import { useMediaQuery } from '../../../lib/hooks/useMediaQuery'

const Disclaimer = styled.div`
  @media (min-width: 1300px) {
    margin-right: var(--layout-paddingHorizontal-large);
  }
  margin-bottom: var(--space-large);
`
const StyledHeading = styled(TitleText)`
  padding: 0 0 var(--space-large) 0;
  text-align: left;
`
const Ingress = styled.div`
  @media (min-width: 1300px) {
    margin-right: var(--layout-paddingHorizontal-large);
  }
  margin-bottom: var(--space-xLarge);
`
const StyledBackgroundContainer = styled(BackgroundContainer)`
  padding: var(--space-3xLarge) var(--layout-paddingHorizontal-small); ;
`
const HorizontalWrapper = styled.div`
  --card-maxWidth: 280px;
  padding-bottom: var(--space-large);

  @media (min-width: 800px) {
    --card-maxWidth: 400px;
  }
`
const Container = styled.div`
  display: grid;
  gap: var(--space-large);
  margin-bottom: var(--space-large);
  grid-template-columns: repeat(1, 1fr);
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (min-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }
`

type KeyNumbersProps = {
  data: KeyNumbersData
  anchor?: string
}
export default function ({ data, anchor }: KeyNumbersProps) {
  const { title, items, designOptions, ingress, action, disclaimer, useHorizontalScroll } = data
  const isMobile = useMediaQuery(`(max-width: 800px)`)

  const renderScroll = useHorizontalScroll && isMobile
  const Wrapper = renderScroll
    ? ({ children }: { children: React.ReactNode }) => (
        <HorizontalWrapper>
          <Carousel horizontalPadding>{children}</Carousel>
        </HorizontalWrapper>
      )
    : Container
  return (
    <StyledBackgroundContainer background={designOptions.background} id={anchor}>
      {title && <StyledHeading value={title} />}
      {ingress && (
        <Ingress>
          <IngressText value={ingress}></IngressText>
        </Ingress>
      )}

      <Wrapper>
        {items.map((item) => (
          <KeyNumberItem isScrollable={renderScroll} key={item.id} {...item} />
        ))}
      </Wrapper>

      {disclaimer && (
        <Disclaimer>
          <RichText value={disclaimer} />
        </Disclaimer>
      )}
      {action && <ReadMoreLink action={action} />}
    </StyledBackgroundContainer>
  )
}
