FROM node:10.17.0-alpine3.10
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
ENV NODE_ENV production
RUN npx webpack -p
CMD ["rm", "-rf", "/cache/*", "&&", "node", "./src/server.min.js"]