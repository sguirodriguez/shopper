FROM node:alpine

RUN apk add --no-cache postgresql-client

WORKDIR /app

COPY . .

RUN npm install

COPY init.sh /usr/local/bin/init.sh

RUN chmod +x /usr/local/bin/init.sh

CMD ["/usr/local/bin/init.sh"]
