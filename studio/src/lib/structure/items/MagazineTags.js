import S from '@sanity/desk-tool/structure-builder'
import { EdsIcon } from '../../../../icons'
import { tag } from '@equinor/eds-icons'
import { HAS_MAGAZINE, IS_TEST } from '../../datasetHelpers'
import { EmptyItem } from './EmptyItem'

export const MagazineTags =
  HAS_MAGAZINE && IS_TEST
    ? S.listItem()
        .icon(() => EdsIcon(tag))
        .title('Magazine tags')
        .schemaType('magazineTag')
        .child(S.documentTypeList('magazineTag').title('Magazine tags'))
    : EmptyItem
