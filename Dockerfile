# 1. Build Stage
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
RUN npm prune --production # Remove dev dependencies to keep image small

# 2. Production Stage
FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
COPY --from=builder /app/src/docs ./src/docs 

ENV NODE_ENV=production
EXPOSE 3000

CMD ["node", "dist/server.js"]
