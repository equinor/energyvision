/* eslint-disable import/no-unresolved */
import client from 'part:@sanity/base/client'
import FeatureFlags from '../../../FeatureFlags'

export const projectId = client.clientConfig.projectId
export const dataset = client.clientConfig.dataset
export const IS_SECRET = projectId === 'w3b4om14'
export const Flags = FeatureFlags(dataset)
