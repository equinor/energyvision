import { useLocale, useTranslations } from 'next-intl'
import type { HTMLAttributes } from 'react'
import HeaderBar from './HeaderBar'

export type ClientHeaderProps = HTMLAttributes<HTMLElement>

const ClientHeader = (_props: ClientHeaderProps) => {
  const locale = useLocale()
  const t = useTranslations()

  return <HeaderBar locale={locale} searchLabel={t('search')} />
}

export default ClientHeader
