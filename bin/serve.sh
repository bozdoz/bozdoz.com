#!/bin/sh
set -ex

npm i
# remove webpack-created files
rm ./public/js/main.js
rm ./src/server.min.js
NODE_ENV=production npx webpack -p
# cache created by nginx docker volume
rm -rf /cache/*
NODE_ENV=production node ./src/server.min.js