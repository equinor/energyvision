import FotowarePlugin from './src/FotowareAssetSource'
import PlacholderAssetSource from './src/Placeholder'
import Icon from './src/Icon'
import { HAS_FOTOWARE } from '../../src/lib/datasetHelpers'

export default {
  name: 'fotoware',
  title: 'Fotoware',
  component: HAS_FOTOWARE ? FotowarePlugin : PlacholderAssetSource,
  icon: Icon,
}
