import { createPreviewSubscriptionHook } from 'next-sanity'
// eslint-disable-next-line no-unused-vars
import { sanityConfig } from './config'

export const usePreviewSubscription = createPreviewSubscriptionHook(sanityConfig)
