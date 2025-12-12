import { notFound } from 'next/navigation'
import { hasLocale } from 'next-intl'
import { InfoProvider } from '@/contexts/infoContext'
import { routing } from '@/i18n/routing'
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
    <InfoProvider>
      <FriendlyCaptchaSdkWrapper>{children}</FriendlyCaptchaSdkWrapper>
    </InfoProvider>
  )
}
