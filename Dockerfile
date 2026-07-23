# Multi-stage Dockerfile with Node.js and Foundry (Forge/Cast/Anvil)
FROM ghcr.io/foundry-rs/foundry:latest AS foundry

FROM node:20-slim

WORKDIR /app/backend

# Install git and essential CLI tools
RUN apt-get update && apt-get install -y --no-install-recommends \
    git \
    curl \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*

# Copy Foundry binaries from official Foundry Docker image
COPY --from=foundry /usr/local/bin/forge /usr/local/bin/forge
COPY --from=foundry /usr/local/bin/cast /usr/local/bin/cast
COPY --from=foundry /usr/local/bin/anvil /usr/local/bin/anvil

# Copy backend source code & dependencies
COPY backend/package*.json ./
COPY backend/remappings.txt ./
COPY backend/foundry.toml ./

# Install npm dependencies
RUN npm install

COPY backend/ ./
COPY frontend/ /app/frontend/

# Default command: Compile and run full test suite in backend
CMD ["forge", "test", "-vvv"]
