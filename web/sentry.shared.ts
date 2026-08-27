import { domain } from './languageConfig'

export const sentryIgnoreErrors: Array<string | RegExp> = [
  "Can't find variable: _sz",
  '_sz is not defined',
  /_sz/i,
  'ResizeObserver loop limit exceeded',
  'Non-Error promise rejection captured',
  /Sloppy third-party script error/i,
  'Non-Error exception captured',
]

const normalizedDomain = domain.replace(/^https?:\/\//, '').replace(/\/$/, '')
const escapedDomain = normalizedDomain.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

export const allowUrlPattern = new RegExp(
  `^https?:\\/\\/${escapedDomain}(?::\\d+)?(?:\\/|$)`,
)

export const sentryDenyUrls: Array<string | RegExp> = [
  /gtm\.js/, // Blocks any error coming from the GTM script
  /app:\/\/\/gtm\.js/, // Matches the exact path pattern from your stack trace
]

export const sentryBeforeSend = (event: any) => {
  const message = event?.message || event.exception?.values?.[0]?.value || ''

  // Drop the event if it mentions the missing _sz variable
  if (message.includes('_sz')) {
    return null
  }

  // Ignore specific error types
  if (event.message?.includes('ChunkLoadError')) {
    return null
  }
  // Add custom fingerprinting for grouping
  if (event.exception?.values?.[0]?.value?.includes('NetworkError')) {
    event.fingerprint = ['network-error']
  }

  return event
}
