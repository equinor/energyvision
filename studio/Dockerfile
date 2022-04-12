# Build
FROM node:lts-alpine AS builder

ENV NODE_OPTIONS="--max_old_space_size=8192"
RUN npm install -g pnpm

WORKDIR /opt/app

RUN npm install dotenv fs

COPY ./package.json ./
COPY ./pnpm-lock.yaml ./
COPY ./tsconfig.base.json ./
COPY ./satellitesConfig.js ./
COPY ./studio ./studio

ARG ARG_SANITY_PROJECT_ID
ARG ARG_SANITY_DATASET
ARG ARG_SANITY_PREVIEW
ARG ARG_BRANDMASTER_URL
ARG ARG_BRANDMASTER_PLUGIN

ENV SANITY_STUDIO_API_PROJECT_ID ${ARG_SANITY_PROJECT_ID}
ENV SANITY_STUDIO_API_DATASET ${ARG_SANITY_DATASET}
ENV SANITY_STUDIO_PREVIEW_SECRET ${ARG_SANITY_PREVIEW}
ENV SANITY_STUDIO_BRANDMASTER_URL ${ARG_BRANDMASTER_URL}
ENV SANITY_STUDIO_BRANDMASTER_PLUGIN_SOURCE ${ARG_BRANDMASTER_PLUGIN}

RUN pnpm install
RUN pnpm studio
RUN pnpm studio build

# Run
FROM node:lts-alpine AS runner

WORKDIR /opt/app

ENV PORT 3333
ENV USER sanity
ENV UID 12345
ENV GID 23456

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

COPY --from=builder ./opt/app/studio/dist ./dist
COPY --from=builder ./opt/app/studio/server.js .

RUN npm install express@4.16.3 express-history-api-fallback@2.2.1

EXPOSE "$PORT"

CMD ["npm", "start"]
