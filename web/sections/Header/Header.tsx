import { getLocale, getTranslations } from 'next-intl/server'
import type { HTMLAttributes } from 'react'
import HeaderBar from './HeaderBar'

export type ServerHeaderProps = HTMLAttributes<HTMLElement>

const Header = async (_props: ServerHeaderProps) => {
  const locale = await getLocale()
  const t = await getTranslations()

  return <HeaderBar locale={locale} searchLabel={t('search')} />
}

export default Header
