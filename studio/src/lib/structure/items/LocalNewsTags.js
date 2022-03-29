import S from '@sanity/desk-tool/structure-builder'
import { EdsIcon } from '../../../../icons'
import { tag } from '@equinor/eds-icons'
import { HAS_LOCAL_NEWS } from '../../datasetHelpers'
import { EmptyItem } from './EmptyItem'

export const LocalNewsTags = HAS_LOCAL_NEWS
  ? S.listItem()
      .icon(() => EdsIcon(tag))
      .title('Local news tags')
      .schemaType('localNewsTag')
      .child(S.documentTypeList('localNewsTag').title('Local news tags').showIcons(false))
  : EmptyItem
