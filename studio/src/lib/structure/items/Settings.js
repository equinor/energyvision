import S from '@sanity/desk-tool/structure-builder'
import { EdsIcon } from '../../../../icons'
import { settings } from '@equinor/eds-icons'
import { Tags } from './Tags'
import { CountryTags } from './CountryTags'
import { LocalNewsTags } from './LocalNewsTags'
import { Redirects, ExternalRedirects } from './Redirects'
import { TextSnippet } from './TextSnippet'
import { TextSnippetV2 } from './TextSnippetV2'
import { HAS_NEWS, HAS_LOCAL_NEWS, HAS_GROUPED_TEXT_SNIPPETS } from '../../datasetHelpers'

const settingsItems = [
  HAS_NEWS && Tags,
  HAS_NEWS && CountryTags,
  HAS_GROUPED_TEXT_SNIPPETS ? TextSnippetV2 : TextSnippet,
  Redirects,
  ExternalRedirects,
  HAS_LOCAL_NEWS && LocalNewsTags,
].filter((e) => e)

export const Settings = S.listItem()
  .title('Settings')
  .icon(() => EdsIcon(settings))
  .child(S.list().id('settings').title('Settings').items(settingsItems))
