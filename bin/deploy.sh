#!/bin/sh
set -ex

# move to root dir
cd $(dirname $0)
cd ..

. ./.env

docker-compose config > docker-stack.yml
docker stack deploy -c docker-stack.yml site-${TAG:-staging}