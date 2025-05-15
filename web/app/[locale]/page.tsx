import { Locale, useTranslations } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import { use } from 'react'
//import PageLayout from '@/components/PageLayout'

type Props = {
  params: Promise<{ locale: Locale }>
}

export default function IndexPage({ params }: Props) {
  const { locale } = use(params)

  // Enable static rendering
  setRequestLocale(locale)

  const t = useTranslations()

  return (
    <>
      <h1 title={t('form_antirobot_validation_required')}>{t('form_antirobot_validation_required')}</h1>
      <div>{t('tba')}</div>
    </>
  )
}
