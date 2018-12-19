#!/bin/sh

set -e

/usr/share/nginx/html/set-env-vars.js > config.js

exec "$@"
