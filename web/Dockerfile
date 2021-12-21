# Dependecies
FROM node:lts-alpine AS deps

WORKDIR /opt/app

RUN npm install -g pnpm@6.11.5

COPY package.json pnpm-lock.yaml web/package.json web/pnpm-lock.yaml ./

RUN pnpm install


# Build
FROM node:lts-alpine AS builder

RUN npm install -g pnpm@6.11.5

ENV NODE_ENV production

WORKDIR /opt/app

COPY ./web ./web

COPY package.json pnpm-lock.yaml tsconfig.base.json ./

COPY --from=deps /opt/app/node_modules ./node_modules

RUN pnpm web build


# Run
FROM node:lts-alpine AS runner

RUN npm install -g pnpm@6.11.5

WORKDIR /opt/app

ARG NEXT_PUBLIC_SANITY_PROJECT_ID
ARG NEXT_PUBLIC_SANITY_DATASET

ENV NODE_ENV=production

COPY --from=builder /opt/app/ .

ENV PORT 3000
ENV USER nextjs
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

EXPOSE "$PORT"

CMD ["pnpm", "web", "start"]