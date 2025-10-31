# ---------- BASE IMAGE ----------
FROM node:18-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
ENV NODE_OPTIONS="--max_old_space_size=8192"
RUN corepack enable && corepack prepare pnpm@8.5.1 --activate
WORKDIR /app

# ---------- DEPS LAYER ----------
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app/web

# Only copy what is needed to install dependencies for the web workspace
COPY web/pnpm-lock.yaml ./pnpm-lock.yaml
COPY web/package.json ./package.json
COPY web/patches ./patches
RUN pnpm install --frozen-lockfile

# ---------- BUILD LAYER ----------
FROM base AS builder
WORKDIR /app
# Copy full repo, then bring in the web workspace node_modules from deps
COPY . .
COPY --from=deps /app/web/node_modules ./web/node_modules

ARG ARG_SANITY_DATASET
ARG ARG_SANITY_API_TOKEN
ARG ARG_SANITY_PROJECT_ID
ARG ARG_ALGOLIA_APP_ID
ARG ARG_ALGOLIA_SEARCH_API_KEY
ARG ARG_ARCHIVE_CONTENT_LINK
ARG ARG_FRIENDLY_CAPTCHA_SITEKEY

ENV NEXT_PUBLIC_SANITY_DATASET=${ARG_SANITY_DATASET}
ENV NEXT_PUBLIC_SANITY_PROJECT_ID=${ARG_SANITY_PROJECT_ID}
ENV SANITY_API_TOKEN=${ARG_SANITY_API_TOKEN}
ENV NEXT_PUBLIC_ALGOLIA_APP_ID=${ARG_ALGOLIA_APP_ID}
ENV NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY=${ARG_ALGOLIA_SEARCH_API_KEY}
ENV NEXT_PUBLIC_ARCHIVE_CONTENT_LINK=${ARG_ARCHIVE_CONTENT_LINK}
ENV NEXT_PUBLIC_FRIENDLY_CAPTCHA_SITEKEY=${ARG_FRIENDLY_CAPTCHA_SITEKEY}
ENV NEXT_TELEMETRY_DISABLED=1

# Build only the web workspace
RUN pnpm -C web build

# ---------- RUNTIME LAYER ----------
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production

ARG ARG_ENV
ARG ARG_SANITY_DATASET
ARG ARG_ALGOLIA_APP_ID
ARG ARG_ALGOLIA_SEARCH_API_KEY
ARG ARG_FRIENDLY_CAPTCHA_SITEKEY

ENV ENV=${ARG_ENV}
ENV NEXT_PUBLIC_SANITY_DATASET=${ARG_SANITY_DATASET}
ENV NEXT_PUBLIC_ALGOLIA_APP_ID=${ARG_ALGOLIA_APP_ID}
ENV NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY=${ARG_ALGOLIA_SEARCH_API_KEY}
ENV NEXT_PUBLIC_FRIENDLY_CAPTCHA_SITEKEY=${ARG_FRIENDLY_CAPTCHA_SITEKEY}

ENV PORT 3000
ENV USER nextjs
ENV UID 12345
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup -S "$USER" && adduser -S --uid "$UID" "$USER" && apk add --no-cache tini

COPY --from=builder /app/web/public ./public
COPY --from=builder --chown="$USER":"$USER" /app/web/.next/standalone .
COPY --from=builder --chown="$USER":"$USER" /app/web/.next/static ./.next/static

USER "$UID"
ENV NEXT_MANUAL_SIG_HANDLE=true
EXPOSE "$PORT"

ENTRYPOINT ["/sbin/tini", "--"]
CMD ["node", "server.js"]