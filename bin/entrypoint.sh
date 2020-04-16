#!/bin/sh
set -e

# update/copy files to static volume
if [ -d /static ]; then
  rsync -rt /app/public/ /static/ --delete
fi

# remove cache from nginx container/volume
if [ -d /cache ]; then
  rm -rf /cache/*
fi

exec "$@"
