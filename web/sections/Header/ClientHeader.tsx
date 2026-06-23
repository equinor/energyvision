'use client'

import { useLocale, useTranslations } from 'next-intl'
import type { HTMLAttributes } from 'react'
import { Flags } from '@/sanity/helpers/datasetHelpers'
import HeaderBar from './HeaderBar'

export type ClientHeaderProps = HTMLAttributes<HTMLElement>

const ClientHeader = (_props: ClientHeaderProps) => {
  const locale = useLocale()
  const t = useTranslations()

  return (
    <HeaderBar
      locale={locale}
      searchLabel={Flags.HAS_SEARCH ? t('search') : undefined}
    />
  )
}

export default ClientHeader
