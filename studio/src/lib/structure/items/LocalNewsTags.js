import S from '@sanity/desk-tool/structure-builder'
import { EdsIcon } from '../../../../icons'
import { tag } from '@equinor/eds-icons'
import { Flags } from '../../datasetHelpers'
import { EmptyItem } from './EmptyItem'

export const LocalNewsTags = Flags.HAS_LOCAL_NEWS
  ? S.listItem()
      .icon(() => EdsIcon(tag))
      .title('Local news tags')
      .schemaType('localNewsTag')
      .child(S.documentTypeList('localNewsTag').title('Local news tags').showIcons(false))
  : EmptyItem
