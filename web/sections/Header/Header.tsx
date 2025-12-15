import { Icon } from '@equinor/eds-core-react'
import { search } from '@equinor/eds-icons'
import { getLocale, getTranslations } from 'next-intl/server'
import type { HTMLAttributes } from 'react'
import { ButtonLink } from '@/core/Link'
import { LogoLink } from '@/core/Link/LogoLink'
import { LocalizationSwitch } from '@/core/LocalizationSwitch/LocalizationSwitch'
import { TopbarWrapper } from '@/core/TopbarWrapper/TopbarWrapper'
import { defaultLanguage, languages } from '@/languageConfig'
import { Flags } from '@/sanity/helpers/datasetHelpers'
import SiteMenu from '@/sections/SiteMenu/SiteMenu'

export type HeaderProps = HTMLAttributes<HTMLElement>

const Header = async (_props: HeaderProps) => {
  const locale = await getLocale()
  const localization = {
    activeLocale: locale ?? defaultLanguage.iso,
  }
  const hasSearch = Flags.HAS_SEARCH
  const hasMoreThanOneLanguage = languages.length > 1

  const t = await getTranslations()

  return (
    <TopbarWrapper>
      <LogoLink />
      <div className={`flex items-center gap-x-4 sm:gap-x-6`}>
        {hasSearch && (
          <div>
            <ButtonLink
              variant='ghost'
              aria-expanded='false'
              aria-label={t('search')}
              href={
                localization.activeLocale === 'nb-NO' ? '/no/search' : '/search'
              }
              className='clickbound-area w-full p-2 md:px-5 md:py-3'
            >
              <Icon size={24} data={search} />
              <span className='max-md:sr-only'>{t('search')}</span>
            </ButtonLink>
          </div>
        )}
        {hasMoreThanOneLanguage && <LocalizationSwitch />}
        {Flags.HAS_FANCY_MENU ? <SiteMenu /> : <SiteMenu variant='simple' />}
      </div>
    </TopbarWrapper>
  )
}

export default Header
