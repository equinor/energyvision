import { notFound } from 'next/navigation'
import { i18nConfig } from '../../i18nConfig'
import localFont from 'next/font/local'
import '../../styles/tailwind.css'
import { PreviewContextProvider } from '../../lib/contexts/PreviewContext'

const equinorRegular = localFont({
  src: '../fonts/equinor/Equinor-Regular.woff',
})
const equinorVariableWoff = localFont({
  src: '../fonts/equinor/EquinorVariable-VF.woff',
})
const equinorVariableWoff2 = localFont({
  src: '../fonts/equinor/EquinorVariable-VF.woff2',
})

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: Promise<{ locale: string }>
}>) {
  const { locale } = await params
  if (!i18nConfig.locales.includes(locale)) {
    notFound()
  }
  return (
    <html
      lang={locale}
      className={`${equinorRegular.className} ${equinorVariableWoff.className} ${equinorVariableWoff2.className}`}
    >
      <body>
        <PreviewContextProvider>{children}</PreviewContextProvider>
      </body>
    </html>
  )
}
