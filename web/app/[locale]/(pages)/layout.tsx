import { Suspense } from 'react'
import { FriendlyCaptchaSdkWrapper } from '../FriendlyCaptchaWrapper'

export default function PagesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Suspense fallback={null}>
      <FriendlyCaptchaSdkWrapper>{children}</FriendlyCaptchaSdkWrapper>
    </Suspense>
  )
}
