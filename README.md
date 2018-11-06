# TAHC

Microservice demonstration uses NodeJS, ReactJS, Redis, MongoDB and Docker

Chat microservice, auth microservice & frontend uses them.

## Important Note

Some security and coding best practices have been ignored because the purpose of this project is to be used as a demo in a microservices presentation.

Please do not use this project as it is in the production environment.

## Synopsis

On the home page, the user will redirect to the Auth Service, if not yet logged in.

If the user has an account, she/he will be able to log in or will create a new account.

When the user opens the chat page, they can see the number of past messages specified in the configuration.

The user will not be able to send more messages than specified within the period specified in the configuration.

Chat panel must be scrollable but when there is a new message, scrollbar should stick to the bottom.

## Get Started

Follow the instructions below for local run.

### Requirements:

- Nodejs 11+
- Redis 5.0+
- MongoDB 4.0+
- Docker 18+
- Docker Compose 1.23+

**Optional:**

- Minikube 0.31+

### Pre-installation

#### For Kubernetes on Minikube

If you don't have minikube follow the instruction on their nice [installation guide](https://kubernetes.io/docs/tasks/tools/install-minikube/)

Don't forget to change kubectl context to minikube and docker enviroment after `minikube start`

```bash
kubectl config use-context minikube
eval $(minikube docker-env)
```

Project uses dummy domain names, so, you should update your `/etc/hosts`
Note: Please be sure the correct ip with `minikube ip`

```
192.168.99.100   auth.example.com      # for kubernetes ingress
192.168.99.100   www.example.com       # for kubernetes ingress
192.168.99.100   chat.example.com      # for kubernetes ingress
```

#### For Docker & Docker-Compose

Project uses dummy domain names, so, you should update your `/etc/hosts`

```
127.0.0.1	chat.example.com
127.0.0.1	auth.example.com
127.0.0.1	www.example.com
```

### Installation

Clone the repo and delete git data.

```bash
git clone https://github.com/arifaydogmus/tahc
cd tahc
rm -rf .git
# Now! It's yours!
```

Install dependencies & deploy

```bash
npm install
# For Kubernetes
npm run deploy:all-kubernetes
# or Docker compose
npm run deploy:all-dcompose

```

Deployment process may take quite a while becuase it builds Redis, Mongo and Node based images.
Take a break :)

## Commands

Also, the following npm commands to will make your life easier. (Command names describe it self :) )

```bash
npm run build:all
npm run build:base # Base of following three images (for fastest building)
npm run build:chatservice
npm run build:frontend
npm run build:auth

npm run deploy:all-kubernetes
npm run deploy:all-dcompose
npm run deploy:redis
npm run deploy:mongo
npm run deploy:chatservice
npm run deploy:frontend
npm run deploy:auth

npm run dev:chatservice
npm run dev:frontendhot
npm run dev:frontendsrv
npm run dev:authsrv
npm run dev:authhot
```

**WARNING**

- You should never commit sensitive data. (Such as passwords, secret keys etc.)

- You should modify config files for existing MongoDB or Redis servers.

- Of course I couldn't spend my time for Windows environment. You should correct the scripts, if you plan to run on Windows machine.

- I didn't implement some features because they're out of scope of this project. (Such as reset password, profile page, logout)
  Lucky you! You've some tasks.

## License

[MIT License](LICENSE.txt) - [Arif Aydogmus](https://github.com/arifaydogmus)
