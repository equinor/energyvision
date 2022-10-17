import S from '@sanity/desk-tool/structure-builder'
import { EdsIcon } from '../../../../icons'
import { tag } from '@equinor/eds-icons'
import { Flags } from '../../datasetHelpers'
import { EmptyItem } from './EmptyItem'

export const EventTags = Flags.HAS_EVENT
  ? S.listItem()
      .icon(() => EdsIcon(tag))
      .title('Event tags')
      .schemaType('eventTag')
      .child(S.documentTypeList('eventTag').title('Event tags'))
  : EmptyItem
