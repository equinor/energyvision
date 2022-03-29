import S from '@sanity/desk-tool/structure-builder'
import { EdsIcon } from '../../../../icons'
import { tag } from '@equinor/eds-icons'
import { EmptyItem } from './EmptyItem'
import { HAS_NEWS } from '../../datasetHelpers'

export const Tags = HAS_NEWS
  ? S.listItem()
      .icon(() => EdsIcon(tag))
      .title('Tags')
      .schemaType('tag')
      .child(S.documentTypeList('tag').title('Tags').showIcons(false))
  : EmptyItem
