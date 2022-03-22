import S from '@sanity/desk-tool/structure-builder'
import { EdsIcon } from '../../../../icons'
import { tag } from '@equinor/eds-icons'

export const Tags = S.listItem()
  .icon(() => EdsIcon(tag))
  .title('Tags')
  .schemaType('tag')
  .child(S.documentTypeList('tag').title('Tags').showIcons(false))
