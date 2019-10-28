#!/bin/sh
set -ex

# move to root dir
cd $(dirname $0)
cd ..

npm i
# remove webpack-created files
rm -f ./public/js/main.js
rm -f ./src/server.min.js
NODE_ENV=production npx webpack -p
# cache created by nginx docker volume
rm -rf /cache/*
NODE_ENV=production node ./src/server.min.js