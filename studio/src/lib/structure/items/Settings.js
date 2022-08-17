import S from '@sanity/desk-tool/structure-builder'
import { EdsIcon } from '../../../../icons'
import { settings } from '@equinor/eds-icons'
import { Tags } from './Tags'
import { CountryTags } from './CountryTags'
import { LocalNewsTags } from './LocalNewsTags'
import { MagazineTags } from './MagazineTags'
import { Redirects, ExternalRedirects } from './Redirects'
import { TextSnippet } from './TextSnippet'
import { HAS_NEWS, HAS_LOCAL_NEWS, HAS_MAGAZINE } from '../../datasetHelpers'

const settingsItems = [
  HAS_NEWS && Tags,
  HAS_NEWS && CountryTags,
  HAS_MAGAZINE && MagazineTags,
  TextSnippet,
  Redirects,
  ExternalRedirects,
  HAS_LOCAL_NEWS && LocalNewsTags,
].filter((e) => e)

export const Settings = S.listItem()
  .title('Settings')
  .icon(() => EdsIcon(settings))
  .child(S.list().id('settings').title('Settings').items(settingsItems))
