import { Metadata } from 'next'
import '../styles/tailwind.css'

export const metadata: Metadata = {
  title: 'Home',
  description: '',
}

export default function RootLayout({
  // Layouts must accept a children prop.
  //The root layout replaces the pages/_app.tsx and pages/_document.tsx files.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
