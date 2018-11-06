#!/bin/sh
echo "Building images..."
scripts/200_build-all.sh

echo "Deploying..."
scripts/301_deploy-redis.sh
scripts/302_deploy-mongo.sh
scripts/303_deploy-chat.sh
scripts/304_deploy-front-end.sh
scripts/305_deploy-auth.sh