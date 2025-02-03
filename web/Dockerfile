ARG ARG_DYNATRACE_IMAGE='node:16-alpine'

#spa-equinor.kanari.com/e/<environment>/linux/oneagent-codemodules-musl:all
FROM ${ARG_DYNATRACE_IMAGE} AS dynatrace

FROM node:18-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
ENV NODE_OPTIONS="--max_old_space_size=8192"
RUN corepack enable
COPY . /app
WORKDIR /app

# Install dependencies only when needed
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json pnpm-lock.yaml ./
COPY web/package.json web/pnpm-lock.yaml web/
COPY web/patches web/patches

RUN \
  if [ -f pnpm-lock.yaml ]; then pnpm m i --frozen-lockfile;\
  else echo "Lockfile not found." && exit 1; \
  fi

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/web/node_modules ./web/node_modules
COPY . .

ARG ARG_SANITY_DATASET
ARG ARG_SANITY_API_TOKEN
ARG ARG_SANITY_PROJECT_ID
ARG ARG_ALGOLIA_APP_ID
ARG ARG_ALGOLIA_SEARCH_API_KEY
ARG ARG_ARCHIVE_CONTENT_LINK
ARG ARG_FRIENDLY_CAPTCHA_SITEKEY
ARG ARG_FRIENDLY_CAPTCHA_PUZZLE_ENDPOINT

ENV NEXT_PUBLIC_SANITY_DATASET ${ARG_SANITY_DATASET}
ENV NEXT_PUBLIC_SANITY_PROJECT_ID ${ARG_SANITY_PROJECT_ID}
ENV SANITY_API_TOKEN ${ARG_SANITY_API_TOKEN}
ENV NEXT_PUBLIC_ALGOLIA_APP_ID ${ARG_ALGOLIA_APP_ID}
ENV NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY ${ARG_ALGOLIA_SEARCH_API_KEY}
ENV NEXT_PUBLIC_ARCHIVE_CONTENT_LINK ${ARG_ARCHIVE_CONTENT_LINK}
ENV NEXT_PUBLIC_FRIENDLY_CAPTCHA_SITEKEY ${ARG_FRIENDLY_CAPTCHA_SITEKEY}
ENV NEXT_PUBLIC_FRIENDLY_CAPTCHA_PUZZLE_ENDPOINT ${ARG_FRIENDLY_CAPTCHA_PUZZLE_ENDPOINT} 

# https://nextjs.org/telemetry
ENV NEXT_TELEMETRY_DISABLED 1

RUN pnpm web build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

ARG ARG_ENV
ARG ARG_SANITY_DATASET
ARG ARG_ALGOLIA_APP_ID
ARG ARG_ALGOLIA_SEARCH_API_KEY
ARG ARG_FRIENDLY_CAPTCHA_SITEKEY
ARG ARG_FRIENDLY_CAPTCHA_PUZZLE_ENDPOINT

ENV ENV ${ARG_ENV}
ENV NEXT_PUBLIC_SANITY_DATASET ${ARG_SANITY_DATASET}
ENV NEXT_PUBLIC_ALGOLIA_APP_ID ${ARG_ALGOLIA_APP_ID}
ENV NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY ${ARG_ALGOLIA_SEARCH_API_KEY}
ENV NEXT_PUBLIC_FRIENDLY_CAPTCHA_SITEKEY ${ARG_FRIENDLY_CAPTCHA_SITEKEY}
ENV NEXT_PUBLIC_FRIENDLY_CAPTCHA_PUZZLE_ENDPOINT ${ARG_FRIENDLY_CAPTCHA_PUZZLE_ENDPOINT} 

ENV PORT 3000
ENV USER nextjs
ENV UID 12345
# https://nextjs.org/telemetry
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup -S "$USER"
RUN adduser -S --uid "$UID" "$USER"
RUN apk add --no-cache tini

COPY --from=builder /app/web/public ./public
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown="$USER":"$USER" /app/web/.next/standalone .
COPY --from=builder --chown="$USER":"$USER" /app/web/.next/static ./.next/static

USER "$UID"

# Copy dynatrace or "empty"
COPY --from=dynatrace / /
ENV LD_PRELOAD /opt/dynatrace/oneagent/agent/lib64/liboneagentproc.so
ENV DT_TAGS=EQUINORCOM\ ENVIRONMENT=${ARG_ENV}\ DT_PROCESS_GROUP=${ARG_SANITY_DATASET}
ENV NEXT_MANUAL_SIG_HANDLE=true

EXPOSE "$PORT"

ENTRYPOINT ["/sbin/tini", "--"]

CMD ["node", "server.js"]

