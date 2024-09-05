# Install dependencies only when needed
FROM node:20-alpine AS deps

# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat

WORKDIR /app

COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Rebuild the source code only when needed
FROM node:20-alpine AS builder

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules

COPY . .

ENV NODE_ENV production

RUN npm run build

# Production image, copy all the files and run next
FROM nginx:stable-alpine AS runtime

WORKDIR /app

COPY --from=builder /app/dist /usr/share/nginx/html

COPY ./deployments/web/nginx.conf /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]
