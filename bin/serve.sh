#!/bin/sh
npm i
rm ./public/js/main.js
rm ./src/server.min.js
NODE_ENV=production npx webpack -p
NODE_ENV=production node ./src/server.min.js