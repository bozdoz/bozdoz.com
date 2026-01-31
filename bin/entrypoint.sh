#!/bin/sh
set -ex

# update/copy files to static volume
if [ -d /static ]; then
  rsync -rt /app/public/ /static/ --delete || echo "failed rsync"
fi

exec "$@"
