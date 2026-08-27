# syntax=docker/dockerfile:1
# 1. Set up prune and build environment
FROM node:24-alpine AS core-os
RUN apk update
RUN apk add --no-cache libc6-compat curl

FROM core-os AS base
WORKDIR /app
RUN npm install --global pnpm@11.24.0 turbo@2.10.10

# 2. Prune stage
FROM base AS prepare
COPY . .
RUN turbo prune energy-vision-web --docker

# 1. Build stage
FROM base AS builder
# Copy the pruned lockfile and workspace config from the root of /out
COPY --from=prepare /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=prepare /app/out/pnpm-workspace.yaml ./pnpm-workspace.yaml
# Copy all the isolated package.json files
COPY --from=prepare /app/out/json/ .

# This will now safely run using the shared, pruned lockfile
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

# Copy source code and build
COPY --from=prepare /app/out/full/ .

ARG ARG_SANITY_DATASET
ARG ARG_SANITY_PROJECT_ID
ARG ARG_ALGOLIA_APP_ID
ARG ARG_ARCHIVE_CONTENT_LINK
ARG ARG_FRIENDLY_CAPTCHA_SITEKEY
ARG ARG_DEPLOYMENT_ID
ARG ARG_OPTIMIZED_SANITY_FETCH
ARG ARG_SENTRY_DSN

ENV NEXT_PUBLIC_SANITY_DATASET=${ARG_SANITY_DATASET}
ENV NEXT_PUBLIC_SANITY_PROJECT_ID=${ARG_SANITY_PROJECT_ID}
ENV NEXT_PUBLIC_ALGOLIA_APP_ID=${ARG_ALGOLIA_APP_ID}
ENV NEXT_PUBLIC_ARCHIVE_CONTENT_LINK=${ARG_ARCHIVE_CONTENT_LINK}
ENV NEXT_PUBLIC_FRIENDLY_CAPTCHA_SITEKEY=${ARG_FRIENDLY_CAPTCHA_SITEKEY}
ENV NEXT_PUBLIC_OPTIMIZED_SANITY_FETCH=${ARG_OPTIMIZED_SANITY_FETCH}
ENV NEXT_TELEMETRY_DISABLED=1
ENV TURBO_TELEMETRY_DISABLED=1
ENV NEXT_DEPLOYMENT_ID=${ARG_DEPLOYMENT_ID}

RUN --mount=type=secret,id=sanity_api_token \
    --mount=type=secret,id=next_public_algolia_search_api_key \
    --mount=type=secret,id=next_server_actions_encryption_key \
    sh -ec 'SANITY_API_TOKEN="$(cat /run/secrets/sanity_api_token)" NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY="$(cat /run/secrets/next_public_algolia_search_api_key)" NEXT_SERVER_ACTIONS_ENCRYPTION_KEY="$(cat /run/secrets/next_server_actions_encryption_key)" NEXT_PUBLIC_SENTRY_DSN="${ARG_SENTRY_DSN}" turbo build --filter=energy-vision-web'

# 1. Run time environment
FROM core-os AS runner
RUN apk add --no-cache tini

ARG ARG_ENV
ARG ARG_NODE_ENV
ARG ARG_SANITY_DATASET
ARG ARG_ALGOLIA_APP_ID
ARG ARG_FRIENDLY_CAPTCHA_SITEKEY
ARG ARG_OPTIMIZED_SANITY_FETCH
ARG ARG_SENTRY_DSN

ENV ENV=${ARG_ENV}
ENV NODE_ENV=${ARG_NODE_ENV}

ENV NEXT_PUBLIC_SANITY_DATASET=${ARG_SANITY_DATASET}
ENV NEXT_PUBLIC_ALGOLIA_APP_ID=${ARG_ALGOLIA_APP_ID}
ENV NEXT_PUBLIC_FRIENDLY_CAPTCHA_SITEKEY=${ARG_FRIENDLY_CAPTCHA_SITEKEY}
ENV NEXT_PUBLIC_OPTIMIZED_SANITY_FETCH=${ARG_OPTIMIZED_SANITY_FETCH}
ENV NEXT_PUBLIC_SENTRY_DSN=${ARG_SENTRY_DSN}
ENV NEXT_TELEMETRY_DISABLED=1
ENV TURBO_TELEMETRY_DISABLED=1
ENV USER=nextjs
ENV UID=12345

RUN addgroup -S "$USER" && adduser -S --uid "$UID" "$USER" && apk add --no-cache tini


WORKDIR /app
RUN ls -la
COPY --from=builder /app/web/public ./web/public
COPY --from=builder  --chown="$USER":"$USER" /app/web/.next/standalone ./
COPY --from=builder  --chown="$USER":"$USER" /app/web/.next/static ./web/.next/static
# Copy the complete node_modules structure from your installer stage to preserve symlinks
COPY --from=builder /app/node_modules ./node_modules

USER "$UID"
EXPOSE 3000

ENTRYPOINT ["/sbin/tini", "--"]
CMD ["node", "./web/server.js"]