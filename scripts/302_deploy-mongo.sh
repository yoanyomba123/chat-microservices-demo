#!/bin/sh
docker build -f deploy/docker/02_mongodb.Dockerfile -t tahc/mongodb:4.0.4 deploy/docker/conf
kubectl apply -f deploy/kubernetes/mongodb-k8t.yml
echo -e "\033[0;32m-- MONGODB DEPLOYED --\033[0m"