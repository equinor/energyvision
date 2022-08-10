/* eslint-disable import/no-unresolved */
import client from 'part:@sanity/base/client'

const projectId = client.clientConfig.projectId

export const dataset = client.clientConfig.dataset
export const IS_SECRET = projectId === 'w3b4om14'

/** @TODO Replicate logic inside GROQ queries for the web */
const GLOBAL_TEST = ['global-development', 'global-test']
const GLOBAL = ['global', 'secret', ...GLOBAL_TEST]

export const IS_TEST = GLOBAL_TEST.includes(dataset)

const NEWS = [...GLOBAL, 'japan', 'poland', 'brazil', 'germany', 'southkorea']
const NEWS_SUBSCRIPTION = [...GLOBAL]
const MAGAZINE_SUBSCRIPTION = [...GLOBAL_TEST]
const NEWSROOM = [...GLOBAL]
const LOCAL_NEWS = [...GLOBAL]
const SEARCH = [...GLOBAL]
const EVENT = [...GLOBAL]
const FORMS = [...GLOBAL]
const FANCY_MENU = [...GLOBAL]
/* LANDING_PAGE requires FANCY_MENU to work */
const LANDING_PAGE = [...GLOBAL]
const TWITTER_FEED = [...GLOBAL_TEST, 'germany']
const MAGAZINE = [...GLOBAL, ...GLOBAL_TEST]
const FOTOWARE = [...GLOBAL_TEST]
/* Allows same slug for different languages */
const SAME_SLUG = [...GLOBAL_TEST, 'japan', 'southkorea']
const VIDEO = [...GLOBAL_TEST]

export const HAS_NEWS = NEWS.includes(dataset)
export const HAS_NEWSROOM = NEWSROOM.includes(dataset)
export const HAS_NEWS_SUBSCRIPTION = NEWS_SUBSCRIPTION.includes(dataset)
export const HAS_MAGAZINE_SUBSCRIPTION = MAGAZINE_SUBSCRIPTION.includes(dataset)
export const HAS_LOCAL_NEWS = LOCAL_NEWS.includes(dataset)
export const HAS_SEARCH = SEARCH.includes(dataset)
export const HAS_EVENT = EVENT.includes(dataset)
export const HAS_FORMS = FORMS.includes(dataset)
export const HAS_FANCY_MENU = FANCY_MENU.includes(dataset)
export const HAS_LANDING_PAGE = HAS_FANCY_MENU && LANDING_PAGE.includes(dataset)
export const HAS_TWITTER_FEED = TWITTER_FEED.includes(dataset)
export const HAS_MAGAZINE = MAGAZINE.includes(dataset)
export const HAS_FOTOWARE = FOTOWARE.includes(dataset)
export const HAS_SAME_SLUG = SAME_SLUG.includes(dataset)
export const HAS_VIDEO = VIDEO.includes(dataset)
