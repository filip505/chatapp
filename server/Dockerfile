FROM node:alpine

WORKDIR '/app'

ENV DB_USER
ENV DB_PASS
ENV DB_HOST

COPY package.json .

RUN npm install

COPY . .

#EXPOSE 5001

CMD npm run production