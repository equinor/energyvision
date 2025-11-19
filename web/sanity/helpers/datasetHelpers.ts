// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import { FeatureFlags } from '../../../FeatureFlags.mjs'
//import { DatasetsKeys } from '@energyvision/shared'
//import { FeatureFlags } from '@energyvision/shared/featureFlags'

export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET //as DatasetsKeys

export const Flags = FeatureFlags(dataset)
