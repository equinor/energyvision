import React from 'react'
import S from '@sanity/desk-tool/structure-builder'
import { MenuIcon } from '../../../../icons'
import { languages } from '../../../../languages'
// eslint-disable-next-line import/no-unresolved
import client from 'part:@sanity/base/client'
import flags from '../../../../icons/countries'

const dataSet = client.clientConfig.dataset
const EQUINOR_COM_NAME = 'global'
const EQUINOR_COM_DEV = 'global-development'
const isGlobal = dataSet === EQUINOR_COM_NAME || dataSet === EQUINOR_COM_DEV

const menuId = (lang) => {
  if (isGlobal) {
    return lang.id + '-menu'
  } else {
    return lang.id + '-simple-menu'
  }
}

const getMenuListItems = (lang) => {
  const mainMenu = S.listItem({
    title: 'Main menu',
    id: `main-menu`,
    icon: MenuIcon,
    child: () =>
      S.documentWithInitialValueTemplate(isGlobal ? 'menu-with-locale' : 'simple-menu-with-locale', {
        isoCode: `${lang.name}`,
      })
        .id(menuId(lang))
        .title(`${lang.title} site menu`),
  })

  const subMenu = S.listItem({
    title: 'Sub menus',
    id: 'subMenuTest',
    child: () =>
      S.documentTypeList('subMenu')
        .title('Sub menu')
        .filter('_type == "subMenu" && _lang == $baseLang')
        .params({ baseLang: lang.name })
        //.params({ isoCode: `${lang.name}` })
        .initialValueTemplates([S.initialValueTemplate('submenu-with-locale', { isoCode: `${lang.name}` })]),
  })

  return isGlobal ? mainMenu : subMenu
}

const menus = languages.map((lang) =>
  S.listItem({
    title: `${lang.title} menu`,
    id: `menu-${lang.id}`,
    icon: flags[lang.id],
    child: () =>
      S.list({
        id: 'menu-list',
        items: getMenuListItems(lang),
      }),
  }),
)

export const Menu = S.listItem()
  .title('Menu')
  .icon(MenuIcon)
  .child(S.list('menu').id('menu').title('Menus').items(menus))
