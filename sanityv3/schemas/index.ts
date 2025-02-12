import { languages } from '../languages'

// Document types
import documentSchemaTypes from './documents'

// Objects
import { Flags } from '../src/lib/datasetHelpers'
import textSnippet from './documents/textSnippet'
import accordion from './objects/accordion'
import accordionItem from './objects/accordionItem'
import anchorLink from './objects/anchorLink'
import anchorReferenceField from './objects/anchorReferenceField'
import basicIframe from './objects/basicIframe'
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
import iframe from './objects/iframe'
import imageWithAlt from './objects/imageWithAlt'
import imageWithAltAndCaption from './objects/imageWithAltAndCaption'
import largeTable from './objects/largeTable'
import linkSelector from './objects/linkSelector'
import menuGroup from './objects/menuGroup'
import menuLink from './objects/menuLink'
import newsList from './objects/newsList'
import positionedInlineImage from './objects/positionedInlineImage'
import promoTile from './objects/promoTile'
import promoTileArray from './objects/promoTileArray'
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
import stockValuesApi from './objects/stockValuesApi'
import table from './objects/table'
import tableRichText from './objects/table/tableRichText'
import teaser from './objects/teaser'
import textTeaser from './objects/textTeaser'
import textBlock from './objects/textBlock'
import textWithIcon from './objects/textWithIcon'
import textWithIconArray from './objects/textWithIconArray'
import titleAndMeta from './objects/titleAndMeta'
import twitterEmbed from './objects/twitterEmbed'
import videoFile from './objects/videoFile'
import imageCarousel from './objects/imageCarousel'
import iframeCarousel from './objects/iframeCarousel'
import breadcrumbs from './objects/Breadcrumbs'
import colorList from './objects/colorList'
import videoPlayer from './objects/videoPlayer'
import videoPlayerCarousel from './objects/videoPlayerCarousel'
import videoControls from './objects/videoControls'
import hlsVideo from './objects/hlsVideo'
import themeList from './objects/themeList'
import keyNumbers from './objects/keyNumbers'
import keyNumberItem from './objects/keyNumberItem'
import keyValue from './objects/keyValue'
import card from './objects/card'
import cardsList from './objects/cardsList'
import backgroundOptions from './objects/background/backgroundOptions'
import imageBackground from './objects/background/imageBackground'
import grid from './objects/grid/index'
import span3 from './objects/grid/rowTypes/span3'
import span2and1 from './objects/grid/rowTypes/span2and1'
import gridTextBlock from './objects/grid/cellTypes/gridTextBlock'
import campaignBanner from './objects/campaignBanner'
import gridTeaser from './objects/grid/cellTypes/gridTeaser'
import threeColumns from './objects/grid/rowTypes/3columns'
import gridColorTheme from './objects/grid/theme'
import transcript from './objects/transcript'
import anchorLinkList from './objects/anchorLinkList/anchorLinkList'
import anchorLinkReference from './objects/anchorLinkList/anchorLinkReference'
import imageForText from './objects/imageForText'
import stickyMenu from './objects/stickyMenu'

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

const routeHomepageSchemas = languages.map(({ name, title }) => {
  return routeHomepage(name, title)
})

const MenuSchemas = Flags.HAS_FANCY_MENU
  ? [siteMenu, subMenu, menuGroup, menuLink]
  : [simpleMenu, simpleMenuGroup, simpleMenuLink]
const LocalNewsSchemas = Flags.HAS_LOCAL_NEWS ? [localNews, localNewsTag] : []
const EventSchemas = Flags.HAS_EVENT ? [event, eventDate, eventTag] : []
const LandingPageSchemas = Flags.HAS_LANDING_PAGE ? [landingPage] : []
const NewsSchemas = Flags.HAS_NEWS ? [news, newsList, promoteNews, tag, countryTag] : []
const NewsRoomSchema = Flags.HAS_NEWSROOM ? [newsroom] : []
const FormSchemas = Flags.HAS_FORMS ? [form] : []
const MagazineSchemas = Flags.HAS_MAGAZINE
  ? [magazine, magazineIndex, magazineTag, promoteMagazine].filter((e) => e)
  : []
const RemainingSchemas = [
  page,
  ...routeSchemas,
  ...routeHomepageSchemas,
  pageNotFound,
  internalServerError,
  imageWithAlt,
  imageWithAltAndCaption,
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
  linkSelector,
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
  table,
  tableRichText,
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
