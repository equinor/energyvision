import S from '@sanity/desk-tool/structure-builder'
import { EdsIcon } from '../../../../icons'
import { error_outlined } from '@equinor/eds-icons'

export const EmptyItem = S.listItem()
  .icon(() => EdsIcon(error_outlined))
  .title('NOT FOUND')
