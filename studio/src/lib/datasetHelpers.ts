import { FeatureFlags } from '@shared/featureFlags'
import { dataset as sanityDataset } from '../../sanity.client'

export const dataset = sanityDataset
export const Flags = FeatureFlags(dataset)
