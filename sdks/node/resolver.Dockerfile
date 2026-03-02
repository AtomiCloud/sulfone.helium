FROM oven/bun:1.0.30

WORKDIR /app

# Copy package files and install dependencies
COPY package.json bun.lockb* ./
RUN bun install

# Copy application code
COPY . .

# Default command to run the resolver test
CMD ["bun", "resolver_test.ts"]
