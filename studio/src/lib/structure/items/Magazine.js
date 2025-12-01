import { BsNewspaper } from 'react-icons/bs'
import { GiNewspaper } from 'react-icons/gi'
import { defaultLanguage } from '../../../../languages'
import { apiVersion } from '../../../../sanity.client'
import { Flags } from '../../datasetHelpers'
import { EmptyItem } from './EmptyItem'
import { singletonListItem } from './SingletonItem'

export const Magazine = S =>
  Flags.HAS_MAGAZINE
    ? S.listItem()
        .title('Magazine page')
        .icon(BsNewspaper)
        .schemaType('magazine')
        .child(
          S.documentTypeList('magazine')
            .id('magazines')
            .title('Magazines')
            .apiVersion(apiVersion)
            .filter(
              '_type == "magazine" && (!defined(lang) || lang == $baseLang)',
            )
            .params({ baseLang: defaultLanguage.name })
            .canHandleIntent((_name, params) => {
              // Assume we can handle all intents (actions) regarding post documents
              return params.type === 'magazine'
            }),
        )
    : EmptyItem

export const MagazineRoom = S =>
  Flags.HAS_MAGAZINE_INDEX
    ? singletonListItem(S, 'magazineIndex', 'Magazine Index').icon(GiNewspaper)
    : EmptyItem
