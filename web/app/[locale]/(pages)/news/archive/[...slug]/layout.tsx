import { notFound } from 'next/navigation'
import { hasLocale } from 'next-intl'
import { routing } from '@/i18n/routing'
import { Flags } from '@/sanity/helpers/datasetHelpers'

type Params = Promise<{ locale: string; slug: string[] }>

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Params
}) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params

  if (!hasLocale(routing.locales, locale) || !Flags.HAS_ARCHIVED_NEWS) {
    notFound()
  }

  return (
    <>
      <head>
        <link rel='stylesheet' href='/legacy/styles/legacy.spacing.css' />
        <link rel='stylesheet' href='/legacy/styles/legacy.minified.css' />
      </head>
      <div className={`text-slate-80`}>
        {children}
        <div className='clear-both'></div>
      </div>
    </>
  )
}
