import S from '@sanity/desk-tool/structure-builder'
import { EdsIcon } from '../../../../icons'
import { tag } from '@equinor/eds-icons'
import { Flags } from '../../datasetHelpers'
import { EmptyItem } from './EmptyItem'

export const PromotedMagazineTags =
  Flags.HAS_MAGAZINE && Flags.IS_DEV
    ? S.listItem()
        .icon(() => EdsIcon(tag))
        .id('promotedMagazineTag')
        .title('Promoted Magazine Tags')
        .schemaType('promotedMagazineTags')
        .child(
          S.documentWithInitialValueTemplate('promoted-magazine-tags')
            .id('promoted-magazine-tags')
            .title(`Promoted Magazine Tags`),
        )
    : EmptyItem
