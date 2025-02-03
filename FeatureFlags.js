/**
 * Feature flags are used on a dataset-basis instead of per
 * environment basis. To add a feature to a specifc dataset,
 * simply add the dataset name to the feature array.
 */
const GLOBAL_PROD = ['global', 'secret', 'global-test']
const GLOBAL_DEV = ['global-development', 'global-test']
const SATELLITES = [
  'argentina',
  'brazil',
  'celticsea',
  'equinorfunds',
  'germany',
  'japan',
  'poland',
  'southkorea',
  'storage',
]
const NEWS = [
  ...GLOBAL_DEV,
  ...GLOBAL_PROD,
  'japan',
  'poland',
  'brazil',
  'germany',
  'southkorea',
  'celticsea',
]
const ARCHIVED_NEWS = [...GLOBAL_PROD, ...GLOBAL_DEV]
const NEWS_SUBSCRIPTION = [...GLOBAL_PROD, ...GLOBAL_DEV]
const MAGAZINE_SUBSCRIPTION = [...GLOBAL_DEV, ...GLOBAL_PROD]
const NEWSROOM = [...GLOBAL_PROD, ...GLOBAL_DEV]
const MAGAZINE_INDEX = [...GLOBAL_PROD, ...GLOBAL_DEV]
const LOCAL_NEWS = [...GLOBAL_PROD, ...GLOBAL_DEV]
const SEARCH = [...GLOBAL_PROD, ...GLOBAL_DEV]
const EVENT = [...GLOBAL_PROD, ...GLOBAL_DEV]

const SUBSCRIBE_FORM = [...GLOBAL_PROD, ...GLOBAL_DEV]
const CAREERS_CONTACT_FORM = [...GLOBAL_PROD, ...GLOBAL_DEV]
const CONTACT_EQUINOR_FORM = [...GLOBAL_PROD, ...GLOBAL_DEV]
const ORDER_REPORT_FORM = [...GLOBAL_PROD, ...GLOBAL_DEV]
const CAREER_FAIR_AND_VISITS_FORM = [...GLOBAL_PROD, ...GLOBAL_DEV, 'brazil']
const PENSION_FORM = [...GLOBAL_PROD, ...GLOBAL_DEV]

const FANCY_MENU = [...GLOBAL_PROD, ...GLOBAL_DEV]
/* LANDING_PAGE requires FANCY_MENU to work */
const LANDING_PAGE = [...GLOBAL_PROD, ...GLOBAL_DEV]
const TWITTER_FEED = [...GLOBAL_DEV, 'germany']
const MAGAZINE = [...GLOBAL_PROD, ...GLOBAL_DEV]
/* Allows same slug for different languages */
const SAME_SLUG = [...GLOBAL_DEV, 'japan', 'southkorea']
const LINE_BREAK_TYPO = ['southkorea']
const CAMPAIGN = [...GLOBAL_PROD, ...GLOBAL_DEV]

/**
 * @param {string} dataset
 */
export default (dataset) => ({
  HAS_NEWS: NEWS.includes(dataset),
  HAS_NEWSROOM: NEWSROOM.includes(dataset),
  HAS_MAGAZINE_INDEX: MAGAZINE_INDEX.includes(dataset),
  HAS_ARCHIVED_NEWS: ARCHIVED_NEWS.includes(dataset),
  HAS_NEWS_SUBSCRIPTION: NEWS_SUBSCRIPTION.includes(dataset),
  HAS_MAGAZINE_SUBSCRIPTION: MAGAZINE_SUBSCRIPTION.includes(dataset),
  HAS_LOCAL_NEWS: LOCAL_NEWS.includes(dataset),
  HAS_SEARCH: SEARCH.includes(dataset),
  HAS_EVENT: EVENT.includes(dataset),
  HAS_FORMS:
    CAREERS_CONTACT_FORM.includes(dataset) ||
    CAREER_FAIR_AND_VISITS_FORM.includes(dataset) ||
    CONTACT_EQUINOR_FORM.includes(dataset) ||
    ORDER_REPORT_FORM.includes(dataset) ||
    SUBSCRIBE_FORM.includes(dataset) ||
    PENSION_FORM.includes(dataset),

  HAS_SUBSCRIBE_FORM: SUBSCRIBE_FORM.includes(dataset),
  HAS_CAREERS_CONTACT_FORM: CAREERS_CONTACT_FORM.includes(dataset),
  HAS_CAREER_FAIR_AND_VISITS_FORM: CAREER_FAIR_AND_VISITS_FORM.includes(dataset),
  HAS_ORDER_REPORT_FORM: ORDER_REPORT_FORM.includes(dataset),
  HAS_CONTACT_EQUINOR_FORM: CONTACT_EQUINOR_FORM.includes(dataset),
  HAS_PENSION_FORM: PENSION_FORM.includes(dataset),

  HAS_FANCY_MENU: FANCY_MENU.includes(dataset),
  /* LANDING_PAGE requires FANCY_MENU to work */
  HAS_LANDING_PAGE: FANCY_MENU.includes(dataset) && LANDING_PAGE.includes(dataset),
  HAS_TWITTER_FEED: TWITTER_FEED.includes(dataset),
  HAS_MAGAZINE: MAGAZINE.includes(dataset),
  HAS_SAME_SLUG: SAME_SLUG.includes(dataset),
  HAS_LINE_BREAK_TYPO: LINE_BREAK_TYPO.includes(dataset),
  IS_GLOBAL_PROD: GLOBAL_PROD.includes(dataset),
  IS_DEV: GLOBAL_DEV.includes(dataset),
  IS_SATELLITE: SATELLITES.includes(dataset),
  HAS_CAMPAIGN_BLOCKS: CAMPAIGN.includes(dataset),
})
