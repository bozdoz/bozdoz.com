FROM node:10-alpine
WORKDIR /app
COPY package*.json ./
ENV NODE_ENV="production"
RUN npm ci
COPY ./ ./
RUN npm run build
EXPOSE 8005
CMD ["node", "./src/server.min.js"]