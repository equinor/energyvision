import { notFound } from 'next/navigation'
import { hasLocale } from 'next-intl'
import { routing } from '@/i18n/routing'
import Footer from '@/sections/Footer/Footer'
import Header from '@/sections/Header/HeaderBar'
import { FriendlyCaptchaSdkWrapper } from '../FriendlyCaptchaWrapper'

type Params = Promise<{ locale: string }>

export default async function PagesLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Params
}) {
  const { locale } = await params

  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  return (
    <FriendlyCaptchaSdkWrapper>
      <Header />
      {children}
      <Footer />
    </FriendlyCaptchaSdkWrapper>
  )
}
