FROM node:10-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN NODE_ENV=production npx webpack -p
CMD ["node", "./src/server.min.js"]