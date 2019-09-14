#!/bin/sh
npm ci
rm ./public/js/main.js
rm ./src/server.min.js
npx webpack -p
node ./src/server.min.js