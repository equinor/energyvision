import React from 'react'
import { defaultLanguage, languages } from '../../../languages'

const getDocumentLanguage = (docLang: string | undefined) =>
  languages.find((lang) => lang.locale === docLang)?.locale || defaultLanguage.locale

export default getDocumentLanguage
