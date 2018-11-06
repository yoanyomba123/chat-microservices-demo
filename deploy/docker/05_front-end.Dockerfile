FROM tahc/base:1.0.5
COPY config/. /usr/app/config/
COPY libs/. /usr/app/libs/
COPY frontend/. /usr/app/frontend/
EXPOSE 8080
CMD [ "babel-node", "frontend/server.js" ]