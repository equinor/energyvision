/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from 'next/link'
import { MenuLink } from './Menu'

export type MenuPanelProps = {
  links: MenuLink[]
}

export const MenuPanel: React.FC<MenuPanelProps> = ({ links }) => {
  return (
    <ul>
      {links.map((link) => (
        <li key={link.label}>
          <Link href={link.url} passHref>
            <a>{link.label}</a>
          </Link>
        </li>
      ))}
    </ul>
  )
}
