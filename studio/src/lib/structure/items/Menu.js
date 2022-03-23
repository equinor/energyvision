import React from 'react'
import S from '@sanity/desk-tool/structure-builder'
import { MenuIcon } from '../../../../icons'
import { languages } from '../../../../languages'
// eslint-disable-next-line import/no-unresolved
import flags from '../../../../icons/countries'
import { IS_GLOBAL } from '../../datasetHelpers'

const menuId = (lang) => {
  if (IS_GLOBAL) {
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
      S.documentWithInitialValueTemplate(IS_GLOBAL ? 'menu-with-locale' : 'simple-menu-with-locale', {
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
        .initialValueTemplates([S.initialValueTemplateItem('submenu-with-locale', { isoCode: `${lang.name}` })]),
  })

  return IS_GLOBAL ? [mainMenu, subMenu] : [subMenu]
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
