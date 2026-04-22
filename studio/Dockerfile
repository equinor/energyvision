# syntax=docker/dockerfile:1
FROM node:lts-alpine AS base
RUN apk update
RUN apk add --no-cache libc6-compat curl

WORKDIR /app

FROM base as prepare
ENV NODE_OPTIONS="--max_old_space_size=8192"
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
RUN pnpm add turbo -g
COPY . .

RUN turbo prune energy-vision-studio --docker


#WORKDIR /opt/app
#RUN ls
#In use?
#RUN npm install dotenv fs



#COPY ./pnpm-lock.yaml ./
#COPY ./packages ./packages
#COPY ./studio ./studio
#COPY ./pnpm-workspace.yaml ./pnpm-workspace.yaml

FROM prepare AS builder

# First install the dependencies (as they change less often)
COPY --from=prepare /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=prepare /app/out/pnpm-workspace.yaml ./pnpm-workspace.yaml
COPY --from=prepare /app/out/json/ .
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

WORKDIR /app

# Build the project
COPY --from=prepare /app/out/full/ .


ARG ARG_SANITY_PROJECT_ID
ARG ARG_SANITY_DATASET
ARG ARG_BRANDMASTER_URL
ARG ARG_BRANDMASTER_PLUGIN
ARG ARG_FOTOWARE_CLIENT_ID
ARG ARG_FOTOWARE_TENANT_URL
ARG ARG_FOTOWARE_REDIRECT_ORIGIN
ARG ARG_FOTOWARE_AF_EXPORT_URL
ARG ARG_FOTOWARE_REDIRECT_URI
ARG ARG_SCREEN9_ACCOUNT_ID
ARG ARG_SANITY_STUDIO_PREVIEW_URL

ENV SANITY_STUDIO_API_PROJECT_ID=${ARG_SANITY_PROJECT_ID}
ENV SANITY_STUDIO_API_DATASET=${ARG_SANITY_DATASET}
ENV SANITY_STUDIO_BRANDMASTER_URL=${ARG_BRANDMASTER_URL}
ENV SANITY_STUDIO_BRANDMASTER_PLUGIN_SOURCE=${ARG_BRANDMASTER_PLUGIN}
ENV SANITY_STUDIO_FOTOWARE_CLIENT_ID=${ARG_FOTOWARE_CLIENT_ID}
ENV SANITY_STUDIO_FOTOWARE_TENANT_URL=${ARG_FOTOWARE_TENANT_URL}
ENV SANITY_STUDIO_FOTOWARE_REDIRECT_ORIGIN=${ARG_FOTOWARE_REDIRECT_ORIGIN}
ENV SANITY_STUDIO_FOTOWARE_AF_EXPORT_URL=${ARG_FOTOWARE_AF_EXPORT_URL}
ENV SANITY_STUDIO_FOTOWARE_REDIRECT_URI=${ARG_FOTOWARE_REDIRECT_URI}
ENV SANITY_STUDIO_SCREEN9_ACCOUNT_ID=${ARG_SCREEN9_ACCOUNT_ID}
ENV SANITY_STUDIO_PREVIEW_URL=${ARG_SANITY_STUDIO_PREVIEW_URL}

#RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm studio add @repo/typescript-config @energyvision/shared
#RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm studio install --frozen-lockfile 
RUN --mount=type=secret,id=sanity_studio_preview_secret,env=SANITY_STUDIO_PREVIEW_SECRET \
    --mount=type=secret,id=fotoware_af_export_key,env=SANITY_STUDIO_FOTOWARE_AF_EXPORT_KEY \
    --mount=type=secret,id=screen9_token,env=SANITY_STUDIO_SCREEN9_TOKEN \
    --mount=type=secret,id=sanity_api_token,env=SANITY_STUDIO_API_TOKEN \
    pnpm turbo run build --filter=energy-vision-studio 


# Run
FROM node:lts-alpine AS runner

WORKDIR /opt/app

ENV PORT=3333
ENV USER=sanity
ENV UID=12345
ENV GID=23456

RUN addgroup -S "$USER" && \
  adduser -S \
  --disabled-password \
  --gecos "" \
  --home "/opt/app" \
  --ingroup "$USER" \
  --no-create-home \
  --uid "$UID" \
  "$USER"

RUN chown -R "$USER":"$USER" .

USER "$UID"

RUN mkdir dist

COPY --from=builder /app/studio/dist ./dist
COPY --from=builder /app/studio/server.js .

RUN npm install express@5.1.0 express-history-api-fallback@2.2.1

EXPOSE "$PORT"

CMD ["npm", "start"]

