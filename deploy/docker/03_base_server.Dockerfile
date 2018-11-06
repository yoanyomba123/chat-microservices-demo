FROM node:11.4.0-stretch

WORKDIR /usr/app
RUN npm i -g @babel/core @babel/cli @babel/node

COPY . /usr/app/
RUN npm i

ENV NODE_ENV=production
