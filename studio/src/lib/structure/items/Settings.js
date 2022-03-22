import S from '@sanity/desk-tool/structure-builder'
import { EdsIcon } from '../../../../icons'
import { settings } from '@equinor/eds-icons'
import { Tags } from './Tags'
import { CountryTags } from './CountryTags'
import { LocalNewsTags } from './LocalNewsTags'
import { Redirects } from './Redirects'

export const Settings = S.listItem()
  .title('Settings')
  .icon(() => EdsIcon(settings))
  .child(S.list().id('settings').title('Settings').items([Tags, CountryTags, Redirects, LocalNewsTags]))
