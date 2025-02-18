export type TabsThemeColors = {
  backgroundUtility?: string
  cardBackground?: string
  dark?: boolean
}
//Keep in sync with sanityv3/schemas/objects/tabs/tabsThemes
export const getColorForTabsTheme = (pattern?: number): TabsThemeColors => {
  switch (pattern) {
    case 0:
      return {
        backgroundUtility: 'bg-mist-blue-100',
        cardBackground: 'bg-white-100',
      }
    case 1:
      return {
        backgroundUtility: 'bg-sand-and-summer-50',
        cardBackground: 'bg-orange-50',
      }
    case 2:
      return {
        backgroundUtility: 'bg-norwegian-woods-40',
        cardBackground: 'bg-green-50',
      }
    default:
      return {}
  }
}
