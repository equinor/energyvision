import type { ImageWithCaptionData } from '../../../types/types'
import styled from 'styled-components'
import DefaulHeroImage from './DefaultHeroImage'
import { PortableTextBlock } from '@portabletext/types'
import TitleText from '../portableText/TitleText'

const StyledHeading = styled(TitleText)`
  max-width: 1186px; /* 1920 - (2 * 367) */
  margin-left: auto;
  margin-right: auto;
`

const HeroBanner = styled.div`
  padding: var(--space-xLarge) var(--layout-paddingHorizontal-medium);
`

const ImageWrapper = styled.div.attrs(() => ({
  className: 'background-image',
}))`
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
}

export const DefaultHero = ({ title, image }: Props) => {
  return (
    <>
      <HeroBanner>{title && <StyledHeading value={title} level="h1" size="2xl" />}</HeroBanner>
      <ImageWrapper>{image && <DefaulHeroImage data={image} />}</ImageWrapper>
    </>
  )
}
