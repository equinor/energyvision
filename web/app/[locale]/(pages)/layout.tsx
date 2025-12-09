
import { notFound } from 'next/navigation'
import { hasLocale, NextIntlClientProvider } from 'next-intl'
import Footer from '@/sections/Footer/Footer'
import { footerQuery } from '@/sanity/queries/footer'
import { getNameFromLocale } from '@/sanity/localization'
import { sanityFetch } from '@/sanity/lib/sanityFetch'
import { FriendlyCaptchaSdkWrapper } from '../FriendlyCaptchaWrapper'
import { routing } from '@/i18n/routing'


type Params = Promise<{ locale: string }>

export default async function LocaleLayout({
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
    {children}
    {/*<SanityLive /> */}
    </FriendlyCaptchaSdkWrapper>
  )
}
