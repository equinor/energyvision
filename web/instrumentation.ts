import events from 'node:events';
import * as Sentry from '@sentry/nextjs';

// Increase global limit from 10 to 30 to accommodate both SDKs final try for avoiding max event listeners warning
events.EventEmitter.defaultMaxListeners = 30;

export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    await import('./sentry.server.config');
  }
  if (process.env.NEXT_RUNTIME === 'edge') {
    await import('./sentry.edge.config');
  }
}
export const onRequestError = Sentry.captureRequestError;
