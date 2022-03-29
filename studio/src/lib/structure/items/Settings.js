import S from '@sanity/desk-tool/structure-builder'
import { EdsIcon } from '../../../../icons'
import { settings } from '@equinor/eds-icons'
import { Tags } from './Tags'
import { CountryTags } from './CountryTags'
import { LocalNewsTags } from './LocalNewsTags'
import { Redirects } from './Redirects'
import { TextSnippet } from './TextSnippet'
import { HAS_NEWS, HAS_LOCAL_NEWS } from '../../datasetHelpers'
import { hasPermission, PERMISSIONS } from '../../permissions'

const settingsItems = [
  HAS_NEWS && Tags,
  HAS_NEWS && CountryTags,
  TextSnippet,
  Redirects,
  HAS_LOCAL_NEWS && hasPermission(PERMISSIONS.ACCESS_LOCAL_NEWS_TAGS) && LocalNewsTags,
].filter((e) => e)

export const Settings = S.listItem()
  .title('Settings')
  .icon(() => EdsIcon(settings))
  .child(S.list().id('settings').title('Settings').items(settingsItems))
