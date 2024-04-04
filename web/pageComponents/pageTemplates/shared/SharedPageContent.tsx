import Teaser from '../../shared/Teaser'
import TextBlock from '../../topicPages/TextBlock'
import FullWidthImage from '../../topicPages/FullWidthImage'
import FullWidthVideo from '../../topicPages/FullWidthVideo'
import Figure from '../../topicPages/Figure'
import TextWithIconArray from '../../topicPages/TextWithIconArray'
import PageQuote from '../../topicPages/PageQuote'
import AccordionBlock from '../../topicPages/Accordion/AccordionBlock'
import PromoTileArray from '../../topicPages/PromoTileArray'
import IFrame from '../../topicPages/IFrame'
import Promotion from '../../topicPages/Promotion'
import Form from '../../topicPages/Form/Form'
import Table from '../../topicPages/Table'
import NewsList from '../../topicPages/NewsList'
import StockValues from '../../topicPages/StockValues'
import CookieDeclaration from '../../topicPages/CookieDeclaration'
import TwitterEmbed from '../../topicPages/TwitterEmbed'
import ImageCarousel from '../../shared/ImageCarousel/ImageCarousel'
import IframeCarousel from '../../shared/IframeCarousel/IframeCarousel'
import VideoPlayer from '../../shared/VideoPlayer'
import VideoPlayerCarousel from '../../shared/VideoPlayerCarousel'
import TextTeaser from '../../shared/textTeaser/TextTeaser'
import KeyNumbers from '../../topicPages/KeyNumbers/KeyNumbers'
import CardsList from '../../../sections/cards/CardsList/CardsList'
import {
  AnchorLinkData,
  TopicPageSchema,
  MagazinePageSchema,
  TeaserData,
  TextBlockData,
  FullWidthImageData,
  FullWidthVideoData,
  FigureData,
  TextWithIconArrayData,
  CallToActionData,
  QuoteData,
  AccordionData,
  PromoTileArrayData,
  IFrameData,
  PromotionData,
  FormData,
  TableData,
  NewsListData,
  StockValuesData,
  TwitterEmbedData,
  CookieDeclarationData,
  ImageCarouselData,
  IframeCarouselData,
  VideoPlayerData,
  VideoPlayerCarouselData,
  TextTeaserData,
  KeyNumbersData,
  CardsListData,
} from '../../../types/types'

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
  | IFrameData
  | PromotionData
  | FormData
  | TableData
  | StockValuesData
  | TwitterEmbedData
  | AnchorLinkData
  | VideoPlayerData
  | VideoPlayerCarouselData
  | CookieDeclarationData
  | TextTeaserData
  | KeyNumbersData

type PageContentProps = { data: TopicPageSchema | MagazinePageSchema }

export const PageContent = ({ data }: PageContentProps) => {
  const content = (data?.content || []).map((c: ComponentProps, index) => {
    const prevComponent = data?.content?.[index - 1]
    const anchorReference =
      (prevComponent as unknown as ComponentProps)?.type === 'anchorLink'
        ? (prevComponent as unknown as AnchorLinkData)?.anchorReference
        : undefined
    switch (c.type) {
      case 'teaser':
        return <Teaser key={c.id} data={c as TeaserData} anchor={anchorReference} />
      case 'textTeaser':
        return <TextTeaser key={c.id} data={c as TextTeaserData} anchor={anchorReference} />
      case 'textBlock':
        return <TextBlock key={c.id} data={c as TextBlockData} anchor={anchorReference} />
      case 'fullWidthImage':
        return <FullWidthImage key={c.id} data={c as FullWidthImageData} anchor={anchorReference} />
      case 'fullWidthVideo':
        return <FullWidthVideo key={c.id} data={c as FullWidthVideoData} anchor={anchorReference} />
      case 'figure':
        return <Figure key={c.id} data={c as FigureData} anchor={anchorReference} />
      case 'textWithIconArray':
        return <TextWithIconArray key={c.id} data={c as TextWithIconArrayData} anchor={anchorReference} />
      case 'pullQuote':
        return <PageQuote key={c.id} data={c as QuoteData} anchor={anchorReference} />
      case 'accordion':
        return <AccordionBlock key={c.id} data={c as AccordionData} anchor={anchorReference} />
      case 'promoTileArray':
        return <PromoTileArray key={c.id} data={c as PromoTileArrayData} anchor={anchorReference} />
      case 'iframe':
        return <IFrame key={c.id} data={c as IFrameData} anchor={anchorReference} />
      case 'promotion':
        return <Promotion key={c.id} data={c as PromotionData} anchor={anchorReference} />
      case 'form':
        return <Form key={c.id} data={c as FormData} anchor={anchorReference} />
      case 'table':
        return <Table key={c.id} data={c as TableData} anchor={anchorReference} />
      case 'cookieDeclaration':
        return <CookieDeclaration key={c.id} data={c as CookieDeclarationData} anchor={anchorReference} />
      case 'newsList':
        return <NewsList key={c.id} data={c as unknown as NewsListData} anchor={anchorReference} />
      case 'stockValuesApi':
        return <StockValues key={c.id} data={c as StockValuesData} anchor={anchorReference} />
      case 'twitterEmbed':
        return <TwitterEmbed key={c.id} data={c as TwitterEmbedData} anchor={anchorReference} />
      case 'imageCarousel':
        return <ImageCarousel key={c.id} data={c as ImageCarouselData} anchor={anchorReference} />
      case 'iframeCarousel':
        return <IframeCarousel key={c.id} data={c as IframeCarouselData} anchor={anchorReference} />
      case 'videoPlayer':
        return <VideoPlayer key={c.id} data={c as VideoPlayerData} anchor={anchorReference} />
      case 'videoPlayerCarousel':
        return <VideoPlayerCarousel key={c.id} data={c as VideoPlayerCarouselData} anchor={anchorReference} />
      case 'keyNumbers':
        return <KeyNumbers key={c.id} data={c as KeyNumbersData} anchor={anchorReference} />
      case 'cardsList':
        return <CardsList key={c.id} data={c as CardsListData} anchor={anchorReference} />
      default:
        return null
    }
  })
  return <>{content}</>
}
