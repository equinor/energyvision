//Keep in sync with sanityv3/schemas/objects/table/tableThemes
export const getColorConfigForTableTheme = (title: string) => {
  switch (title) {
    case 'blue':
      return {
        headerBackground: 'bg-north-sea-50',
        headerText: 'text-norwegian-woods-100',
        headerBorder: 'border-north-sea-50',
        rowBottomBorder: 'border-north-sea-50',
        rowZebraBackground: 'even:bg-north-sea-30',
        rowZebraLastOdd: 'odd:last:border-north-sea-30',
      }
    case 'green':
      return {
        headerBackground: 'bg-autumn-storm-40',
        headerText: 'text-north-sea-90',
        headerBorder: 'border-autumn-storm-60',
        rowBorder: 'border-autumn-storm-40',
        rowZebraBackground: 'even:bg-autumn-storm-20',
        rowZebraLastOdd: 'odd:last:border-autumn-storm-20',
      }
    case 'grey':
    default:
      return {
        headerBackground: 'bg-grey-20',
        headerText: 'text-slate-80',
        headerBorder: 'border-grey-40',
        rowBorder: 'border-grey-20',
        rowZebraBackground: 'even:bg-grey-10',
        rowZebraLastOdd: 'odd:last:border-bg-grey-10',
      }
  }
}
