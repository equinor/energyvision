import styled from 'styled-components'
import type { PageSchema } from '../../types/types'
import { Heading } from '@components'
import HeroImage from '../shared/HeroImage'
import Teaser from '../topicPages/Teaser'
import TextBlock from '../topicPages/TextBlock'
import FullWidthImage from '../topicPages/FullWidthImage'
import Figure from '../topicPages/Figure'
import TextWithIconArray from '../topicPages/TextWithIconArray'
import PageQuote from '../topicPages/PageQuote'
import AccordionBlock from '../topicPages/Accordion/AccordionBlock'
import PromoTileArray from '../topicPages/PromoTileArray'
import {
  TeaserData,
  TextBlockData,
  FullWidthImageData,
  FigureData,
  TextWithIconArrayData,
  CallToActionData,
  QuoteData,
  AccordionData,
  PromoTileArrayData,
} from '../../types/types'

const TopicPageLayout = styled.div`
  --banner-paddingHorizontal: clamp(16px, calc(-69.1942px + 22.7184vw), 367px);
  /* @TODO: Find a good value here */
  --banner-paddingVertical: clamp(16px, calc(-38.3689px + 14.4984vw), 250px);
`

const HeroBanner = styled.div`
  padding: var(--banner-paddingVertical) var(--layout-paddingHorizontal-medium) var(--space-xLarge)
    var(--layout-paddingHorizontal-medium);
  padding: var(--space-xLarge) var(--layout-paddingHorizontal-large);
`

const StyledHeading = styled(Heading)`
  max-width: 1186px; /* 1920 - (2 * 367) */
  margin-left: auto;
  margin-right: auto;
`

const Image = styled.div`
  padding: 0 var(--layout-paddingHorizontal-small) var(--space-3xLarge) var(--layout-paddingHorizontal-small);
  max-width: 1920px;
  margin-left: auto;
  margin-right: auto;

  & > figure {
    margin: 0;
  }
`

type TopicPageProps = {
  data: PageSchema
}

// How could we do this for several different component types?
type ComponentProps =
  | TeaserData
  | TextBlockData
  | FullWidthImageData
  | FigureData
  | TextWithIconArrayData
  | CallToActionData
  | QuoteData
  | AccordionData
  | PromoTileArrayData

const TopicPage = ({ data }: TopicPageProps) => {
  const content = (data?.content || []).map((c: ComponentProps) => {
    switch (c.type) {
      case 'teaser':
        return <Teaser key={c.id} data={c as TeaserData} />
      case 'textBlock':
        return <TextBlock key={c.id} data={c as TextBlockData} />
      case 'fullWidthImage':
        return <FullWidthImage key={c.id} data={c as FullWidthImageData} />
      case 'figure':
        return <Figure key={c.id} data={c as FigureData} />
      case 'textWithIconArray':
        return <TextWithIconArray key={c.id} data={c as TextWithIconArrayData} />
      case 'pullQuote':
        return <PageQuote key={c.id} data={c as QuoteData} />
      case 'accordion':
        return <AccordionBlock key={c.id} data={c as AccordionData} />
      case 'promoTileArray':
        return <PromoTileArray key={c.id} data={c as PromoTileArrayData} />
      default:
        return null
    }
  })
  return (
    <TopicPageLayout>
      <HeroBanner>
        <StyledHeading level="h1" size="2xl">
          {data?.title}
        </StyledHeading>
      </HeroBanner>
      <Image>{data?.heroImage && <HeroImage data={data?.heroImage} />}</Image>
      {content}
    </TopicPageLayout>
  )
}

export default TopicPage
