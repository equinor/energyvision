import { Metadata } from 'next'
import '../styles/tailwind.css'
import { getMenuAndFooterData } from '../lib/fetchData'
import { Layout } from '../layout/GlobalLayout'
import { languages } from '../languages'
import ServerIntlProvider from '../layout/ServerIntlProvider'
import getIntl from './intl'

export const metadata: Metadata = {
  title: 'Home',
  description: '',
}

async function GlobalLayout({ children }: { children: React.ReactNode }) {
  const data = await getMenuAndFooterData(
    {
      lang: 'en_GB',
    },
    false,
  )
  const intl = await getIntl('en')

  return (
    <ServerIntlProvider messages={intl.messages} locale={intl.locale}>
      <Layout {...data}>{children}</Layout>
    </ServerIntlProvider>
  )
}

export function generateStaticParams() {
  return languages.map((locale) => ({ locale }))
}

export default function RootLayout({
  // Layouts must accept a children prop.
  //The root layout replaces the pages/_app.tsx and pages/_document.tsx files.
  // This will be populated with nested layouts or pages
  children,
}: //params: { locale }
{
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <GlobalLayout>{children}</GlobalLayout>
      </body>
    </html>
  )
}
