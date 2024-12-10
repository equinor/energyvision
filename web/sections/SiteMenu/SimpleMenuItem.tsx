import { Link, ReadMoreLink } from '@core/Link'
import type { SimpleGroupData } from '../../types/index'
import { Menu } from '@core/MenuAccordion'

/* const SimpleSubMenu = styled(SubMenu)`
  @media (min-width: 1300px) {
    border-bottom: 0.5px solid var(--grey-40);
  }
` */

const { MenuItem, MenuHeader, MenuContent } = Menu

type MenuGroupType = {
  item: SimpleGroupData
  index: number
}

export const SimpleMenuItem = ({ item, index }: MenuGroupType) => {
  const { type, label, links = [], readMoreLink } = item

  if (item?.type === 'simpleMenuLink' && item.link && !item.link.slug) {
    console.warn('Missing slug for simple menu link')
  }
  return (
    <MenuItem value={`${index}`}>
      {label && <MenuHeader>{label}</MenuHeader>}
      <MenuContent className="md:max-w-screen-3xl mx-0 my-auto">
        {type === 'simpleMenuLink' ? (
          <>
            <Link
              className="list-none no-underline w-full mt-2 mx-0 mr-0 hover:bg-grey-10 py-xs+sm"
              href={(item.link && item.link.slug) || '/'}
            >
              {item.label}
            </Link>
          </>
        ) : (
          <div className="pb-6">
            <div className="max-w-menuText xl:pr-lg pb-sm">
              {!!readMoreLink?.link?.slug && (
                <ReadMoreLink href={readMoreLink.link?.slug}>{readMoreLink.label}</ReadMoreLink>
              )}
            </div>
            <ul aria-label={label} className="flex flex-col flex-wrap">
              {links?.map((link: any) => (
                <li className="m-0" key={link.id}>
                  <Link
                    className={`flex 
                      aria-current:bg-grey-10
                      hover:bg-grey-10
                      m-0
                      no-underline
                      px-md
                      py-xs+sm
                      xl:ml-[calc(var(--space-medium)_*_(-1))]
                      aria-current:border-l-[3px]
                      aria-current:border-moss-green-95
                      `}
                    href={link?.link?.slug || '/'}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </MenuContent>
    </MenuItem>
  )
}

/* if (item?.type === 'simpleMenuGroup') {
  return <SimpleMenuItem item={item} key={item.id} index={idx} />
} else if (item?.type === 'simpleMenuLink') {
  // Is this really necessary?
  if (item.link && !item.link.slug) {
    console.warn('Missing slug for simple menu link')
  }
  return (
    <li key={item.id}>
      <Link
        className="list-none no-underline w-full mt-2 mx-0 mr-0 hover:bg-grey-10 py-xs+sm"
        href={(item.link && item.link.slug) || '/'}
      >
        {' '}
        {item.label}{' '}
      </Link>
    </li>
  )
}
})} */
