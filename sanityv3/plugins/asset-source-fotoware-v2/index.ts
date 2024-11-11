import FotowarePlugin from './src/FotowareAssetSource'
import Icon from './src/Icon'
import { definePlugin } from 'sanity'
import type { AssetSource } from 'sanity'

const plugin: AssetSource = {
  icon: Icon,
  name: 'fotoware',
  title: 'Fotoware',
  component: FotowarePlugin,
}

export const FotowareAssetSource = definePlugin({
  name: 'fotoware',
  form: {
    file: {
      assetSources: (prev) => [...prev, plugin],
    },
    image: {
      assetSources: (prev) => [...prev, plugin],
    },
  },
})
