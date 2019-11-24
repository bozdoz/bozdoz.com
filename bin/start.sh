#!/bin/sh
set -ex

cd /app

# cache created by nginx docker volume
rm -rf /cache/*
node ./src/server.min.js