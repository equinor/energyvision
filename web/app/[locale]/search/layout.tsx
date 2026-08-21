'use client'
import { Icon } from '@equinor/eds-core-react'
import { close } from '@equinor/eds-icons'
import { useRouter } from 'next/navigation'
import { Suspense } from 'react'
import { LogoLink } from '@/core/Link/LogoLink'
import { NavTopbar } from '@/sections/SiteMenu/NavTopbar'
import { TopbarDropdown } from '@/sections/SiteMenu/TopbarDropdown'

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  return (
    <div
      data-search-page='true'
      className='dark w-full overflow-auto bg-slate-blue-95'
    >
      <TopbarDropdown variant='dark' className='relative'>
        <NavTopbar>
          <LogoLink />
          <Suspense>
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
          </Suspense>
        </NavTopbar>
      </TopbarDropdown>
      {children}
    </div>
  )
}
