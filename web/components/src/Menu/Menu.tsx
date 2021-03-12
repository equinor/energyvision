import { useState, useEffect, useRef } from 'react'
import { Tabs } from '@equinor/eds-core-react'
import { MenuPanel } from './MenuPanel'
import styled from 'styled-components'

const StyledPanels = styled(Tabs.Panels)`
  display: none;
  position: absolute;
  left: 0;
  background: rgba(255, 255, 255, 1);
  width: 100%;
`

// Data structure is just a placeholder and will depend on data passed by Sanity
// Currently this is just a prototype
export type MenuItem = {
  label: string
  links: MenuLink[]
}

export type MenuLink = {
  label: string
  url: string
}

export type MenuProps = {
  items: MenuItem[]
  offset?: number
}

export const Menu: React.FC<MenuProps> = ({ items, offset = 0 }) => {
  const menuRef = useRef<HTMLDivElement>(null)
  const [activeTab, setActiveTab] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  const handleClickOutside = (e: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(e.target as HTMLElement)) {
      setIsVisible(false)
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  })

  const handleTabChange = (index: number) => {
    setIsVisible(true)
    setActiveTab(index)
  }

  return (
    <Tabs ref={menuRef} variant="fullWidth" activeTab={activeTab} onChange={handleTabChange}>
      <Tabs.TabList>
        {items.map((item) => (
          <Tabs.Tab key={item.label}>{item.label}</Tabs.Tab>
        ))}
      </Tabs.TabList>
      <StyledPanels style={{ display: isVisible ? 'block' : 'none', top: `${offset}px` }}>
        {items.map((item) => (
          <Tabs.Panel key={item.label}>
            <MenuPanel links={item.links}></MenuPanel>
          </Tabs.Panel>
        ))}
      </StyledPanels>
    </Tabs>
  )
}
