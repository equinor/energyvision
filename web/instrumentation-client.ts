// This file configures the initialization of Sentry on the client.
// The added config here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: 'https://8c4f308da7deed9aea83c76daa1938c0@o4509004923797504.ingest.de.sentry.io/4509010392121425',
  // Enable logs to be sent to Sentry
  enableLogs: true,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,
  ignoreErrors: [
    '_sz is not defined', // Discards the specific ReferenceError
    /ReferenceError: _sz is not defined/i, // Alternative regex approach
  ],
  denyUrls: [
    /gtm\.js/, // Blocks any error coming from the GTM script
    /app:\/\/\/gtm\.js/, // Matches the exact path pattern from your stack trace
  ],
  beforeSend(event, hint) {
    const message = event.exception?.values?.[0]?.value || ''

    // Drop the event if it mentions the missing _sz variable
    if (message.includes('_sz is not defined')) {
      return null
    }

    return event
  },
})

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart
