FROM tahc/base:1.0.5
COPY config/runtime/. /usr/app/config/runtime/
COPY libs/. /usr/app/libs/
COPY chat/. /usr/app/chat/
EXPOSE 7007
CMD [ "babel-node", "chat/index.js" ]
