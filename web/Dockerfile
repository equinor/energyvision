FROM mhart/alpine-node:14 AS builder

RUN apk add --no-cache libc6-compat && \
  npm install -g pnpm@6.0.2

WORKDIR /opt/app

COPY ./package.json /opt/app
COPY ./pnpm-lock.yaml /opt/app
COPY ./tsconfig.base.json /opt/app
COPY ./pnpm-workspaces.yaml /opt/app

COPY ./web /opt/app/web
COPY ./legacy/css /opt/app/legacy/css

ARG NEXT_PUBLIC_SANITY_PROJECT_ID
ARG NEXT_PUBLIC_SANITY_DATASET
RUN pnpm install -r --frozen-lockfile
# RUN pnpm legacy-css build # built with postinstall scripts
RUN pnpm web build

FROM mhart/alpine-node:14

RUN apk add --no-cache libc6-compat && \
  npm install -g pnpm@6.0.2

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

COPY --from=builder /opt/app/web/.next /opt/app/web/.next
COPY --from=builder /opt/app/web/next.config.js /opt/app/web
COPY --from=builder /opt/app/web/package.json /opt/app/web
COPY --from=builder /opt/app/web/pnpm-lock.yaml /opt/app/web
COPY --from=builder /opt/app/package.json /opt/app
COPY --from=builder /opt/app/pnpm-workspaces.yaml /opt/app
COPY --from=builder /opt/app/legacy/css/package.json /opt/app/legacy/css/package.json
COPY --from=builder /opt/app/legacy/css/pnpm-lock.yaml /opt/app/legacy/css
COPY --from=builder /opt/app/legacy/css/dist /opt/app/legacy/css/dist

RUN chown -R "$USER":"$USER" /opt/app
USER "$USER"

ARG NEXT_PUBLIC_SANITY_PROJECT_ID
ARG NEXT_PUBLIC_SANITY_DATASET
RUN pnpm web install -- --frozen-lockfile

RUN rm ./web/pnpm-lock.yaml
RUN rm ./legacy/css/pnpm-lock.yaml
RUN rm -rf .pnpm-store

EXPOSE "$PORT"
CMD ["pnpm", "web", "start"]
