import { News as NewsStructure } from './items/News'
import { LocalNews as LocalNewsStructure } from './items/LocalNews'
import { LandingPage as LandingPageStructure } from './items/LandingPage'
import { Event as EventStructure } from './items/Event'
import { Menu } from './items/Menu'
import { Footer } from './items/Footer'
import { Homepage } from './items/Homepage'
import { AssetLibrary } from './items/AssetLibrary'
import { Misc } from './items/Misc'
import { TopicContent } from './items/TopicContent'
import { Magazine } from './items/Magazine'
import { Routes } from './items/Routes'
import { Settings } from './items/Settings'
import S from '@sanity/desk-tool/structure-builder'
import { HAS_EVENT, HAS_LANDING_PAGE, HAS_LOCAL_NEWS, HAS_NEWS } from '../datasetHelpers'
import { getCurrentUserRoles } from '../userRoles'

const News = HAS_NEWS && NewsStructure
const LocalNews = HAS_LOCAL_NEWS && LocalNewsStructure
const LandingPage = HAS_LANDING_PAGE && LandingPageStructure
const Event = HAS_EVENT && EventStructure

const ADMIN_ITEMS = [
  News,
  LocalNews,
  TopicContent,
  LandingPage,
  Event,
  Magazine,
  Misc,
  S.divider(),
  Homepage,
  Routes,
  S.divider(),
  Menu,
  Footer,
  S.divider(),
  AssetLibrary,
  S.divider(),
  Settings,
].filter((e) => e)

const SUB_EDITOR_ITEMS = [
  News,
  LocalNews,
  TopicContent,
  LandingPage,
  Magazine,
  Event,
  S.divider(),
  AssetLibrary,
].filter((e) => e)

const LOCAL_NEWS_EDITOR_ITEMS = [LocalNews].filter((e) => e)

/**
 * Datasets are not taken into consideration in order to simplify logic.
 * This is used only to hide/show items in the UI.
 *
 * Drawback scenario:
 *  An user with "Editor" access to the "brazil" dataset, and "Sub Editor" to the "argentina" dataset
 *  will get ADMIN_ITEMS menu structure for both studios. This is acceptable because it is just
 *  the UI menu items, the content is properly hidden and handled at sanity.io -> Access tab.
 */
const userRoles = getCurrentUserRoles()
const isAdmin = userRoles.some((role) => role.startsWith('editor') || role === 'administrator' || role === 'developer')
const isSubEditor = userRoles.some((role) => role.startsWith('sub-editor'))
const isLocalNewsEditor = userRoles.some((role) => role.startsWith('local-news-editor'))

const getItems = () => {
  if (isAdmin) {
    return ADMIN_ITEMS
  } else if (isSubEditor) {
    return SUB_EDITOR_ITEMS
  } else if (isLocalNewsEditor) {
    return LOCAL_NEWS_EDITOR_ITEMS
  } else {
    return []
  }
}

export default getItems()
