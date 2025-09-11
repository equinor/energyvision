import { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

export const NavTopbar = ({ children, ...rest }: Props) => {
  return (
    <div className="m-auto flex h-topbar w-full items-center justify-between px-layout-sm py-4" {...rest}>
      {children}
    </div>
  )
}
