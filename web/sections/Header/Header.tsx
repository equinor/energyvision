import { getLocale, getTranslations } from 'next-intl/server'
import type { HTMLAttributes } from 'react'
import type { HeaderData } from '@/contexts/pageContext'
import HeaderBar from './HeaderBar'

export type ServerHeaderProps = HTMLAttributes<HTMLElement> & {
  siteMenuData: any
  headerData: HeaderData | undefined
}

const Header = async ({ siteMenuData, headerData }: ServerHeaderProps) => {
  const locale = await getLocale()
  const t = await getTranslations()

  return (
    <HeaderBar
      locale={locale}
      searchLabel={t('search')}
      siteMenuData={siteMenuData}
      headerData={headerData}
    />
  )
}

export default Header
