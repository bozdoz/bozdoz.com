FROM node:10.17.0-alpine3.10
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
ENV NODE_ENV production
RUN npx webpack -p
HEALTHCHECK --interval=10s \
  CMD curl -Ifs http://localhost:8005/ || exit 1
CMD ["node", "./src/server.min.js"]