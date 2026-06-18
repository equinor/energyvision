import type { AssetSource } from 'sanity'
import { definePlugin } from 'sanity'
import FotowarePlugin from './src/components/FotowareAssetSource'
import Icon from './src/components/Icon'

const plugin: AssetSource = {
  icon: Icon,
  name: 'fotoware',
  title: 'Fotoware',
  //@ts-ignore
  component: FotowarePlugin,
}

export const FotowareAssetSource = definePlugin({
  name: 'fotoware',
  form: {
    file: {
      assetSources: prev => [...prev, plugin],
    },
    image: {
      assetSources: prev => [...prev, plugin],
    },
  },
})
