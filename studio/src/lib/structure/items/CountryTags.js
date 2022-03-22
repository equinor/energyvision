import S from '@sanity/desk-tool/structure-builder'
import { EdsIcon } from '../../../../icons'
import { tag_more } from '@equinor/eds-icons'

export const CountryTags = S.listItem()
  .icon(() => EdsIcon(tag_more))
  .title('Country tags')
  .schemaType('countryTag')
  .child(S.documentTypeList('countryTag').title('Country tag'))
