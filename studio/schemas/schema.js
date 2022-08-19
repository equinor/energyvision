// First, we must import the schema creator
//eslint-disable-next-line
import createSchema from 'part:@sanity/base/schema-creator'

import { languages } from '../languages'
// Then import schema types from any plugins that might expose them
//eslint-disable-next-line
import schemaTypes from 'all:part:@sanity/base/schema-type'

// Document types
import news from './documents/news'
import page from './documents/page'
import magazine from './documents/magazine'
import redirect from './documents/redirect'
import externalRedirect from './documents/externalRedirect'
import landingPage from './documents/landingPage'
import route from './documents/route'
import routeHomepage from './documents/routeHomepage'
import subMenu from './documents/subMenu'
import siteMenu from './documents/siteMenu'
import footer from './documents/footer'
import tag from './documents/tag'
import countryTag from './documents/countryTag'
import magazineTag from './documents/magazineTag'
import event from './documents/event'
import assetFile from './documents/assetFile'
import assetTag from './documents/assetTag'
import simpleMenu from './documents/simpleMenu'
import pageNotFound from './documents/404'
import internalServerError from './documents/500'
import localNews from './documents/localNews'
import localNewsTag from './documents/localNewsTag'
import newsroom from './documents/newsroom'
import magazineIndex from './documents/magazineIndexPage'

// Objects
import imageWithAlt from './objects/imageWithAlt'
import imageWithAltAndCaption from './objects/imageWithAltAndCaption'
import pullQuote from './objects/pullQuote'
import factbox from './objects/factbox'
import relatedLinks from './objects/relatedLinks'
import positionedInlineImage from './objects/positionedInlineImage'
import titleAndMeta from './objects/titleAndMeta'
import downloadableFile from './objects/files'
import downloadableImage from './objects/downloadableImage'
import teaser from './objects/teaser'
import textBlock from './objects/textBlock'
import accordion from './objects/accordion'
import accordionItem from './objects/accordionItem'
import fullWidthImage from './objects/fullWidthImage'
import figure from './objects/figure'
import textWithIcon from './objects/textWithIcon'
import textWithIconArray from './objects/textWithIconArray'
import linkSelector from './objects/linkSelector'
import promoTile from './objects/promoTile'
import promoTileArray from './objects/promoTileArray'
import stockValuesApi from './objects/stockValuesApi'
import menuGroup from './objects/menuGroup'
import menuLink from './objects/menuLink'
import basicIframe from './objects/basicIframe'
import iframe from './objects/iframe'
import promotion from './objects/promotion/promotion'
import promoteNews from './objects/promotion/promoteNews'
import promoteTopics from './objects/promotion/promoteTopic'
import promotePeople from './objects/promotion/promotePeople'
import promoteEvents from './objects/promotion/promoteEvents'
import form from './objects/form'
import contactList from './objects/contactList'
import eventDate from './objects/eventDate'
import table from './objects/table'
import simpleMenuGroup from './objects/simpleMenuGroup'
import simpleMenuLink from './objects/simpleMenuLink'
import cookieDeclaration from './objects/cookieDeclaration'
import anchorReferenceField from './objects/anchorReferenceField'
import textSnippet from './documents/textSnippet'
import largeTable from './objects/largeTable'
import newsList from './objects/newsList'
import excludeFromSearch from './objects/excludeFromSearch'
import {
  HAS_EVENT,
  HAS_FANCY_MENU,
  HAS_FORMS,
  HAS_LANDING_PAGE,
  HAS_LOCAL_NEWS,
  HAS_MAGAZINE,
  HAS_NEWS,
  HAS_NEWSROOM,
  IS_TEST,
} from '../src/lib/datasetHelpers'
import twitterEmbed from './objects/twitterEmbed'
import anchorLink from './objects/anchorLink'
import video from './objects/video'

const routeSchemas = languages.map(({ name, title }) => {
  return route(name, title)
})

const routeHomepageSchemas = languages.map(({ name, title }) => {
  return routeHomepage(name, title)
})

const MenuSchemas = HAS_FANCY_MENU
  ? [siteMenu, subMenu, menuGroup, menuLink]
  : [simpleMenu, simpleMenuGroup, simpleMenuLink]
const LocalNewsSchemas = HAS_LOCAL_NEWS ? [localNews, localNewsTag] : []
const EventSchemas = HAS_EVENT ? [event, eventDate] : []
const LandingPageSchemas = HAS_LANDING_PAGE ? [landingPage] : []
const NewsSchemas = HAS_NEWS ? [news, newsList, promoteNews, tag, countryTag] : []
const NewsRoomSchema = HAS_NEWSROOM ? [newsroom] : []
const FormSchemas = HAS_FORMS ? [form] : []
const MagazineSchemas = HAS_MAGAZINE ? [magazine, magazineIndex, IS_TEST && magazineTag].filter((e) => e) : []
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
  textBlock,
  accordion,
  accordionItem,
  fullWidthImage,
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
  video,
  excludeFromSearch,
]

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: 'default',
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    ...MenuSchemas,
    ...MagazineSchemas,
    ...LocalNewsSchemas,
    ...EventSchemas,
    ...LandingPageSchemas,
    ...FormSchemas,
    ...NewsSchemas,
    ...NewsRoomSchema,
    ...RemainingSchemas,
  ]),
})
