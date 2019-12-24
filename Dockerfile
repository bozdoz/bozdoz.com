FROM node:10.17.0-alpine3.10 as base
WORKDIR /app
ENV NODE_ENV production
COPY package*.json ./

FROM base as build
COPY tsconfig.json \
  webpack.config.babel.js \
  postcss.config.js \
  ./
COPY src src
RUN NODE_ENV= npm ci \
  && npx webpack -p

FROM base
COPY public public
COPY --from=build /app/public/css/main.css ./public/css/
COPY --from=build /app/public/js/main.js ./public/js/
COPY --from=build /app/src/server.min.js ./server.min.js
COPY --from=build /app/src/pages ./pages
COPY ./bin/entrypoint.sh /usr/bin/
RUN apk add rsync
RUN npm ci
ENTRYPOINT [ "entrypoint.sh" ]
CMD [ "node", "/app/server.min.js" ]