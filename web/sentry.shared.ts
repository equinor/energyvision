import type { ErrorEvent, EventHint } from '@sentry/nextjs';
import { domain } from './languageConfig';

export const sentryIgnoreErrors: Array<string | RegExp> = [
  "Can't find variable: _sz",
  '_sz is not defined',
  /_sz/i,
  'ResizeObserver loop limit exceeded',
  'Non-Error promise rejection captured',
  'Non-Error promise rejection',
  // Matches exact messages or dynamic patterns via regex
  /^Script error\.?$/,
  /^NetworkError\.?$/,
  /^The operation was aborted due to timeout\.?$/,
  /.*Failed to fetch.*/,
  /.*Error: GET-request to.*/,
  /Non-critical error message/i,
  /Sloppy third-party script error/i,
  'Non-Error exception captured',
  /The destination stream closed early/i,
  /Can't find variable: \$RS/i,
  'TypeError: Failed to fetch',
  'TypeError: NetworkError when attempting to fetch resource',
  'Load failed',
  /Failed to find Server Action/i,
  'This request might be from an older or newer deployment',
];

const normalizedDomain = domain.replace(/^https?:\/\//, '').replace(/\/$/, '');
const escapedDomain = normalizedDomain.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

export const allowUrlPattern = new RegExp(
  `^https?:\\/\\/${escapedDomain}(?::\\d+)?(?:\\/|$)`,
);

export const sentryDenyUrls: Array<string | RegExp> = [
  /gtm\.js/, // Blocks any error coming from the GTM script
  /app:\/\/\/gtm\.js/, // Matches the exact path pattern from your stack trace
  /uc\.js/i,
  /\/news\/archive\//,
  /extensions\//i,
  /^chrome-extension:\/\//i,
  /^moz-extension:\/\//i,
];

export const sentryBeforeSend = (event: ErrorEvent, hint?: EventHint) => {
  const message = event?.message || event.exception?.values?.[0]?.value || '';
  const errorFromEvent = event?.exception?.values?.[0];
  // 1. Drop a specific error based on the original exception type/message
  const originalException = hint?.originalException;
  if (
    originalException instanceof Error &&
    originalException?.message?.includes('Failed to fetch')
  ) {
    return null; // Discard the event
  }

  if (errorFromEvent?.value?.includes('Failed to fetch')) {
    return null;
  }

  // Drop the event if it mentions the missing _sz variable
  if (message.includes('_sz')) {
    return null;
  }

  // Ignore specific error types
  if (event.message?.includes('ChunkLoadError')) {
    return null;
  }
  // Add custom fingerprinting for grouping
  if (event.exception?.values?.[0]?.value?.includes('NetworkError')) {
    event.fingerprint = ['network-error'];
  }

  return event;
};
