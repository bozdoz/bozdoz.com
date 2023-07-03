#!/bin/sh
set -ex

# move to root dir
cd $(dirname $0)
cd ..

. ./.env

docker-compose up -d
