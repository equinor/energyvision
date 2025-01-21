import { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

export const NavTopbar = ({ children, ...rest }: Props) => {
  return (
    <div
      className="h-[var(--topbar-height)] w-full max-w-viewport m-auto py-4 px-layout-sm flex items-center justify-between"
      {...rest}
    >
      {children}
    </div>
  )
}
