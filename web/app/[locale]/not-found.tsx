import Footer from '@/sections/Footer/Footer'
import Header from '@/sections/Header/HeaderBar'
import ErrorPage from '@/templates/errorPage/ErrorPage'

// Note that `app/[locale]/[...slug]/page.tsx`
// is necessary for this page to render.
export default async function NotFound() {
  return (
    <main>
      <Header />
      <ErrorPage variant='404' />
      <Footer />
    </main>
  )
}
