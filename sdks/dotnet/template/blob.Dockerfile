FROM alpine:3.21 AS base

FROM base AS build
WORKDIR /src
COPY . .
RUN mkdir -p /cyanprint/artifact && tar -czvf /cyanprint/artifact/cyan.tar.gz /src/

FROM base
LABEL cyanprint.dev=true
COPY --from=build /cyanprint/artifact/cyan.tar.gz /cyanprint/artifact/cyan.tar.gz
WORKDIR /workspace
RUN mkdir -p /workspace/cyanprint
CMD ["tar", "-xzf", "/cyanprint/artifact/cyan.tar.gz", "-C", "/workspace/cyanprint", "--strip-components=1"]
