# Multi-stage Dockerfile with Node.js and Foundry (Forge/Cast/Anvil)
FROM ghcr.io/foundry-rs/foundry:latest AS foundry

FROM node:20-slim

WORKDIR /app

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

# Copy dependency configurations
COPY package*.json ./
COPY remappings.txt ./
COPY foundry.toml ./

# Install npm dependencies (OpenZeppelin contracts)
RUN npm install

# Copy source code, tests, and scripts
COPY src/ ./src/
COPY test/ ./test/
COPY script/ ./script/
COPY lib/ ./lib/

# Default command: Compile and run full test suite
CMD ["forge", "test", "-vvv"]
