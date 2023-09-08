import pageNotFound from './404'
import internalServerError from './500'
import assetFile from './assetFile'
import assetTag from './assetTag'
import countryTag from './countryTag'
import event from './event'
import eventTag from './eventTag'
import externalRedirect from './externalRedirect'
import footer from './footer'
import landingPage from './landingPage'
import localNews from './localNews'
import localNewsTag from './localNewsTag'
import magazine from './magazine'
import magazineIndex from './magazineIndexPage'
import magazineTag from './magazineTag'
import news from './news'
import newsroom from './newsroom'
import page from './page'
import redirect from './redirect'
import route from './route'
import routeHomepage from './routeHomepage'
import simpleMenu from './simpleMenu'
import siteMenu from './siteMenu'
import subMenu from './subMenu'
import tag from './tag'

export const documentsWithI18n = {
  pageNotFound,
  internalServerError,
  event,
  landingPage,
  localNews,
  magazine,
  magazineIndex,
  news,
  newsroom,
  page,
}
export default {
  ...documentsWithI18n,
  assetFile,
  assetTag,
  countryTag,
  eventTag,
  redirect,
  tag,
  subMenu,
  siteMenu,
  simpleMenu,
  routeHomepage,
  externalRedirect,
  footer,
  localNewsTag,
  magazineTag,
  route,
}
