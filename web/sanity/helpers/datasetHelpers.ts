import { FeatureFlags } from '@energyvision/shared/featureFlags'
import type { DatasetsKeys } from '@energyvision/shared/satelliteConfig'

export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET as DatasetsKeys

export const Flags = FeatureFlags(dataset)
