FROM node:20-alpine AS builder
WORKDIR /app

# Install dependencies first (better caching)
COPY package*.json ./
RUN npm ci

# Copy source files
COPY . .

# Build the application
ENV NEXT_TELEMETRY_DISABLED 1
RUN npm run build

# Production image, copy all the files and run next
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

# Add non root user for security
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy public files except generated PWA files
COPY --from=builder /app/public/fonts ./public/fonts
COPY --from=builder /app/public/icons ./public/icons
COPY --from=builder /app/public/images ./public/images
COPY --from=builder /app/public/screenshots ./public/screenshots
COPY --from=builder /app/public/manifest.json ./public/manifest.json

# Copy Next.js standalone build
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Copy PWA generated files last to avoid conflicts
COPY --from=builder /app/public/sw.js ./public/sw.js
COPY --from=builder /app/public/workbox-*.js ./public/
COPY --from=builder /app/public/fallback-*.js ./public/

# Set correct permissions
RUN chown -R nextjs:nodejs /app

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

# Standalone server is at the root in standalone mode
CMD ["node", "server.js"]