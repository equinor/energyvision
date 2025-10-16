# -------------------------------------------------------- #
# 1. Base system environment
# -------------------------------------------------------- #
FROM node:20-alpine AS core-os
RUN apk update
RUN apk add --no-cache libc6-compat curl

# -------------------------------------------------------- #
# 2. Core tooling setup (PNPM, etc.)
# -------------------------------------------------------- #
FROM core-os AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

# -------------------------------------------------------- #
# 4. Build application
# -------------------------------------------------------- #
FROM base AS prod-deps
WORKDIR /app/web
COPY web/pnpm-lock.yaml ./pnpm-lock.yaml
COPY web/package.json ./package.json
RUN ls
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile 

# -------------------------------------------------------- #
# 4. Build application
# -------------------------------------------------------- #
FROM base AS build

WORKDIR /app
# Copy full repo, then bring in the web workspace node_modules from deps
COPY . .
RUN ls
#COPY --from=prod-deps /app/web/node_modules ./web/node_modules
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm web install --frozen-lockfile 
ARG ARG_SANITY_DATASET
ARG ARG_SANITY_API_TOKEN
ARG ARG_SANITY_PROJECT_ID
ARG ARG_ALGOLIA_APP_ID
ARG ARG_ALGOLIA_SEARCH_API_KEY
ARG ARG_ARCHIVE_CONTENT_LINK
ARG ARG_FRIENDLY_CAPTCHA_SITEKEY
ARG ARG_FRIENDLY_CAPTCHA_PUZZLE_ENDPOINT

ENV NEXT_PUBLIC_SANITY_DATASET=${ARG_SANITY_DATASET}
ENV NEXT_PUBLIC_SANITY_PROJECT_ID=${ARG_SANITY_PROJECT_ID}
ENV SANITY_API_TOKEN=${ARG_SANITY_API_TOKEN}
ENV NEXT_PUBLIC_ALGOLIA_APP_ID=${ARG_ALGOLIA_APP_ID}
ENV NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY=${ARG_ALGOLIA_SEARCH_API_KEY}
ENV NEXT_PUBLIC_ARCHIVE_CONTENT_LINK=${ARG_ARCHIVE_CONTENT_LINK}
ENV NEXT_PUBLIC_FRIENDLY_CAPTCHA_SITEKEY=${ARG_FRIENDLY_CAPTCHA_SITEKEY}
ENV NEXT_PUBLIC_FRIENDLY_CAPTCHA_PUZZLE_ENDPOINT=${ARG_FRIENDLY_CAPTCHA_PUZZLE_ENDPOINT}
ENV NEXT_TELEMETRY_DISABLED=1

RUN pnpm web build


# -------------------------------------------------------- #
# 6. Runtime container
# -------------------------------------------------------- #
FROM core-os AS runner

ENV NODE_ENV=production

ARG ARG_ENV
ARG ARG_SANITY_DATASET
ARG ARG_ALGOLIA_APP_ID
ARG ARG_ALGOLIA_SEARCH_API_KEY
ARG ARG_FRIENDLY_CAPTCHA_SITEKEY
ARG ARG_FRIENDLY_CAPTCHA_PUZZLE_ENDPOINT

ENV ENV=${ARG_ENV}
ENV NEXT_PUBLIC_SANITY_DATASET=${ARG_SANITY_DATASET}
ENV NEXT_PUBLIC_ALGOLIA_APP_ID=${ARG_ALGOLIA_APP_ID}
ENV NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY=${ARG_ALGOLIA_SEARCH_API_KEY}
ENV NEXT_PUBLIC_FRIENDLY_CAPTCHA_SITEKEY=${ARG_FRIENDLY_CAPTCHA_SITEKEY}
ENV NEXT_PUBLIC_FRIENDLY_CAPTCHA_PUZZLE_ENDPOINT=${ARG_FRIENDLY_CAPTCHA_PUZZLE_ENDPOINT}

ENV PORT 3000
ENV USER nextjs
ENV UID 12345
ENV NEXT_TELEMETRY_DISABLED 1

COPY --from=build /app/web/public ./public
# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=build --chown="$USER":"$USER" /app/web/.next/standalone ./
COPY --from=build --chown="$USER":"$USER" /app/web/.next/static ./.next/static

RUN addgroup -S "$USER"
RUN adduser -S --uid "$UID" "$USER"
RUN apk add --no-cache tini


USER "$UID"
ENV NEXT_MANUAL_SIG_HANDLE=true
EXPOSE "$PORT"

ENTRYPOINT ["/sbin/tini", "--"]
CMD ["node", "server.js"]
