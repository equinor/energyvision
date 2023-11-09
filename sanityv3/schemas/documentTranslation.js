import { languages } from '../languages'
import { Flags } from '../src/lib/datasetHelpers'
import { documentsWithI18n } from './documents'

const datasetSpecificSchemas = [
  !Flags.HAS_NEWS && documentsWithI18n.news.name,
  !Flags.HAS_LOCAL_NEWS && documentsWithI18n.localNews.name,
  !Flags.HAS_EVENT && documentsWithI18n.event.name,
  !Flags.HAS_MAGAZINE && documentsWithI18n.magazine.name,
  !Flags.HAS_MAGAZINE_INDEX && documentsWithI18n.magazineIndex.name,
  !Flags.HAS_NEWSROOM && documentsWithI18n.newsroom.name,
  !Flags.HAS_LANDING_PAGE && documentsWithI18n.landingPage.name,
].filter((e) => e)
export const i18n = {
  supportedLanguages: languages.map((it) => {
    return {
      id: it.name,
      title: it.title,
    }
  }),
  referenceBehavior: 'weak',
  languageField: 'lang',
  schemaTypes: Object.keys(documentsWithI18n)
    .filter((it) => !datasetSpecificSchemas.includes(documentsWithI18n[it].name))
    .map((it) => documentsWithI18n[it].name),
  withTranslationsMaintenance: true,
}
