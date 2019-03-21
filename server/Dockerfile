FROM node:alpine

WORKDIR '/app'

ARG DB_USER
ARG DB_PASS
ARG DB_HOST

ENV DB_USER=$DB_USER
ENV DB_PASS=$DB_PASS
ENV DB_HOST=$DB_HOST

COPY package.json .

RUN npm install

COPY . .

#EXPOSE 5001

CMD npm run production