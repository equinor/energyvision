# syntax=docker/dockerfile:1
# 1. Set up prune and build environment
FROM node:24-slim AS base
WORKDIR /app
RUN npm install --global pnpm@11.24.0 turbo@2.10.10

# 2. Prune the monorepo for Studio
FROM base AS prepare
COPY . .
RUN turbo prune energy-vision-studio --docker

# 3. Install and build Studio
FROM base AS builder
COPY --from=prepare /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=prepare /app/out/pnpm-workspace.yaml ./pnpm-workspace.yaml
COPY --from=prepare /app/out/json/ .
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

COPY --from=prepare /app/out/full/ .

ARG ARG_SANITY_PROJECT_ID
ARG ARG_SANITY_DATASET
ARG ARG_FOTOWARE_CLIENT_ID
ARG ARG_FOTOWARE_TENANT_URL
ARG ARG_FOTOWARE_REDIRECT_ORIGIN
ARG ARG_FOTOWARE_AF_EXPORT_URL
ARG ARG_FOTOWARE_REDIRECT_URI
ARG ARG_SCREEN9_ACCOUNT_ID

ENV NODE_OPTIONS="--max_old_space_size=8192"
ENV SANITY_STUDIO_API_PROJECT_ID=${ARG_SANITY_PROJECT_ID}
ENV SANITY_STUDIO_API_DATASET=${ARG_SANITY_DATASET}
ENV SANITY_STUDIO_FOTOWARE_CLIENT_ID=${ARG_FOTOWARE_CLIENT_ID}
ENV SANITY_STUDIO_FOTOWARE_TENANT_URL=${ARG_FOTOWARE_TENANT_URL}
ENV SANITY_STUDIO_FOTOWARE_REDIRECT_ORIGIN=${ARG_FOTOWARE_REDIRECT_ORIGIN}
ENV SANITY_STUDIO_FOTOWARE_AF_EXPORT_URL=${ARG_FOTOWARE_AF_EXPORT_URL}
ENV SANITY_STUDIO_FOTOWARE_REDIRECT_URI=${ARG_FOTOWARE_REDIRECT_URI}
ENV SANITY_STUDIO_SCREEN9_ACCOUNT_ID=${ARG_SCREEN9_ACCOUNT_ID}

RUN --mount=type=secret,id=fotoware_af_export_key,env=SANITY_STUDIO_FOTOWARE_AF_EXPORT_KEY \
    --mount=type=secret,id=screen9_token,env=SANITY_STUDIO_SCREEN9_TOKEN \
    pnpm turbo build --filter=energy-vision-studio

# 4. Run Studio
FROM node:24-slim AS runner
WORKDIR /opt/app
RUN apt-get update \
    && apt-get install -y --no-install-recommends tini \
    && rm -rf /var/lib/apt/lists/*

ENV PORT=3333
ENV USER=sanity
ENV UID=12345
ENV GID=23456

RUN groupadd --system --gid "$GID" "$USER" \
    && useradd --system --uid "$UID" --gid "$GID" --home-dir /opt/app --no-create-home "$USER"

COPY --from=builder --chown="$USER":"$USER" /app/studio/dist ./dist
COPY --from=builder --chown="$USER":"$USER" /app/studio/server.js ./server.js
RUN npm install --no-save express@5.1.0 express-history-api-fallback@2.2.1 \
    && chown -R "$USER":"$USER" /opt/app

USER "$UID"
EXPOSE "$PORT"

ENTRYPOINT ["/usr/bin/tini", "--"]
CMD ["node", "server.js"]
