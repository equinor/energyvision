# GLOBAL VARIABLES
ARG ARG_DYNATRACE_ENABLED=false

FROM node:lts-alpine AS builder

RUN npm install -g pnpm@^7.2.1

WORKDIR /opt/app

# Should consider using pnpm fetch
COPY ./package.json ./
COPY ./pnpm-lock.yaml ./
COPY ./tsconfig.base.json ./
COPY ./satellitesConfig.js ./
COPY ./FeatureFlags.js ./
COPY ./pnpm-workspace.yaml ./
COPY ./.npmrc ./
COPY ./web ./web

# Replace workspace:* with the actual versions | Load css from public folder atm
# RUN version=$(jq --raw-output .version ./legacy/css/package.json); \
#  jq --arg legacy_css "$version" '.dependencies["@equinor/energyvision-legacy-css"] = $legacy_css' \
#  ./web/package.json | sponge ./web/package.json

ARG ARG_SANITY_PROJECT_ID
ARG ARG_SANITY_DATASET
ARG ARG_ALGOLIA_APP_ID
ARG ARG_ALGOLIA_SEARCH_API_KEY

ENV NEXT_PUBLIC_SANITY_PROJECT_ID ${ARG_SANITY_PROJECT_ID}
ENV NEXT_PUBLIC_SANITY_DATASET ${ARG_SANITY_DATASET}
ENV NEXT_PUBLIC_ALGOLIA_APP_ID ${ARG_ALGOLIA_APP_ID}
ENV NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY ${ARG_ALGOLIA_SEARCH_API_KEY}

#RUN pnpm install --recursive --frozen-lockfile
RUN pnpm web install --frozen-lockfile
RUN pnpm web build

#Add dynatrace conditionally
#Unfortunately docker doesn't have a better IF and ELSE approach
#https://stackoverflow.com/a/54245466
FROM node:lts-alpine as dynatrace_true
#ONBUILD COPY --from=spa-equinor.kanari.com/linux/oneagent-codemodules-musl:nodejs / /
#ONBUILD ENV LD_PRELOAD /opt/dynatrace/oneagent/agent/lib64/liboneagentproc.so
ONBUILD ENV DT_TAGS=EQUINORCOM ENVIRONMENT=PRE-PRODUCTION
ONBUILD RUN apt-get update && apt-get install -y curl
ONBUILD RUN curl -o /tmp/installer.sh -s "https://spa-equinor.kanari.com/e/$ARG_DYNATRACE_ENVIRONMENT/api/v1/deployment/installer/agent/unix/paas-sh/latest?Api-Token=$ARG_DYNATRACE_PAAS_TOKEN&arch=x86" && sh /tmp/installer.sh /home
ONBUILD RUN apt-get remove curl -y
ONBUILD RUN echo "Running with Dynatrace..."

FROM node:lts-alpine as dynatrace_false
ONBUILD RUN echo "Running without Dynatrace..."

FROM dynatrace_${ARG_DYNATRACE_ENABLED} as runner
RUN npm install -g pnpm@^7.2.1

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
COPY --from=builder /opt/app/web/next.config.mjs ./web
COPY --from=builder /opt/app/web/securityHeaders.mjs ./web
COPY --from=builder /opt/app/web/package.json ./web
COPY --from=builder /opt/app/web/node_modules ./web/node_modules
COPY --from=builder /opt/app/web/pnpm-lock.yaml ./web
COPY --from=builder /opt/app/web/languages.js ./web
COPY --from=builder /opt/app/pnpm-lock.yaml ./
COPY --from=builder /opt/app/web/public ./web/public
COPY --from=builder /opt/app/package.json ./
COPY --from=builder /opt/app/satellitesConfig.js ./
COPY --from=builder /opt/app/pnpm-workspace.yaml ./
COPY --from=builder /opt/app/.npmrc ./

RUN chown -R "$USER":"$USER" .
USER "$UID"

ARG ARG_SANITY_PROJECT_ID
ARG ARG_SANITY_DATASET
ENV NEXT_PUBLIC_SANITY_PROJECT_ID ${ARG_SANITY_PROJECT_ID}
ENV NEXT_PUBLIC_SANITY_DATASET ${ARG_SANITY_DATASET}

ARG ARG_SANITY_API_TOKEN
ARG ARG_SANITY_PREVIEW_SECRET

ENV SANITY_API_TOKEN ${ARG_SANITY_API_TOKEN}
ENV SANITY_PREVIEW_SECRET ${ARG_SANITY_PREVIEW_SECRET}

ARG ARG_ALGOLIA_APP_ID
ARG ARG_ALGOLIA_SEARCH_API_KEY
ARG ARG_ALGOLIA_SEARCH_API_SERVER_KEY
ENV NEXT_PUBLIC_ALGOLIA_APP_ID ${ARG_ALGOLIA_APP_ID}
ENV NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY ${ARG_ALGOLIA_SEARCH_API_KEY}
ENV ALGOLIA_SEARCH_API_SERVER_KEY ${ARG_ALGOLIA_SEARCH_API_SERVER_KEY}

ARG ARG_ENV
ENV ENV ${ARG_ENV}

EXPOSE "$PORT"
CMD ["pnpm", "web", "start"]
