/* import { FeatureFlags } from "@@/" */

import { FeatureFlags } from "@@/featureFlags"


export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || ''
export const Flags = FeatureFlags(dataset)
