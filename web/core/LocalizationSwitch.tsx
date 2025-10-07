'use client'
import { useTranslations } from 'next-intl'
import { languages } from '../languages'
import { ButtonLink } from '@/core/Link'

export type AllSlugsType = { slug: string; lang: string }[]

export type LocalizationSwitchProps = {
  allSlugs: AllSlugsType
  activeLocale: string
}

export const LocalizationSwitch = ({ allSlugs: slugs, activeLocale, ...rest }: LocalizationSwitchProps) => {
  const intl = useTranslations()

  if (slugs.length < 1) return null

  return (
    <ul className="flex items-center md:divide-x md:divide-dashed md:divide-gray-400" {...rest}>
      {slugs.map((obj) => {
        const language = languages.find((lang) => lang.name === obj.lang)
        return (
          <li
            className={`flex items-center ${activeLocale === String(language?.locale) ? 'hidden md:block' : ''} `}
            key={obj.lang}
          >
            <ButtonLink
              variant="ghost"
              href={obj.slug}
              hrefLang={`${language?.locale}`}
              className={` ${activeLocale === String(language?.locale) ? 'hidden md:block' : ''} flex flex-col items-stretch gap-0 px-2 text-xs`}
            >
              <span className="sr-only">
                {activeLocale === String(language?.locale)
                  ? `${intl('current_language')}: ${language?.title}`
                  : `${intl('switch_to')} ${language?.title}`}
              </span>
              <span
                aria-hidden
                className={`uppercase ${activeLocale === String(language?.locale) ? 'font-semibold' : 'font-normal'}`}
              >
                {language?.locale === 'en-GB' ? 'en' : language?.locale}
              </span>
            </ButtonLink>
          </li>
        )
      })}
    </ul>
  )
}
