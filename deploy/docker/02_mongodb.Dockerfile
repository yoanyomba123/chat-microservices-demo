FROM mongo:4.0.4

ENV AUTH yes
ENV JOURNALING no

COPY deploy/docker/scripts/mongo-start.sh /usr/local/bin/
COPY deploy/docker/scripts/set_mongodb_password.sh /usr/local/bin/

RUN chmod +x /usr/local/bin/mongo-start.sh
RUN chmod +x /usr/local/bin/set_mongodb_password.sh

EXPOSE 27017

CMD ["mongo-start.sh"]
