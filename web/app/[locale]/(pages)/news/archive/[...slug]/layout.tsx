import { notFound } from 'next/navigation'
import { Flags } from '@/sanity/helpers/datasetHelpers'
export default async function LocaleLayout({
  children,
}: LayoutProps<'/[locale]/news/archive/[...slug]'>) {
  if (!Flags.HAS_ARCHIVED_NEWS) {
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
