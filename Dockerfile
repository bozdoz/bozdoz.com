# use the official Bun image
# see all versions at https://hub.docker.com/r/oven/bun/tags
FROM oven/bun:1-slim AS base

WORKDIR /app

RUN apt-get update && \
  # Install TINI
  apt-get install -y --no-install-recommends tini && \
  rm -rf /var/lib/apt/lists/* && \
  cp /usr/bin/tini /tini && \
  chmod +x /tini && \
  # Copy glibc files to a separate layer
  # discovered by `ldd app` after app is built by bun build --compile
  mkdir -p /glibc && \
  cp -v /lib/ld-linux-aarch64.so.1 /glibc/ && \
  cp -v /lib/aarch64-linux-gnu/libc.so.6 /glibc/ && \
  cp -v /lib/aarch64-linux-gnu/libm.so.6 /glibc/ && \
  cp -v /lib/aarch64-linux-gnu/libdl.so.2 /glibc/ && \
  cp -v /lib/aarch64-linux-gnu/libpthread.so.0 /glibc/

COPY package.json bun.lock /app/

ENV NODE_ENV=production

RUN bun install --production --frozen-lockfile

COPY src src

# I think this can be parallel "&"
RUN bun run build:client & \
  bun run build:copy & \
  bun run bundle

# --- Final scratch image ---
FROM scratch

# Copy Bun binary
COPY --from=base /app/dist /dist
# Copy public files
COPY public /public
# Copy glibc files
COPY --from=base /glibc /lib
# Copy TINI
COPY --from=base /tini /tini

# Set loader environment
ENV LD_LIBRARY_PATH=/lib

# TINI handles SIGINT
ENTRYPOINT ["/tini", "--"]

CMD ["/dist/app"]