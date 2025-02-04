export type TabsThemeColors = {
  background?: string
  cardBackground?: string
  dark?: boolean
}
//Keep in sync with sanityv3/schemas/objects/tabs/tabsThemes
export const getColorForTabsTheme = (pattern?: number): TabsThemeColors => {
  switch (pattern) {
    case 0:
      return {
        background: 'bg-mist-blue-100',
        cardBackground: 'bg-blue-50',
      }
    case 1:
      return {
        background: 'bg-orange-50',
        cardBackground: 'bg-sand-and-summer-50',
      }
    case 2:
      return {
        background: 'bg-norwegian-woods-40',
        cardBackground: 'bg-green-50',
      }
    default:
      return {}
  }
}
