import { createPreviewSubscriptionHook, createPortableTextComponent } from 'next-sanity'
// eslint-disable-next-line no-unused-vars
import { sanityConfig } from './config'

export const usePreviewSubscription = createPreviewSubscriptionHook(sanityConfig)

export const PortableText = createPortableTextComponent({
  ...sanityConfig,
  // Serializers passed to @sanity/block-content-to-react
  // (https://github.com/sanity-io/block-content-to-react)
  serializers: {},
})
