import styled from 'styled-components'

import { List, Menu } from '@components'
import { Link, ReadMoreLink } from '@core/Link'
import { SimpleHeader } from './SimpleHeader'
import type { SimpleGroupData } from '../../../../types/index'
import { SubMenuGroupList } from '../SubMenuGroup'
import { AccordionPanel } from '@chakra-ui/react'

const { SubMenu } = Menu
const { Item } = List

const SimpleSubMenu = styled(SubMenu)`
  @media (min-width: 1300px) {
    border-bottom: 0.5px solid var(--grey-40);
  }
`

type MenuGroupType = {
  item: SimpleGroupData
  index: number
}

export const SimpleMenuItem = ({ item, index }: MenuGroupType) => {
  const { label, links = [], readMoreLink } = item

  return (
    <SimpleSubMenu id={index}>
      {label && <SimpleHeader>{label}</SimpleHeader>}
      <AccordionPanel className='md:max-w-screen-3xl mx-0 my-auto'>
        <div className='pb-6'>
          <div className="max-w-menuText xl:pr-lg pb-sm"> {!!readMoreLink?.link?.slug && <ReadMoreLink href={readMoreLink.link?.slug}>{readMoreLink.label}</ReadMoreLink>}
          </div>
          <SubMenuGroupList aria-label={label} unstyled>
            {links?.map((link) => (
              <Item className='m-0' key={link.id}>
                <Link className={`flex aria-current:bg-grey-10 hover:bg-grey-10 m-0 no-underline px-md py-xs+sm xl:ml-[calc(var(--space-medium)_*_(-1))]  aria-current:border-l-[3px] aria-current:border-moss-green-95`} href={link?.link?.slug || '/'}>{link.label}</Link>
              </Item>
            ))}
          </SubMenuGroupList>
        </div>
      </AccordionPanel>
    </SimpleSubMenu>
  )
}
