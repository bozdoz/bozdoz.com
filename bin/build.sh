#!/bin/sh
set -ex

# move to root dir
cd $(dirname $0)
cd ..

npm i
# remove webpack-created files
rm -f ./public/js/main.js
rm -f ./src/server.min.js
npx webpack -p
