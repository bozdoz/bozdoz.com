#!/bin/sh
set -ex

# move to root dir
cd $(dirname $0)
cd ..

. ./.env

docker-compose config > docker-stack.yml
docker stack deploy -c docker-stack.yml bozdoz-${TAG:-staging}

# make sure latest build is used
docker service update --force --image registry.gitlab.com/bozdoz/bozdoz-com:${TAG:-staging} bozdoz-${TAG:-staging}_web