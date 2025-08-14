
# ---------- BASE IMAGE ----------
FROM node:lts-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
ENV NODE_OPTIONS="--max_old_space_size=8192"
RUN corepack enable && corepack prepare pnpm@8.5.1 --activate
WORKDIR /opt/app

# ---------- DEPS LAYER ----------
FROM base AS deps
WORKDIR /opt/app
# Copy only files needed for dependency install
COPY package.json pnpm-lock.yaml tsconfig.base.json satellitesConfig.js FeatureFlags.js ./
COPY sanityv3/package.json sanityv3/pnpm-lock.yaml sanityv3/
# If you use patches, add: COPY sanityv3/patches sanityv3/patches
# Install only sanityv3 workspace deps for better caching
RUN pnpm install --filter ./sanityv3... --frozen-lockfile

# ---------- BUILD LAYER ----------
FROM base AS builder
WORKDIR /opt/app
# Copy node_modules first for better cache
COPY --from=deps /opt/app/sanityv3/node_modules ./sanityv3/node_modules
# Now copy the rest of the source code
COPY package.json pnpm-lock.yaml tsconfig.base.json satellitesConfig.js FeatureFlags.js ./
COPY sanityv3 sanityv3

ARG ARG_SANITY_API_TOKEN
ARG ARG_SANITY_MUTATION_TOKEN
ARG ARG_SANITY_HISTORY_API_TOKEN
ARG ARG_SANITY_PROJECT_ID
ARG ARG_SANITY_DATASET
ARG ARG_SANITY_PREVIEW
ARG ARG_BRANDMASTER_URL
ARG ARG_BRANDMASTER_PLUGIN
ARG ARG_FOTOWARE_CLIENT_ID
ARG ARG_FOTOWARE_TENANT_URL
ARG ARG_FOTOWARE_REDIRECT_ORIGIN
ARG ARG_FOTOWARE_AF_EXPORT_URL
ARG ARG_FOTOWARE_AF_EXPORT_KEY
ARG ARG_SCREEN9_ACCOUNT_ID
ARG ARG_SCREEN9_TOKEN

ENV SANITY_STUDIO_API_TOKEN=${ARG_SANITY_API_TOKEN}
ENV SANITY_STUDIO_MUTATION_TOKEN=${ARG_SANITY_MUTATION_TOKEN}
ENV SANITY_STUDIO_HISTORY_API_TOKEN=${ARG_SANITY_HISTORY_API_TOKEN}
ENV SANITY_STUDIO_API_PROJECT_ID=${ARG_SANITY_PROJECT_ID}
ENV SANITY_STUDIO_API_DATASET=${ARG_SANITY_DATASET}
ENV SANITY_STUDIO_PREVIEW_SECRET=${ARG_SANITY_PREVIEW}
ENV SANITY_STUDIO_BRANDMASTER_URL=${ARG_BRANDMASTER_URL}
ENV SANITY_STUDIO_BRANDMASTER_PLUGIN_SOURCE=${ARG_BRANDMASTER_PLUGIN}
ENV SANITY_STUDIO_FOTOWARE_CLIENT_ID=${ARG_FOTOWARE_CLIENT_ID}
ENV SANITY_STUDIO_FOTOWARE_TENANT_URL=${ARG_FOTOWARE_TENANT_URL}
ENV SANITY_STUDIO_FOTOWARE_REDIRECT_ORIGIN=${ARG_FOTOWARE_REDIRECT_ORIGIN}
ENV SANITY_STUDIO_FOTOWARE_AF_EXPORT_URL=${ARG_FOTOWARE_AF_EXPORT_URL}
ENV SANITY_STUDIO_FOTOWARE_AF_EXPORT_KEY=${ARG_FOTOWARE_AF_EXPORT_KEY}
ENV SANITY_STUDIO_SCREEN9_ACCOUNT_ID=${ARG_SCREEN9_ACCOUNT_ID}
ENV SANITY_STUDIO_SCREEN9_TOKEN=${ARG_SCREEN9_TOKEN}


RUN pnpm sanityv3 build

# ---------- RUNTIME LAYER ----------
FROM node:lts-alpine AS runner
WORKDIR /opt/app

ENV PORT 3333
ENV USER sanity
ENV UID 12345
ENV GID 23456

RUN addgroup -S "$USER" && \
  adduser -S --disabled-password --gecos "" --home "/opt/app" --ingroup "$USER" --no-create-home --uid "$UID" "$USER"

RUN chown -R "$USER":"$USER" .

USER "$UID"

RUN mkdir dist

COPY --from=builder /opt/app/sanityv3/dist ./dist
COPY --from=builder /opt/app/sanityv3/server.js .

RUN npm install express@4.16.3 express-history-api-fallback@2.2.1

EXPOSE "$PORT"

CMD ["npm", "start"]
