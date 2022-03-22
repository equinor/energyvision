import S from '@sanity/desk-tool/structure-builder'
import { EdsIcon } from '../../../../icons'
import { tag } from '@equinor/eds-icons'

export const LocalNewsTags = S.listItem()
  .icon(() => EdsIcon(tag))
  .title('Local news tags')
  .schemaType('localNewsTag')
  .child(S.documentTypeList('localNewsTag').title('Local news tags').showIcons(false))
