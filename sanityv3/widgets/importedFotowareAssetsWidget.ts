import type {DashboardWidget, LayoutConfig} from '@sanity/dashboard'
import { ImportedFotowareAssetsWidget } from './ImportedFotowareAssetsWidget'


export function importedFotowareAssetsWidget(layout: LayoutConfig): DashboardWidget {
  return {
    name: 'importedFotowareAssetsWidget',
    component: function component() {
      return <ImportedFotowareAssetsWidget />
    },
    layout: layout,
  }
}