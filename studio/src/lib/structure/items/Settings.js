import S from '@sanity/desk-tool/structure-builder'
import { EdsIcon } from '../../../../icons'
import { settings } from '@equinor/eds-icons'
import { Tags } from './Tags'
import { CountryTags } from './CountryTags'
import { LocalNewsTags } from './LocalNewsTags'
import { MagazineTags } from './MagazineTags'
import { Redirects, ExternalRedirects } from './Redirects'
import { TextSnippet } from './TextSnippet'
import { Flags } from '../../datasetHelpers'

const settingsItems = [
  Flags.HAS_NEWS && Tags,
  Flags.HAS_NEWS && CountryTags,
  Flags.IS_DEV && Flags.HAS_MAGAZINE && MagazineTags,
  TextSnippet,
  Redirects,
  ExternalRedirects,
  Flags.HAS_LOCAL_NEWS && LocalNewsTags,
].filter((e) => e)

export const Settings = S.listItem()
  .title('Settings')
  .icon(() => EdsIcon(settings))
  .child(S.list().id('settings').title('Settings').items(settingsItems))
