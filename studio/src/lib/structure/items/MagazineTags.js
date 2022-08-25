import S from '@sanity/desk-tool/structure-builder'
import { EdsIcon } from '../../../../icons'
import { tag } from '@equinor/eds-icons'
import { Flags } from '../../datasetHelpers'
import { EmptyItem } from './EmptyItem'

export const MagazineTags =
  Flags.HAS_MAGAZINE && Flags.IS_DEV
    ? S.listItem()
        .icon(() => EdsIcon(tag))
        .title('Magazine tags')
        .schemaType('magazineTag')
        .child(S.documentTypeList('magazineTag').title('Magazine tags'))
    : EmptyItem
