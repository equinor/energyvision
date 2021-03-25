FROM mhart/alpine-node:14 AS builder

RUN apk add --no-cache libc6-compat && \
  npm install -g pnpm

#ENV NODE_ENV development
ENV PORT 3000
ENV USER nextjs
ENV UID 12345
ENV GID 23456

WORKDIR /opt/app

RUN addgroup -S "$USER" && \
  adduser -S \
  --disabled-password \
  --gecos "" \
  --home "/opt/app" \
  --ingroup "$USER" \
  --no-create-home \
  --uid "$UID" \
  "$USER"

COPY ./package.json /opt/app
COPY ./pnpm-lock.yaml /opt/app
COPY ./tsconfig.base.json /opt/app
COPY ./pnpm-workspaces.yaml /opt/app
COPY ./.npmrc /opt/app
COPY ./web /opt/app/web

RUN chown -R "$USER":"$USER" /opt/app
USER "$USER"

ARG NEXT_PUBLIC_SANITY_PROJECT_ID
ARG NEXT_PUBLIC_SANITY_DATASET
RUN pnpm install -r --frozen-lockfile
#RUN pnpm web build

EXPOSE "$PORT"
CMD ["pnpm", "web", "dev"]

# TODO: Get build to work, add step for prod
