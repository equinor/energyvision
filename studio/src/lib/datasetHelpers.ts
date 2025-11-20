import { FeatureFlags } from '@shared/featureFlags'
import { dataset } from '@/sanity.client'

export const Flags = FeatureFlags(dataset)
