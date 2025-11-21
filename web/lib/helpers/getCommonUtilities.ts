export type LayoutPxVariant = 'sm' | 'md' | 'lg'
export const getLayoutPx = (variant: LayoutPxVariant) => {
  switch (variant) {
    case 'sm':
      return `px-layout-sm`
    case 'md':
      return `px-layout-sm lg:px-layout-md`
    default:
      return `px-layout-sm lg:px-layout-lg`
  }
}

export type GridColumnVariant = '2' | '3' | '4'
export const getGridTemplateColumns = (variant: GridColumnVariant) => {
  switch (variant) {
    case '2':
      return `grid-cols-1 lg:grid-cols-2`
    case '3':
      return `grid-cols-1 lg:grid-cols-3`
    default:
      return `grid-cols-1 lg:grid-cols-3`
  }
}
