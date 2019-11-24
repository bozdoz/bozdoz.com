FROM node:10-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npx webpack -p
CMD ["node", "./src/server.min.js"]