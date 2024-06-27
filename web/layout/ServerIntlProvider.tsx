'use client'
import { defaultLanguage } from '../languages'
import { getIsoFromLocale } from '../lib/localization'
import { IntlProvider, MessageFormatElement } from 'react-intl'

type ServerIntlProviderProps = {
  messages: Record<string, string> | Record<string, MessageFormatElement[]> | undefined
  locale: string
  children: React.ReactNode
}

export default function ServerIntlProvider({ messages, locale, children }: ServerIntlProviderProps) {
  return (
    <IntlProvider messages={messages} defaultLocale={getIsoFromLocale(defaultLanguage.locale)} locale={locale}>
      {children}
    </IntlProvider>
  )
}
