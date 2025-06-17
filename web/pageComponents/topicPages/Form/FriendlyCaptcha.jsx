import { useEffect, useRef } from 'react'
import { WidgetInstance } from 'friendly-challenge'
import { friendlyCaptcha } from '../../../lib/config'
import { useIntl } from 'react-intl'

const FRIENDLY_CAPTCHA_LANG_MAP = {
  nb: 'no',
  en: 'en',
  fr: 'fr',
  de: 'de',
  it: 'it',
  nl: 'nl',
  pt: 'pt',
  es: 'es',
  ca: 'ca',
  da: 'da',
  ja: 'ja',
  ru: 'ru',
  sv: 'sv',
  el: 'el',
  uk: 'uk',
  bg: 'bg',
  cs: 'cs',
  sk: 'sk',
  fi: 'fi',
  lv: 'lv',
  lt: 'lt',
  pl: 'pl',
  et: 'et',
  hr: 'hr',
  sr: 'sr',
  sl: 'sl',
  hu: 'hu',
  ro: 'ro',
  zh: 'zh',
  zh_TW: 'zh_TW',
  vi: 'vi',
  he: 'he',
  th: 'th',
  kr: 'kr',
  ar: 'ar',
}

const FriendlyCaptcha = ({ doneCallback, errorCallback }) => {
  const puzzleEndpoint = friendlyCaptcha.puzzleEndpoint
  const container = useRef()
  const widget = useRef()
  const intl = useIntl()
  const currentIntlLocale = intl.locale

  const baseLocale = currentIntlLocale.split('-')[0]
  const friendlyCaptchaLang = FRIENDLY_CAPTCHA_LANG_MAP[baseLocale] || 'en'
  const apiEndpoint = friendlyCaptcha.puzzleEndpoint || 'eu'

  useEffect(() => {
    if (!widget.current && container.current) {
      widget.current = new WidgetInstance(container.current, {
        startMode: 'focus',
        doneCallback: doneCallback,
        errorCallback: errorCallback,
        puzzleEndpoint: puzzleEndpoint,
      })
    }
  }, [container, doneCallback, errorCallback, puzzleEndpoint])

  return (
    <div
      ref={container}
      className="frc-captcha"
      data-sitekey={friendlyCaptcha.siteKey}
      data-api-endpoint={apiEndpoint}
      data-lang={friendlyCaptchaLang}
    />
  )
}

export default FriendlyCaptcha
