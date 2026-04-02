import { FeatureFlags } from '@energyvision/shared/featureFlags'
import { dataset } from '@/sanity.client'

export const Flags = FeatureFlags(dataset)
