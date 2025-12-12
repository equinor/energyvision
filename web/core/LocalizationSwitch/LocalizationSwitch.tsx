import { getTranslations } from 'next-intl/server'
import type { LocaleSlug } from '@/app/[locale]/(pages)/[...slug]/page'
import { ButtonLink } from '@/core/Link'
import { languages } from '@/languageConfig'

export type LocalizationSwitchProps = {
  slugs: LocaleSlug[]
  activeLocale: string
}

export const LocalizationSwitch = async ({
  slugs = [],
  activeLocale,
  ...rest
}: LocalizationSwitchProps) => {
  const intl = await getTranslations()

  if (slugs.length < 1) return null

  return (
    <ul
      className='flex items-center md:divide-x md:divide-dashed md:divide-gray-400'
      {...rest}
    >
      {slugs.map(obj => {
        const language = languages.find(lang => lang.iso === obj.lang)
        return (
          <li
            className={`flex items-center ${activeLocale === String(language?.locale) ? 'hidden md:block' : ''} `}
            key={obj.lang}
          >
            <ButtonLink
              variant='ghost'
              href={obj.slug}
              hrefLang={`${language?.iso}`}
              className={` ${activeLocale === String(language?.iso) ? 'hidden md:block' : ''} flex flex-col items-stretch gap-0 px-2 text-xs`}
            >
              <span className='sr-only'>
                {activeLocale === String(language?.iso)
                  ? `${intl('current_language') ?? 'current language'}: ${language?.title}`
                  : `${intl('switch_to')} ${language?.title}`}
              </span>
              <span
                aria-hidden
                className={`uppercase ${activeLocale === String(language?.iso) ? 'font-semibold' : 'font-normal'}`}
              >
                {language?.iso === 'en-GB' ? 'en' : language?.locale}
              </span>
            </ButtonLink>
          </li>
        )
      })}
    </ul>
  )
}
