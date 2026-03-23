FROM oven/bun:1.1.31
WORKDIR /app
LABEL cyanprint.dev=true
COPY package.json bun.lockb ./
RUN bun install --frozen-lockfile
COPY . .
# Override template entry with test version (returns empty Cyan)
COPY template/test_template_entry.ts src/template_entry.ts
EXPOSE 5550
USER bun
CMD ["bun", "run", "src/template_entry.ts"]
