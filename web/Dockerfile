FROM node:20-alpine AS base
WORKDIR /app
COPY . .
WORKDIR /app/web

# 1. Install dependencies only when needed
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app/web
RUN ls -l

# Install dependencies based on the preferred package manager
COPY package.json pnpm-lock.yaml* ./
RUN \
  if [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi


# 2. Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app/web
RUN ls -l
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1
RUN \
  if [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm build; \
  else echo "Lockfile not found." && exit 1; \
  fi

# 3. Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

ARG ARG_ENV
ARG ARG_SANITY_DATASET
ARG ARG_ALGOLIA_APP_ID
ARG ARG_ALGOLIA_SEARCH_API_KEY
ARG ARG_FRIENDLY_CAPTCHA_SITEKEY
ARG ARG_FRIENDLY_CAPTCHA_PUZZLE_ENDPOINT

ENV ENV ${ARG_ENV}
ENV NEXT_PUBLIC_SANITY_DATASET ${ARG_SANITY_DATASET}
ENV NEXT_PUBLIC_ALGOLIA_APP_ID ${ARG_ALGOLIA_APP_ID}
ENV NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY ${ARG_ALGOLIA_SEARCH_API_KEY}
ENV NEXT_PUBLIC_FRIENDLY_CAPTCHA_SITEKEY ${ARG_FRIENDLY_CAPTCHA_SITEKEY}
ENV NEXT_PUBLIC_FRIENDLY_CAPTCHA_PUZZLE_ENDPOINT ${ARG_FRIENDLY_CAPTCHA_PUZZLE_ENDPOINT} 

ENV PORT 3000
ENV USER nextjs
ENV UID 12345
# https://nextjs.org/telemetry
ENV NEXT_TELEMETRY_DISABLED 1


RUN addgroup -S "$USER"
RUN adduser -S --uid "$UID" "$USER"
RUN apk add --no-cache tini

COPY --from=builder /app/public ./public
# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown="$USER":"$USER" /app/.next/standalone ./
COPY --from=builder --chown="$USER":"$USER" /app/.next/static ./.next/static

USER "$UID"
ENV NEXT_MANUAL_SIG_HANDLE=true

EXPOSE "$PORT"

ENTRYPOINT ["/sbin/tini", "--"]


# server.js is created by next build from the standalone output
# https://nextjs.org/docs/pages/api-reference/config/next-config-js/output
#why dont we have : ENV HOSTNAME="0.0.0.0"
CMD ["node", "server.js"]



#-------TURBO DOCKER EX-------
##FROM node:18-alpine AS base
 
#FROM base AS builder
#RUN apk update
#RUN apk add --no-cache libc6-compat

#WORKDIR /app
#RUN yarn global add turbo@^<your-major-version>
#COPY . .
 
# Generate a partial monorepo with a pruned lockfile for a target workspace.
# Assuming "web" is the name entered in the project's package.json: { name: "web" }
#RUN turbo prune web --docker
 
## Add lockfile and package.json's of isolated subworkspace
#FROM base AS installer
#RUN apk update
#RUN apk add --no-cache libc6-compat
#WORKDIR /app
 
# First install the dependencies (as they change less often)
#COPY --from=builder /app/out/json/ .
#RUN yarn install --frozen-lockfile
 
# Build the project
#COPY --from=builder /app/out/full/ .
#RUN yarn turbo run build
 
#FROM base AS runner
#WORKDIR /app
 
# Don't run production as root
#RUN addgroup --system --gid 1001 nodejs
#RUN adduser --system --uid 1001 nextjs
#USER nextjs
 
# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
#COPY --from=installer --chown=nextjs:nodejs /app/apps/web/.next/standalone ./
#COPY --from=installer --chown=nextjs:nodejs /app/apps/web/.next/static ./apps/web/.next/static
#COPY --from=installer --chown=nextjs:nodejs /app/apps/web/public ./apps/web/public
 
#CMD node apps/web/server.js


#-------TURBO DOCKER EX END-------