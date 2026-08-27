// This file configures the initialization of Sentry on the client.
// The added config here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs'
import {
  allowUrlPattern,
  sentryBeforeSend,
  sentryDenyUrls,
  sentryIgnoreErrors,
} from './sentry.shared'

const isProd = process.env.NODE_ENV === 'production'

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  enableLogs: false,
  includeLocalVariables: false,
  enabled: isProd,
  debug: false,
  tracesSampleRate: 0.01,
  profilesSampleRate: 0,
  replaysSessionSampleRate: 0,
  replaysOnErrorSampleRate: 0,
  dataCollection: {
    userInfo: false,
    httpBodies: [],
  },
  ignoreErrors: sentryIgnoreErrors,
  allowUrls: [allowUrlPattern],
  denyUrls: sentryDenyUrls,
  beforeBreadcrumb(breadcrumb) {
    return breadcrumb.category === 'ui.click' ? null : breadcrumb
  },
  beforeSend: sentryBeforeSend,
})

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart
