import { languages } from '../languages'
// Objects
import { Flags } from '../src/lib/datasetHelpers'
// Document types
import documentSchemaTypes from './documents'
import homePage from './documents/homePage'
import textSnippet from './documents/textSnippet'
import accordion from './objects/accordion'
import accordionItem from './objects/accordionItem'
import anchorLink from './objects/anchorLink'
import anchorLinkList from './objects/anchorLinkList/anchorLinkList'
import anchorLinkReference from './objects/anchorLinkList/anchorLinkReference'
import anchorReferenceField from './objects/anchorReferenceField'
import barChart from './objects/BarChartBlock/barChart'
import barChartBlock from './objects/BarChartBlock/barChartBlock'
import breadcrumbs from './objects/Breadcrumbs'
import backgroundOptions from './objects/background/backgroundOptions'
import imageBackground from './objects/background/imageBackground'
import basicIframe from './objects/basicIframe'
import campaignBanner from './objects/campaignBanner'
import card from './objects/card'
import cardsList from './objects/cardsList'
import carouselImage from './objects/carouselImage'
import colorList from './objects/colorList'
import contactList from './objects/contactList'
import cookieDeclaration from './objects/cookieDeclaration'
import downloadableImage from './objects/downloadableImage'
import eventDate from './objects/eventDate'
import excludeFromSearch from './objects/excludeFromSearch'
import factbox from './objects/factbox'
import figure from './objects/figure'
import downloadableFile from './objects/files'
import form from './objects/form'
import fullWidthImage from './objects/fullWidthImage'
import fullWidthVideo from './objects/fullWidthVideo'
import gridTeaser from './objects/grid/cellTypes/gridTeaser'
import gridTextBlock from './objects/grid/cellTypes/gridTextBlock'
import grid from './objects/grid/index'
import threeColumns from './objects/grid/rowTypes/3columns'
import span2and1 from './objects/grid/rowTypes/span2and1'
import span3 from './objects/grid/rowTypes/span3'
import gridColorTheme from './objects/grid/theme'
import hlsVideo from './objects/hlsVideo'
import homepageBanner from './objects/homepageBanner'
import imageWithLinkAndOrOverlay from './objects/ImageWithLinkAndOrOverlay'
import imageWithRichText from './objects/ImageWithRichText'
import iframe from './objects/iframe'
import iframeCarousel from './objects/iframeCarousel'
import imageCarousel from './objects/imageCarousel'
import imageForText from './objects/imageForText'
import imageWithAlt from './objects/imageWithAlt'
import imageWithAltAndCaption from './objects/imageWithAltAndCaption'
import importTable from './objects/importTable'
import keyNumberItem from './objects/keyNumberItem'
import keyNumbers from './objects/keyNumbers'
import keyValue from './objects/keyValue'
import lineChart from './objects/LineChartBlock/lineChart'
import lineChartBlock from './objects/LineChartBlock/lineChartBlock'
import largeTable from './objects/largeTable'
import linkSelector from './objects/linkSelector/linkSelector'
import menuGroup from './objects/menuGroup'
import menuLink from './objects/menuLink'
import newsList from './objects/newsList'
import pieChart from './objects/pieChartBlock/pieChart'
import pieChartBlock from './objects/pieChartBlock/pieChartBlock'
import positionedInlineImage from './objects/positionedInlineImage'
import promoTile from './objects/promoTile'
import promoTileArray from './objects/promoTileArray'
import promoteExternalLinkV2 from './objects/promoteV2/promoteExternalLinkV2'
import promoteTopicsV2 from './objects/promoteV2/promoteTopicsV2'
import promotionsV2 from './objects/promoteV2/promotionV2'
import promoteEvents from './objects/promotion/promoteEvents'
import promoteMagazine from './objects/promotion/promoteMagazine'
import promoteNews from './objects/promotion/promoteNews'
import promotePeople from './objects/promotion/promotePeople'
import promoteTopics from './objects/promotion/promoteTopic'
import promotion from './objects/promotion/promotion'
import pullQuote from './objects/pullQuote'
import relatedLinks from './objects/relatedLinks'
import simpleMenuGroup from './objects/simpleMenuGroup'
import simpleMenuLink from './objects/simpleMenuLink'
import stickyMenu from './objects/stickyMenu'
import stockValuesApi from './objects/stockValuesApi'
import tableV2 from './objects/tableV2'
import tableTheme from './objects/tableV2/tableTheme'
import tabs from './objects/tabs/tabs'
import tabsBackground from './objects/tabs/tabsBackground'
import tabsInfoPanel from './objects/tabs/tabsInfoPanel'
import tabsItem from './objects/tabs/tabsItem'
import tabsKeyNumberItem from './objects/tabs/tabsKeyNumberItem'
import tabsKeyNumbers from './objects/tabs/tabsKeyNumbers'
import teaser from './objects/teaser'
import textBlock from './objects/textBlock'
import textTeaser from './objects/textTeaser'
import textWithIcon from './objects/textWithIcon'
import textWithIconArray from './objects/textWithIconArray'
import themeList from './objects/themeList'
import themeSelector from './objects/themeSelector/themeSelector'
import titleAndMeta from './objects/titleAndMeta'
import transcript from './objects/transcript'
import twitterEmbed from './objects/twitterEmbed'
import videoControls from './objects/videoControls'
import videoFile from './objects/videoFile'
import videoPlayer from './objects/videoPlayer'
import videoPlayerCarousel from './objects/videoPlayerCarousel'

const {
  pageNotFound,
  internalServerError,
  assetFile,
  assetTag,
  countryTag,
  event,
  eventTag,
  landingPage,
  footer,
  externalRedirect,
  localNews,
  localNewsTag,
  magazine,
  magazineTag,
  magazineIndex,
  route,
  redirect,
  newsroom,
  news,
  page,
  tag,
  subMenu,
  siteMenu,
  simpleMenu,
  routeHomepage,
} = documentSchemaTypes

const routeSchemas = languages.map(({ name, title }) => {
  return route(name, title)
})

const MenuSchemas = Flags.HAS_FANCY_MENU
  ? [siteMenu, subMenu, menuGroup, menuLink]
  : [simpleMenu, simpleMenuGroup, simpleMenuLink]
const LocalNewsSchemas = Flags.HAS_LOCAL_NEWS ? [localNews, localNewsTag] : []
const EventSchemas = Flags.HAS_EVENT ? [event, eventDate, eventTag] : []
const LandingPageSchemas = Flags.HAS_LANDING_PAGE ? [landingPage] : []
const NewsSchemas = Flags.HAS_NEWS
  ? [news, newsList, promoteNews, tag, countryTag]
  : []
const NewsRoomSchema = Flags.HAS_NEWSROOM ? [newsroom] : []
const FormSchemas = Flags.HAS_FORMS ? [form] : []
const MagazineSchemas = Flags.HAS_MAGAZINE
  ? [magazine, magazineIndex, magazineTag, promoteMagazine].filter(e => e)
  : []
const RemainingSchemas = [
  page,
  homePage,
  ...routeSchemas,
  routeHomepage,
  pageNotFound,
  internalServerError,
  imageWithAlt,
  imageWithAltAndCaption,
  carouselImage,
  pullQuote,
  factbox,
  relatedLinks,
  positionedInlineImage,
  titleAndMeta,
  downloadableFile,
  downloadableImage,
  teaser,
  textTeaser,
  textBlock,
  accordion,
  accordionItem,
  fullWidthImage,
  fullWidthVideo,
  figure,
  textWithIcon,
  textWithIconArray,
  linkSelector(),
  promoTile,
  promoTileArray,
  stockValuesApi,
  iframe,
  basicIframe,
  footer,
  promotion,
  promoteTopics,
  promoteEvents,
  promotePeople,
  contactList,
  assetFile,
  assetTag,
  cookieDeclaration,
  anchorReferenceField,
  textSnippet,
  largeTable,
  redirect,
  externalRedirect,
  twitterEmbed,
  anchorLink,
  excludeFromSearch,
  videoFile,
  imageCarousel,
  iframeCarousel,
  breadcrumbs,
  colorList,
  videoPlayer,
  videoPlayerCarousel,
  videoControls,
  hlsVideo,
  themeList,
  keyNumbers,
  keyNumberItem,
  keyValue,
  card,
  cardsList,
  backgroundOptions,
  imageBackground,
  grid,
  span3,
  span2and1,
  gridTextBlock,
  campaignBanner,
  gridTeaser,
  threeColumns,
  gridColorTheme,
  transcript,
  anchorLinkList,
  anchorLinkReference,
  imageForText,
  stickyMenu,
  tabs,
  tabsItem,
  tabsBackground,
  tabsInfoPanel,
  tabsKeyNumbers,
  tabsKeyNumberItem,
  imageWithLinkAndOrOverlay,
  imageWithRichText,
  homepageBanner,
  tableV2,
  tableTheme,
  importTable,
  pieChart,
  pieChartBlock,
  lineChart,
  lineChartBlock,
  barChart,
  barChartBlock,
  themeSelector,
  promoteTopicsV2,
  promoteExternalLinkV2,
  promotionsV2,
]

// Then we give our schema to the builder and provide the result to Sanity
export const schemaTypes = [
  ...MenuSchemas,
  ...MagazineSchemas,
  ...LocalNewsSchemas,
  ...EventSchemas,
  ...LandingPageSchemas,
  ...FormSchemas,
  ...NewsSchemas,
  ...NewsRoomSchema,
  ...RemainingSchemas,
]
