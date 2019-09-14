FROM node:10-alpine
WORKDIR /app
ENV NODE_ENV="production"
CMD ["./bin/serve.sh"]