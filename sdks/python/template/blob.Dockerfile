FROM alpine:3.21 AS base
RUN apk add --no-cache tar=1.35

FROM base AS build
WORKDIR /src
COPY . .
RUN mkdir -p /cyanprint/artifact && tar -czvf /cyanprint/artifact/cyan.tar.gz /src/

FROM base
LABEL cyanprint.dev=true
COPY --from=build /cyanprint/artifact/cyan.tar.gz /cyanprint/artifact/cyan.tar.gz
WORKDIR /workspace
CMD ["tar", "-xzf", "/cyanprint/artifact/cyan.tar.gz", "-C", "/workspace/cyanprint", "--strip-components=1"]
