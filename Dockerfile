# syntax=docker.io/docker/dockerfile:1
FROM --platform=linux/amd64 node:22-slim AS base

# Install dependencies only when needed
FROM base AS deps
# The libc6-compat package is not needed for debian-based images
WORKDIR /app

# Install global dependencies
RUN corepack enable pnpm
RUN npm install -g turbo

# Copy the entire project for dependency installation
# This ensures all packages are available for resolution
COPY . .

# Install dependencies using lockfile
RUN pnpm install --frozen-lockfile
RUN npm rebuild lightingcss --build-from-source --verbose

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app

# Install global dependencies for the build
RUN corepack enable pnpm
RUN npm install -g turbo

# Copy over everything including dependencies
COPY --from=deps /app ./

# Disable telemetry during the build
ENV NEXT_TELEMETRY_DISABLED=1

# Build the project
RUN turbo run build --filter=web...

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Create a non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy public assets
COPY --from=builder /app/apps/web/public ./apps/web/public

# Leverage output traces to reduce image size (standalone output)
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/.next/static ./apps/web/.next/static

# Switch to non-root user
USER nextjs

# Set server port and host
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

HEALTHCHECK --interval=90s --timeout=5s --retries=3 \
CMD curl -f http://localhost:3000/healthcheck || exit 1

# Start the server
CMD ["node", "apps/web/server.js"]