#!/bin/sh
set -ex

# move to root dir
cd $(dirname $0)
cd ..

rm -rf /cache/*
node ./src/server.min.js