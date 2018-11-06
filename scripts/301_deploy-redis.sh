#!/bin/sh
docker build -f deploy/docker/01_redis.Dockerfile -t tahc/redis:5.0.3-alpine deploy/docker/conf
kubectl apply -f deploy/kubernetes/redis-k8t.yml
echo -e "\033[0;32m-- REDIS DEPLOYED --\033[0m"