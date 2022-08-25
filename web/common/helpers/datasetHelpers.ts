import FeatureFlags from '../../../FeatureFlags'

export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || ''
export const Flags = FeatureFlags(dataset)
