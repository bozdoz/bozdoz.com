#!/bin/sh
set -e

# update/copy files to static volume
if [ -d /public ]; then
  rsync -rt /app/public/ /public/ --delete
  rm -rf /app/public
fi

# remove cache from nginx container/volume
if [ -d /cache ]; then
  rm -rf /cache/*
fi

exec "$@"
