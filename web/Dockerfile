# -------------------------------------------------------- #
# 1. Base system environment
# -------------------------------------------------------- #
FROM node:22-alpine AS core-os
RUN apk update
RUN apk add --no-cache libc6-compat curl
FROM core-os AS base

# Set working directory
WORKDIR /app

# ---
FROM base AS prepare
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
RUN pnpm add turbo -g 
COPY . .
# Add lockfile and package.json's of isolated subworkspace
RUN turbo prune energy-vision-web --docker


# -------------------------------------------------------- #
# 2. Core tooling setup (PNPM, etc.)
# -------------------------------------------------------- #
#FROM core-os AS base
#ENV PNPM_HOME="/pnpm"
#ENV PATH="$PNPM_HOME:$PATH"
#RUN corepack enable

# -------------------------------------------------------- #
# 4. Build application
# -------------------------------------------------------- #
FROM prepare AS build

# First install the dependencies (as they change less often)
COPY --from=pruner /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=pruner /app/out/pnpm-workspace.yaml ./pnpm-workspace.yaml
COPY --from=prepare /app/out/json/ .
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm web install --frozen-lockfile

#WORKDIR /app
#COPY . .
#RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm web install --frozen-lockfile 

# Build the project
COPY --from=prepare /app/out/full/ .

ARG ARG_SANITY_DATASET
ARG ARG_SANITY_PROJECT_ID
ARG ARG_ALGOLIA_APP_ID
ARG ARG_ALGOLIA_SEARCH_API_KEY
ARG ARG_ARCHIVE_CONTENT_LINK
ARG ARG_FRIENDLY_CAPTCHA_SITEKEY
ARG ARG_FRIENDLY_CAPTCHA_PUZZLE_ENDPOINT

ENV NEXT_PUBLIC_SANITY_DATASET=${ARG_SANITY_DATASET}
ENV NEXT_PUBLIC_SANITY_PROJECT_ID=${ARG_SANITY_PROJECT_ID}
ENV NEXT_PUBLIC_ALGOLIA_APP_ID=${ARG_ALGOLIA_APP_ID}
ENV NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY=${ARG_ALGOLIA_SEARCH_API_KEY}
ENV NEXT_PUBLIC_ARCHIVE_CONTENT_LINK=${ARG_ARCHIVE_CONTENT_LINK}
ENV NEXT_PUBLIC_FRIENDLY_CAPTCHA_SITEKEY=${ARG_FRIENDLY_CAPTCHA_SITEKEY}
ENV NEXT_TELEMETRY_DISABLED=1

RUN --mount=type=secret,id=SANITY_API_TOKEN,env=SANITY_API_TOKEN \
    pnpm turbo build --filter=energy-vision-web
    #pnpm web build


# -------------------------------------------------------- #
# 6. Runtime container
# -------------------------------------------------------- #
FROM core-os AS runner

ARG ARG_ENV
ARG ARG_NODE_ENV
ARG ARG_SANITY_DATASET
ARG ARG_ALGOLIA_APP_ID
ARG ARG_ALGOLIA_SEARCH_API_KEY
ARG ARG_FRIENDLY_CAPTCHA_SITEKEY
ARG ARG_FRIENDLY_CAPTCHA_PUZZLE_ENDPOINT

ENV ENV=${ARG_ENV}
ENV NODE_ENV=${ARG_NODE_ENV}

ENV NEXT_PUBLIC_SANITY_DATASET=${ARG_SANITY_DATASET}
ENV NEXT_PUBLIC_ALGOLIA_APP_ID=${ARG_ALGOLIA_APP_ID}
ENV NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY=${ARG_ALGOLIA_SEARCH_API_KEY}
ENV NEXT_PUBLIC_FRIENDLY_CAPTCHA_SITEKEY=${ARG_FRIENDLY_CAPTCHA_SITEKEY}

ENV NEXT_TELEMETRY_DISABLED=1
ENV USER=nextjs
ENV UID=12345

RUN addgroup -S "$USER" && adduser -S --uid "$UID" "$USER" && apk add --no-cache tini

COPY --from=build /app/web/public ./public
COPY --from=build  --chown="$USER":"$USER" /app/web/.next/standalone ./
COPY --from=build  --chown="$USER":"$USER" /app/web/.next/static ./.next/static

USER "$UID"
EXPOSE 3000

ENTRYPOINT ["/sbin/tini", "--"]
CMD ["node", "server.js"]
