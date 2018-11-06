#!/bin/sh
echo "Deploying via docker-compose..."
scripts/200_build-all.sh
docker-compose -f ./deploy/docker-compose/docker-compose.yml down
docker-compose -f ./deploy/docker-compose/docker-compose.yml build
docker-compose -f ./deploy/docker-compose/docker-compose.yml up -d
