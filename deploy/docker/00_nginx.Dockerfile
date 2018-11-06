FROM nginx:alpine

RUN rm /etc/nginx/conf.d/default.conf
RUN rm /etc/nginx/nginx.conf

RUN apk add --no-cache bash

ADD deploy/docker/conf/nginx/ /etc/nginx/

COPY deploy/docker/scripts/nginx-start.sh /usr/local/bin/
COPY deploy/docker/scripts/wait-for-it.sh /usr/local/bin/

RUN chmod +x /usr/local/bin/nginx-start.sh
RUN chmod +x /usr/local/bin/wait-for-it.sh

ENTRYPOINT ["nginx-start.sh"]
