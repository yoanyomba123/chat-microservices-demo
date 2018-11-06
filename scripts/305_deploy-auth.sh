#!/bin/sh
docker build -f deploy/docker/06_auth.Dockerfile -t tahc/authms:1.0.5 dist/
kubectl apply -f deploy/kubernetes/auth-k8t.yml
echo -e "\033[0;32m-- AUTH DEPLOYED --\033[0m"