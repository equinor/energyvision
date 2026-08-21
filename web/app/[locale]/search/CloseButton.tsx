'use client'
import { Icon } from '@equinor/eds-core-react'
import { close } from '@equinor/eds-icons'

import { useRouter } from 'next/navigation'
export default function CloseButton() {
  const router = useRouter()
  return (
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
  )
}
