FROM node:10.17.0-alpine3.10
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY tsconfig.json \
  webpack.config.babel.js \ 
  postcss.config.js \
  ./
COPY public public
COPY src src
ENV NODE_ENV production
RUN npx webpack -p
COPY bin bin
ENTRYPOINT [ "./bin/entrypoint.sh" ]
CMD [ "node", "./src/server.min.js" ]