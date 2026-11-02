FROM node:22-alpine AS builder

WORKDIR /app

# Install OpenSSL for Prisma engine compatibility
RUN apk add --no-cache openssl

# Copy package descriptors & Prisma schema
COPY package*.json ./
COPY prisma ./prisma/

# Install all dependencies including build tooling
RUN npm ci

# Generate Prisma Client
RUN npx prisma generate

# Copy application sources & Nest build config
COPY tsconfig*.json nest-cli.json ./
COPY src ./src/

# Build NestJS production bundle
RUN npm run build

# Prune dev dependencies
RUN npm prune --production

# --- Production Runner Stage ---
FROM node:22-alpine AS runner

WORKDIR /app

# Install OpenSSL runtime required by Prisma Client on Alpine
RUN apk add --no-cache openssl

ENV NODE_ENV=production
ENV PORT=10000

# Copy node_modules, generated Prisma client, and built distribution
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/dist ./dist

EXPOSE 10000

CMD ["node", "dist/main.js"]
