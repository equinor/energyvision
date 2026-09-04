// This file configures the initialization of Sentry for edge features (middleware, edge routes, and so on).
// The config you add here will be used whenever one of the edge features is loaded.
// Note that this config is unrelated to the Vercel Edge Runtime and is also required when running locally.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs';
import { dataset } from './languageConfig';
import {
  allowUrlPattern,
  sentryBeforeSend,
  sentryDenyUrls,
  sentryIgnoreErrors,
} from './sentry.shared';

const isProd =
  process.env.NODE_ENV === 'production' &&
  dataset === 'global' &&
  process.env.RADIX_PUBLIC_DOMAIN_NAME?.includes('preprod');

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NEXT_PUBLIC_SANITY_DATASET,
  tracesSampleRate: 0.01,
  profilesSampleRate: 0,
  replaysSessionSampleRate: 0,
  replaysOnErrorSampleRate: 0,
  enabled: isProd,
  includeLocalVariables: false,
  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,
  ignoreErrors: sentryIgnoreErrors,
  allowUrls: [allowUrlPattern],
  denyUrls: sentryDenyUrls,
  beforeBreadcrumb(breadcrumb, hint) {
    return breadcrumb.category === 'ui.click' ? null : breadcrumb;
  },
  beforeSend: sentryBeforeSend,
});
