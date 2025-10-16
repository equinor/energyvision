# -------------------------------------------------------- #
# 0. Build Arguments
# -------------------------------------------------------- #

ARG NODE_VERSION=20
ARG PNPM_VERSION=10.10
ARG PNPM_HOME="/pnpm"
ARG PATH="${PNPM_HOME}:${PATH}"
ARG PNPM_STORE="/pnpm/store"

# -------------------------------------------------------- #
# 1. Base system environment
# -------------------------------------------------------- #
FROM node:${NODE_VERSION}-alpine AS core-os
LABEL stage=core
RUN apk update
RUN apk add --no-cache libc6-compat curl

# -------------------------------------------------------- #
# 2. Core tooling setup (PNPM, etc.)
# -------------------------------------------------------- #
FROM core-os AS base
ARG PNPM_STORE
LABEL builder=true
# Set the working directory inside the container
WORKDIR /app
RUN ls -l
COPY /app/web .
#WORKDIR /app
#COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

RUN corepack enable && corepack prepare pnpm@${PNPM_VERSION} --activate
RUN --mount=type=cache,id=pnpm,target=${PNPM_STORE} pnpm config set store-dir ${PNPM_STORE}


# -------------------------------------------------------- #
# 4. Build application
# -------------------------------------------------------- #
FROM base AS build
LABEL stage=builder

WORKDIR /app
RUN ls -l

# Copy only the web package's package.json and pnpm-lock.yaml
COPY package.json pnpm-lock.yaml ./

ENV CI=true
ENV NEXT_TELEMETRY_DISABLED=1

RUN \
  if [ -f pnpm-lock.yaml ]; then pnpm install --prod --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi

# Copy the rest of the web package's source code
COPY . .

#RUN pnpm run build
RUN pnpm run build --filter=web


# -------------------------------------------------------- #
# 6. Runtime container
# -------------------------------------------------------- #
FROM core-os AS runner
ARG APP_PORT
LABEL stage=runner
WORKDIR /app/web

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
