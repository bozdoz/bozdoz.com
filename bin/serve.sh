#!/bin/sh
npm ci
npm run build
node ./src/server.min.js