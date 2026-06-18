export type TabsThemeColors = {
  key?: string
  backgroundUtility?: string
  cardBackground?: string
  dark?: boolean
}
//Keep in sync with studio/schemas/objects/tabs/tabsThemes
export const getColorForTabsTheme = (pattern?: number): TabsThemeColors => {
  switch (pattern) {
    case 0:
      return {
        key: 'mist-blue-100',
        backgroundUtility: 'bg-mist-blue-100',
        cardBackground: 'bg-white-100',
      }
    case 1:
      return {
        key: 'sand-and-summer-50',
        backgroundUtility: 'bg-sand-and-summer-50',
        cardBackground: 'bg-orange-50',
      }
    case 2:
      return {
        key: 'norwegian-woods-40',
        backgroundUtility: 'bg-norwegian-woods-40',
        cardBackground: 'bg-green-50',
      }
    default:
      return {}
  }
}
