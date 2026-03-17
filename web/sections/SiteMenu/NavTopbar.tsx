import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

export const NavTopbar = ({ children }: Props) => {
  return (
    <div className='m-auto flex h-topbar w-full items-center justify-between px-layout-sm py-4'>
      {children}
    </div>
  )
}
