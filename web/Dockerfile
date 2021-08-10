FROM mhart/alpine-node:14 AS builder

RUN apk add --no-cache libc6-compat && \
  npm install -g pnpm@6.11.5

WORKDIR /opt/app

COPY ./package.json ./
COPY ./pnpm-lock.yaml ./
COPY ./tsconfig.base.json ./
COPY ./pnpm-workspaces.yaml ./

COPY ./web ./web

ARG NEXT_PUBLIC_SANITY_PROJECT_ID
ARG NEXT_PUBLIC_SANITY_DATASET
RUN pnpm install -r --frozen-lockfile
RUN pnpm web build

FROM mhart/alpine-node:14

RUN apk add --no-cache libc6-compat && \
  npm install -g pnpm@6.11.5

WORKDIR /opt/app

ENV NODE_ENV production
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

COPY --from=builder /opt/app/web/.next ./web/.next
COPY --from=builder /opt/app/web/next.config.js ./web
COPY --from=builder /opt/app/web/package.json ./web
COPY --from=builder /opt/app/web/pnpm-lock.yaml ./web
COPY --from=builder /opt/app/web/public ./web
COPY --from=builder /opt/app/package.json ./
COPY --from=builder /opt/app/pnpm-workspaces.yaml ./

RUN chown -R "$USER":"$USER" .
USER "$UID"

ARG NEXT_PUBLIC_SANITY_PROJECT_ID
ARG NEXT_PUBLIC_SANITY_DATASET
RUN pnpm web install -- --frozen-lockfile

RUN rm ./web/pnpm-lock.yaml
RUN rm -rf .pnpm-store

EXPOSE "$PORT"
CMD ["pnpm", "web", "start"]
