#!/bin/sh
docker build -f deploy/docker/04_chat.Dockerfile -t tahc/chat:1.0.5 dist/
kubectl apply -f deploy/kubernetes/chat-k8t.yml
echo -e "\033[0;32m-- CHAT DEPLOYED --\033[0m"