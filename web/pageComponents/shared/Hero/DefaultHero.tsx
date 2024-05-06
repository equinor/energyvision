import type { ImageWithCaptionData } from '../../../types/types'
import styled from 'styled-components'
import DefaulHeroImage from './DefaultHeroImage'
import { PortableTextBlock } from '@portabletext/types'
import TitleText from '../portableText/TitleText'
import { BackgroundContainer } from '@components/Backgrounds'

const StyledHeading = styled(TitleText)`
  max-width: 1186px; /* 1920 - (2 * 367) */
  margin-left: auto;
  margin-right: auto;
`

const HeroBannerSmall = styled.div`
  margin-left: auto;
  margin-right: auto;
  max-width: 1920px;
  padding: var(--space-xLarge) var(--space-3xLarge) 0 var(--layout-paddingHorizontal-small);
`
const HeroBannerBigTitle = styled.div`
  margin-left: auto;
  margin-right: auto;
  max-width: 1920px;
  padding: var(--space-xLarge) var(--layout-paddingHorizontal-small);
`
const HeroBanner = styled.div`
  padding: var(--space-xLarge) var(--layout-paddingHorizontal-medium);
`

const ImageWrapper = styled(BackgroundContainer)`
  padding: 0 var(--layout-paddingHorizontal-small) var(--space-3xLarge) var(--layout-paddingHorizontal-small);
  max-width: 1920px;
  margin-left: auto;
  margin-right: auto;
  & > figure {
    margin: 0;
  }
`

type Props = {
  title?: PortableTextBlock[]
  image?: ImageWithCaptionData
  isBigTitle?: boolean
  bigTitle?: PortableTextBlock[]
}

export const DefaultHero = ({ title, image, isBigTitle, bigTitle }: Props) => {
  console.log('isBigTitle', isBigTitle)
  console.log('bigTitle', bigTitle)
  console.log('title', title)
  return (
    <>
      {isBigTitle && (
        <>
          <HeroBannerSmall>{title && <TitleText value={title} level="h1" size="xl" />}</HeroBannerSmall>
          <HeroBannerBigTitle>{bigTitle && <TitleText value={bigTitle} level="h2" size="3xl" />}</HeroBannerBigTitle>
        </>
      )}
      {!isBigTitle && <HeroBanner>{title && <StyledHeading value={title} level="h1" size="3xl" />}</HeroBanner>}
      <ImageWrapper>{image && <DefaulHeroImage data={image} />}</ImageWrapper>
    </>
  )
}
