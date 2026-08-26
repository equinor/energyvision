import { FriendlyCaptchaSdkWrapper } from '../FriendlyCaptchaWrapper'

export default function PagesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <FriendlyCaptchaSdkWrapper>{children}</FriendlyCaptchaSdkWrapper>
}
