#!/bin/bash
echo "Waiting for required services";

wait-for-it.sh auth:7979 -t 60 &&
wait-for-it.sh chat:7007 -t 60 &&
wait-for-it.sh frontend:8080 -t 60 &&

echo "Starting nginx" &&
exec nginx -g "daemon off;"