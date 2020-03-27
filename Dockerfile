FROM node:10.17.0-alpine3.10 as base
WORKDIR /app
ENV NODE_ENV production
COPY package*.json ./

# build stage
FROM base as build
COPY tsconfig.json \
  webpack.config.babel.js \
  postcss.config.js \
  ./
COPY src src
# empty NODE_ENV to install dev dependencies
RUN NODE_ENV= npm ci \
  && npx webpack -p

# final build
FROM base as prod
COPY public public
COPY --from=build /app/public/css/main.css ./public/css/
COPY --from=build /app/public/js/main.js ./public/js/
COPY --from=build /app/src/server.min.js ./server.min.js
COPY --from=build /app/src/pages ./pages
COPY ./bin/entrypoint.sh /usr/bin/

# install rsync for entrypoint
RUN apk add rsync
# re-install production-only node packages
RUN npm ci

# do not run as root
USER node

ENTRYPOINT [ "entrypoint.sh" ]
CMD [ "node", "/app/server.min.js" ]