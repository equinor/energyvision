'use client'
import { Icon } from '@equinor/eds-core-react'
import { close } from '@equinor/eds-icons'
import { useRouter } from 'next/navigation'
import { LogoLink } from '@/core/Link/LogoLink'
import { NavTopbar } from '@/sections/SiteMenu/NavTopbar'
import { TopbarDropdown } from '@/sections/SiteMenu/TopbarDropdown'
import { Search } from '@/sections/searchBlocks/Search'

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
    <div className='dark w-full overflow-auto bg-slate-blue-95'>
      <div className='relative mx-auto min-h-[55vh] w-full max-w-fullwidth'>
        <TopbarDropdown variant='dark' className='absolute'>
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
      </div>
      {/*       <div className='mx-auto max-w-content'>
        <div className='px-layout-sm'>
          <div className='border-white-100/20 border-b' />
        </div>
      </div> */}
    </div>
  )
}
