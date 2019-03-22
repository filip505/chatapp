FROM node:alpine

WORKDIR '/app'

ARG DB_USER='default'
ARG DB_PASS='default'
ARG DB_HOST='default'

ENV DB_USER=$DB_USER
ENV DB_PASS=$DB_PASS
ENV DB_HOST=$DB_HOST

COPY package.json .

RUN npm install

COPY . .

EXPOSE 1337

CMD npm run production