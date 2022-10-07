import HeroImage from '../../shared/Hero/HeroImage'
import styled from 'styled-components'
import { Flags } from '../../../common/helpers/datasetHelpers'
import { FullImageHero } from '../../shared/Hero/FullImageHero'
import { DefaultHero } from '../../shared/Hero/DefaultHero'
import { Hero5050 } from '../../shared/Hero/Hero5050'
import { VideoHero } from '../../shared/Hero/VideoHero'
import TitleText from '../../shared/portableText/TitleText'
import { MagazinePageSchema, TopicPageSchema } from '../../../types/types'

const HeroBanner = styled.div`
  padding: var(--space-xLarge) var(--layout-paddingHorizontal-medium);
`

const StyledHeading = styled(TitleText)`
  max-width: 1186px; /* 1920 - (2 * 367) */
  margin-left: auto;
  margin-right: auto;
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

type BannerProps = {
  data: TopicPageSchema | MagazinePageSchema
}

export const SharedBanner = ({ data }: BannerProps) => {
  const Hero = () => {
    if (!data.title) return null

    if (data?.hero.type === 'fullWidthImage') {
      return <FullImageHero title={data.title} ratio={data.hero.ratio as string} heroImage={data.heroImage} />
    } else if (data?.hero.type === 'banner5050') {
      return (
        <Hero5050
          heroTitle={data.hero.title}
          heroIngress={data.hero.ingress}
          heroLink={data.hero.link}
          background={data.background}
          image={data.heroImage.image}
          title={data.title}
        />
      )
    } else if (data?.hero.type === 'videoHero') {
      return <VideoHero videoHero={data.heroVideo} title={data.title} />
    } else {
      return <DefaultHero title={data.title} image={data.heroImage} />
    }
  }
  return (
    <>
      {Flags.IS_DEV ? (
        <Hero />
      ) : (
        <>
          <HeroBanner>{data?.title && <StyledHeading value={data?.title} level="h1" size="2xl" />}</HeroBanner>
          <ImageWrapper>{data?.heroImage && <HeroImage data={data?.heroImage} />}</ImageWrapper>
        </>
      )}
    </>
  )
}
