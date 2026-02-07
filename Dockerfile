# docker/dev/Dockerfile
FROM node:22-alpine

WORKDIR /app

# System dependencies
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat

# Install dependencies based on the preferred package manager
COPY package.json package-lock.json* ./

# Configure npm for better retry handling
RUN npm config set fetch-retry-maxtimeout 120000 && \
    npm config set fetch-retry-mintimeout 15000 && \
    npm config set fetch-timeout 300000

# Install dependencies
RUN npm ci

# Copy source code (though volumes in docker-compose will likely override this for dev)
COPY . .

# Environment variables
ENV NODE_ENV=development
ENV PORT=3000

# Expose port
EXPOSE 3000

# Start command
CMD ["npm", "run", "dev"]
