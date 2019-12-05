#!/bin/sh
set -ex

# move to root dir
cd $(dirname $0)
cd ..

. ./.env

# make sure latest build is used ?
docker pull registry.gitlab.com/bozdoz/bozdoz-com:${TAG:-staging}

docker-compose config > docker-stack.yml
docker stack deploy -c docker-stack.yml --with-registry-auth bozdoz-${TAG:-staging}
