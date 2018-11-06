FROM tahc/base:1.0.5
COPY config/. /usr/app/config/
COPY libs/. /usr/app/libs/
COPY auth/. /usr/app/auth/
EXPOSE 7979
CMD [ "babel-node", "auth/server.js" ]