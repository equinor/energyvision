import S from '@sanity/desk-tool/structure-builder'
import { EdsIcon } from '../../../../icons'
import { languages } from '../../../../languages'
import { directions } from '@equinor/eds-icons'
import flags from '../../../../icons/countries'

const redirects = languages.map((lang) =>
  S.listItem()
    .title(`${lang.title} Redirects`)
    .id(`redirect-${lang.id}`)
    .icon(flags[lang.id])
    .child(() =>
      S.documentList()
        .title(`${lang.title} Redirects`)
        .schemaType('redirect')
        .filter(`_type == 'redirect' && _lang == '${lang.name}'`)
        .canHandleIntent(S.documentTypeList('redirect').getCanHandleIntent())
        .child((id) =>
          S.documentWithInitialValueTemplate('redirect-with-locale', {
            isoCode: lang.name,
          }).documentId(id),
        ),
    ),
)

export const Redirects = S.listItem()
  .icon(() => EdsIcon(directions))
  .title('Redirects')
  .child(() => S.list('redirects').id('redirects').title('Redirects').items(redirects))
