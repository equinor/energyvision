'use client'
import { Icon } from '@equinor/eds-core-react'
import { close } from '@equinor/eds-icons'
import { FloatingOverlay } from '@floating-ui/react'
import { useRouter } from 'next/navigation'
import { LogoLink } from '@/core/Link/LogoLink'
import { Search } from '@/sections/Search/Search'
import { NavTopbar } from '@/sections/SiteMenu/NavTopbar'
import { TopbarDropdown } from '@/sections/SiteMenu/TopbarDropdown'

/* export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const intl = await getTranslations()
  const title = intl('search_page_title')

  const url = `https://www.equinor.com/${locale === 'no' ? 'no' : ''}/search`
  return {
    title: `${title} - ${metaTitleSuffix}`,
    openGraph: {
      title: title,
      url,
      locale,
      type: 'website',
      siteName: 'Equinor',
    },
    alternates: {
      canonical: url,
      languages: {
        en: 'https://www.equinor.com/search',
        no: 'https://www.equinor.com/no/search',
        'x-default': 'https://www.equinor.com/search',
      },
    },
  }
} */

export default function Page() {
  const router = useRouter()

  return (
    <div className='dark fixed inset-0 overflow-auto bg-slate-blue-95'>
      <FloatingOverlay lockScroll>
        <TopbarDropdown variant='dark'>
          <NavTopbar>
            <LogoLink />
            <button
              type='button'
              aria-expanded={true}
              aria-label='Close search'
              onClick={() => {
                router.back()
              }}
              className={`focus-visible:envis-outline-invert rounded-full p-3 text-white-100 hover:bg-moss-green-50 hover:text-slate-blue-95 focus:outline-none active:scale-99 active:bg-white-100/20`}
            >
              <Icon size={24} data={close} />
            </button>
          </NavTopbar>

          <Search />
        </TopbarDropdown>
      </FloatingOverlay>
    </div>
  )
}
