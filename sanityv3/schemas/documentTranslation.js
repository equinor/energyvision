import { languages } from '../languages'
import { documentsWithI18n } from './documents'

export const i18n = {
  supportedLanguages: languages.map((it) => {
    return {
      id: it.iso,
      title: it.title,
    }
  }),
  referenceBehavior: 'weak',
  languageField: 'lang',
  schemaTypes: Object.keys(documentsWithI18n).map((it) => documentsWithI18n[it].name),
}
