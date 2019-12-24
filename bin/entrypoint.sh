#!/bin/sh
set -ex

# remove cache from nginx container/volume
if [ -d /cache ]; then
  rm -rf /cache/*
fi

# copy files to static volume
if [ -d /static ]; then
  rsync -rt /app/public/ /static/ --delete
  rm -rf /app/public
fi

exec "$@"
