import { languages } from '../../languages'
import { ButtonLink } from '@core/Link'

export type AllSlugsType = { slug: string; lang: string }[]

export type LocalizationSwitchProps = {
  allSlugs: AllSlugsType
  activeLocale: string
}

export const LocalizationSwitch = ({ allSlugs: slugs, activeLocale, ...rest }: LocalizationSwitchProps) => {
  console.log('slugs', slugs)
  if (slugs.length < 1) return null

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
              href={obj.slug}
              locale={`${language?.locale}`}
              className={`flex flex-col gap-0 items-stretch px-2 text-xs`}
            >
              <span className="sr-only">{`Switch to ${language?.title}`}</span>
              <span
                aria-hidden
                className={`uppercase ${activeLocale === String(language?.locale) ? 'font-bold' : 'font-normal'}`}
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
