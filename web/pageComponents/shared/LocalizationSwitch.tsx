import { useIntl } from 'react-intl'
import { defaultLanguage, languages } from '../../languages'
import { ButtonLink } from '@core/Link'
import { usePathname, useRouter } from 'next/navigation'
import { useCurrentLocale } from 'next-i18n-router/client'
import { i18nConfig } from '../../i18nConfig'
import { ChangeEvent } from 'react'

export type AllSlugsType = { slug: string; lang: string }[]

export type LocalizationSwitchProps = {
  allSlugs: AllSlugsType
  activeLocale: string
}

export const LocalizationSwitch = ({ allSlugs: slugs, activeLocale, ...rest }: LocalizationSwitchProps) => {
  const intl = useIntl()
  const router = useRouter()
  const currentPathname = usePathname() || ''
  const currentLocale = useCurrentLocale(i18nConfig)

  if (slugs.length < 1) return null

  const handleChange = (_e: ChangeEvent<HTMLSelectElement>, selectedLanguage: string) => {
    const newLocale = selectedLanguage

    // set cookie for next-i18n-router
    const days = 30
    const date = new Date()
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
    document.cookie = `NEXT_LOCALE=${newLocale};expires=${date.toUTCString()};path=/`

    if (currentLocale === i18nConfig.defaultLocale && !i18nConfig.prefixDefault) {
      router.push('/' + newLocale + currentPathname)
    } else {
      router.push(currentPathname.replace(`/${currentLocale}`, `/${newLocale}`))
    }

    router.refresh()
  }

  return (
    <ul className="flex items-center md:divide-x md:divide-dashed md:divide-gray-400 " {...rest}>
      {slugs.map((obj) => {
        const language = languages.find((lang) => lang.name === obj.lang)
        return (
          <li
            className={`flex items-center ${activeLocale === String(language?.locale) ? 'hidden md:block' : ''} `}
            key={obj.lang}
          >
            <ButtonLink
              variant="ghost"
              href={`${
                language?.locale == defaultLanguage.locale ? `${obj.slug}` : `/${language?.locale}${obj.slug}`
              } `}
              locale={`${language?.locale}`}
              className={`
                ${activeLocale === String(language?.locale) ? 'hidden md:block' : ''}
                flex flex-col gap-0 items-stretch px-2 text-xs
                `}
            >
              <span className="sr-only">{`${intl.formatMessage({
                id: 'switch_to',
                defaultMessage: 'Switch to',
              })} ${language?.title}`}</span>
              <span
                aria-hidden
                className={`uppercase ${activeLocale === String(language?.locale) ? 'font-semibold' : 'font-normal'}`}
              >
                {language?.locale}
              </span>
            </ButtonLink>
          </li>
        )
      })}
    </ul>
  )
}
