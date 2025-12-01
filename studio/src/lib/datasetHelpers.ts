import { FeatureFlags } from '@/featureFlags'
import { dataset } from '@/sanity.client'

export const Flags = FeatureFlags(dataset)
