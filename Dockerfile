FROM node:9.6-alpine

WORKDIR /opt/webapp

COPY ./package.json ./package.json
COPY ./yarn.lock ./yarn.lock
RUN yarn install

COPY ./app ./app
WORKDIR /opt/webapp/app


