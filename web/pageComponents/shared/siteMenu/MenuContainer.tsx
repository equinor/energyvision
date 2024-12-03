import { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

export const MenuContainer = ({ children, ...rest }: Props) => {
  return (
    <div
      className="text-base bg-transparent px-8 xl:bg-moss-green-50 xl:mt-10 xl:mx-8 xl:flex xl:justify-between items-center"
      {...rest}
    >
      {children}
    </div>
  )
}
