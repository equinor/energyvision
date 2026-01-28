import * as Sentry from "@sentry/nextjs";
export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    // @ts-ignore
    await import("./sentry.server.config");
  }
  if (process.env.NEXT_RUNTIME === "edge") {
    // @ts-ignore
    await import("./sentry.edge.config");
  }
}
export const onRequestError = Sentry.captureRequestError;