#!/bin/sh
npm ci
npx webpack -p
node ./src/server.min.js