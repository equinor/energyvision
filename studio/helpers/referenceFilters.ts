import { SanityDocument } from '@sanity/types'
import { defaultLanguage } from '../languages'

export const langOrDefault = (lang: string | unknown) => lang || defaultLanguage.name

export const filterByLang = ({ document }: { document: SanityDocument }) => ({
  filter: `_lang == $lang`,
  params: { lang: langOrDefault(document._lang) },
})

export const filterByRoute = ({ document }: { document: SanityDocument }) => ({
  filter: `_type match $routeLang`,
  params: { routeLang: `route_${langOrDefault(document._lang)}*` },
})

export const filterByRouteAndNews = ({ document }: { document: SanityDocument }) => {
  const lang = langOrDefault(document._lang)
  return {
    filter: `_type match $routeLang || (_type == 'news' && _lang == $newsLang )`,
    params: {
      routeLang: `route_${lang}*`,
      newsLang: lang,
    },
  }
}

export const filterByRouteNewsAndTitle = ({ document }: { document: SanityDocument }) => {
  const lang = langOrDefault(document._lang)
  const title = document.title || ''
  return {
    filter: `title != $title && (_type match $routeLang || (_type == 'news' && _lang == $newsLang ))`,
    params: {
      title: title,
      routeLang: `route_${lang}*`,
      newsLang: lang,
    },
  }
}

export const filterByRouteEvents = ({ document }: { document: SanityDocument }) => {
  return {
    filter: `_type match $routeLang && content->_type == "event"`,
    params: { routeLang: `route_${langOrDefault(document._lang)}*` },
  }
}
