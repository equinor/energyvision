import { KeyNumbersData } from '../../../types'
import { BackgroundContainer } from '@components/Backgrounds'
import styled from 'styled-components'
import TitleText from '../../shared/portableText/TitleText'
import IngressText from '../../shared/portableText/IngressText'
import KeyNumberItem from './KeyNumberItem'
import ReadMoreLink from '../../../pageComponents/shared/ReadMoreLink'
import RichText from '../../shared/portableText/RichText'
import { Carousel } from '../../shared/Carousel'
import useWindowSize from '../../../lib/hooks/useWindowSize'

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
  display: flex;
  gap: var(--space-large);
  flex-wrap: wrap;
  margin-bottom: var(--space-large);
`
type KeyNumbersProps = {
  data: KeyNumbersData
  anchor?: string
}
export default function ({ data, anchor }: KeyNumbersProps) {
  const { title, items, designOptions, ingress, action, disclaimer, useHorizontalScroll } = data
  const { width } = useWindowSize()

  const renderScroll = useHorizontalScroll && Boolean(width && width <= 800)
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
          <KeyNumberItem key={item.id} {...item} />
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
