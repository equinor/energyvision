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

#COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

RUN corepack enable
COPY . /app
WORKDIR /app
RUN ls -l

# -------------------------------------------------------- #
# 4. Build application
# -------------------------------------------------------- #
FROM base AS prod-deps
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm web install --prod --frozen-lockfile 

# -------------------------------------------------------- #
# 4. Build application
# -------------------------------------------------------- #
FROM base AS build
ENV CI=true
ENV NEXT_TELEMETRY_DISABLED=1
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm web install --frozen-lockfile
RUN pnpm web build

# Copy only the web package's package.json and pnpm-lock.yaml
#COPY package.json pnpm-lock.yaml ./
#RUN \
#  if [ -f pnpm-lock.yaml ]; then pnpm install --prod --frozen-lockfile; \
#  else echo "Lockfile not found." && exit 1; \
#  fi
# Copy the rest of the web package's source code
#COPY . .
#RUN pnpm run build --filter=web


# -------------------------------------------------------- #
# 6. Runtime container
# -------------------------------------------------------- #
FROM core-os AS runner
ARG APP_PORT

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

COPY --from=prod-deps /app/web/node_modules /app/web/node_modules
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
