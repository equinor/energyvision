import { MdOutlinePeopleAlt } from 'react-icons/md'
import { defaultLanguage } from '../../../../languages'
import { apiVersion } from '../../../../sanity.client'
import { Flags } from '../../datasetHelpers'

export const Organization = S =>
  Flags.HAS_PEOPLE
    ? S.listItem()
        .title('People')
        .icon(MdOutlinePeopleAlt)
        .schemaType('person')
        .child(
          S.documentTypeList('person')
            .id('people')
            .title('People')
            .apiVersion(apiVersion)
            .filter(
              '_type == "person" && (!defined(lang) || lang == $baseLang)',
            )
            .params({ baseLang: defaultLanguage.name })
            .canHandleIntent((_name, params) => params.type === 'person'),
        )
    : S.EmptyItem
