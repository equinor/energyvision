// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
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
  !process.env.RADIX_PUBLIC_DOMAIN_NAME?.includes('preprod');
isProd &&
  Sentry.init({
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
    environment: process.env.NEXT_PUBLIC_SANITY_DATASET,
    enabled: isProd,
    tracesSampleRate: 0.01,
    profilesSampleRate: 0,
    replaysSessionSampleRate: 0,
    replaysOnErrorSampleRate: 0,
    // Setting this option to true will print useful information to the console while you're setting up Sentry.
    debug: false,
    includeLocalVariables: false,
    ignoreErrors: sentryIgnoreErrors,
    allowUrls: [allowUrlPattern],
    denyUrls: sentryDenyUrls,
    beforeBreadcrumb(breadcrumb, hint) {
      return breadcrumb.category === 'ui.click' ? null : breadcrumb;
    },
    beforeSend: sentryBeforeSend,
  });
