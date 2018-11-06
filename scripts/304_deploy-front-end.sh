#!/bin/sh
docker build -f deploy/docker/05_front-end.Dockerfile -t tahc/frontend:1.0.5 dist/
kubectl apply -f deploy/kubernetes/front-end-k8t.yml
echo -e "\033[0;32m-- FRONT-END DEPLOYED --\033[0m"